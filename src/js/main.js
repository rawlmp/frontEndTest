class MarfeelGraph extends HTMLElement {
  //constructor
  constructor() {
    super();

    //global values
    this.data = null;
    this.colours = this.setColours();
  }

  //get the data-type value from the element (hardcoded in the HTML)
  getType() {
    return this.getAttribute("data-type");
  }

  //fetch the remote data hosted in github
  async getData() {
    await fetch(
      "https://my-json-server.typicode.com/rawlmp/marfeel_data/" +
        this.getType()
    )
      .then(data => data.json())
      .then(json => (this.data = json));
  }

  renderComponent() {
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
    let template = this.attachShadow({
      mode: "open"
    });

    //the structure and the style are in the document to keep the js cleaner
    template.innerHTML = document.getElementById("htmlTemplate").innerHTML;
    template.innerHTML += document.getElementById("cssTemplate").innerHTML;
  }

  setColours() {
    switch (this.getType()) {
      case "revenue":
        return ["rgb(53, 95, 24)", "rgb(142, 209, 76)"];
      case "impresions":
        return ["rgb(48, 85, 102)", "rgb(115, 200, 227)"];
      case "visits":
        return ["rgb(184, 91, 42)", "rgb(236, 200, 44)"];
      default:
        return ["black", "grey"];
    }
  }

  //using Chart.js (https://www.chartjs.org)
  drawChart() {
    //the target container
    let ctx = this.shadowRoot.getElementById("marfeelChart").getContext("2d");

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          this.data[1][0].smartPhone.device,
          this.data[1][1].tablet.device
        ],
        datasets: [
          {
            data: [this.data[1][0].smartPhone.pct, this.data[1][1].tablet.pct],
            backgroundColor: this.colours
          }
        ]
      },
      options: {
        tooltips: {
          enabled: true
        },
        responsive: false,
        maintainAspectRatio: true,
        animation: {
          duration: 4000
        },
        cutoutPercentage: 90,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              display: false
            }
          ]
        }
      }
    });
  }

  drawMiniChart() {
    let ctx = this.shadowRoot.getElementById("secondGraph").getContext("2d");

    //Gradient Background
    let gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, this.colours[1]);
    gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.2)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 1)");

    let info = this.data[0].map(month => month.value);
    new Chart(ctx, {
      type: "line",
      data: {
        labels: info,
        datasets: [
          {
            data: info,
            lineTension: 0,
            borderColor: this.colours[1],
            borderWidth: 1,
            backgroundColor: gradient
          }
        ]
      },
      options: {
        tooltips: {
          enabled: true
        },
        responsive: false,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0
          },
          point: {
            radius: 1
          }
        },
        animation: {
          duration: 3000
        },
        cutoutPercentage: 90,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              display: false
            }
          ]
        }
      }
    });
  }

  drawInfo() {
    //Info below the graphs
    let total = Number(
      this.data[0].reduce((ele, val) => {
        return (ele += val.value);
      }, 0)
    ).toLocaleString();

    this.shadowRoot.querySelector(
      "#type"
    ).innerHTML = this.getType().toUpperCase();

    this.shadowRoot.querySelector("#total").innerHTML =
      this.getType() === "revenue" ? total + "€" : total;

    //Legend info
    this.shadowRoot
      .querySelector(".phone_title")
      .setAttribute("style", "color: " + this.colours[0]);
    this.shadowRoot.querySelector(".phone_title").innerHTML = "Smartphone";

    this.shadowRoot
      .querySelector(".tablet_title")
      .setAttribute("style", "color: " + this.colours[1]);
    this.shadowRoot.querySelector(".tablet_title").innerHTML = "Tablet";

    this.shadowRoot.querySelector(".tablet_pct").innerHTML =
      this.data[1][1].tablet.pct + "%";
    this.shadowRoot.querySelector(".phone_pct").innerHTML =
      this.data[1][0].smartPhone.pct + "%";
    this.shadowRoot.querySelector(".tablet_total").innerHTML =
      this.getType() === "revenue"
        ? this.data[1][1].tablet.total.toLocaleString() + "€"
        : this.data[1][1].tablet.total.toLocaleString();
    this.shadowRoot.querySelector(".phone_total").innerHTML =
      this.getType() === "revenue"
        ? this.data[1][0].smartPhone.total.toLocaleString() + "€"
        : this.data[1][0].smartPhone.total.toLocaleString();
  }

  async cleanData() {
    let months = [];
    let phoneTotal = 0;
    let tabletTotal = 0;

    this.data.forEach((element, i) => {
      phoneTotal += element.smartphone;
      tabletTotal += element.tablet;
      months.push({
        month: i + 1,
        value: element.smartphone + element.tablet
      });
    });

    const totalDevices = phoneTotal + tabletTotal;
    const totalInfo = [
      {
        smartPhone: {
          device: "smartphone",
          pct: Math.round((phoneTotal / totalDevices) * 100),
          total: phoneTotal
        }
      },
      {
        tablet: {
          device: "tablet",
          pct: Math.round((tabletTotal / totalDevices) * 100),
          total: tabletTotal
        }
      }
    ];

    this.data = [months, totalInfo];
  }

  //Executed on rendering
  //https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
  async connectedCallback() {
    await this.renderComponent();
    await this.getData();
    await this.cleanData();

    this.drawChart();
    this.drawMiniChart();
    this.drawInfo();
  }
}

//Allows you to create a new element with te desired name
window.customElements.define("marfeel-graph", MarfeelGraph);
