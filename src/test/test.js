const specs = require("./functions");

test("The json for 'impresions' must contain 12 months", done => {
  return specs.checkData("impresions").then(data => {
    expect(data.length).toBe(12);
    done();
  });
});

test("The json for 'revenue' must contain 12 months", done => {
  return specs.checkData("revenue").then(data => {
    expect(data.length).toBe(12);
    done();
  });
});

test("The json for 'visits' must contain 12 months", done => {
  return specs.checkData("visits").then(data => {
    expect(data.length).toBe(12);
    done();
  });
});

test("Only return data with the right endpoints", done => {
  return specs.checkData("something").then(data => {
    expect(data).toEqual({});
    done();
  });
});
