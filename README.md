## Features

The data is allowed in a github fake rest server using the tool:

> https://my-json-server.typicode.com/

Using Chart.js instead D3JS due to its animation lovely features 😉:

> https://www.chartjs.org/

Jest for Unit Testing:

> https://jestjs.io/

Bulma for some styling:

> https://bulma.io/

The swipper for mobile devices is provided by dragend.js:

> http://stereobit.github.io/dragend/

NO Bootstrap, NO Vue, NO Angular, NO React, NO Jquery.

## Info

All the scripting has been writen in vanilla JS

The MarfeelGraph 'component' has been built in the main.js file and rendered in the html using a custom element (defining it before).

The templates needed for the shadowDom of every 'marfeel-graph' are coded in the HTML to keep the JS clean of HTML and CSS syntax.

Every graph works separately and with his own logic and style.
Easily scalable and maintainable.

Due to the requirement to positioning a graph inside the main graph, the style works with position absolute in some elements.

## Testing

After installing required dependencies with:

> npm install

To execute the tests (no time to implement more) execute the command:

> npm run test

## Swipper

To use the swipper for mobile devices you have to refresh the page if you are resizing the window from desktop.

A notification provided by bulma advice you to do it.

## One more thing...

You can see the project in real environment here:

> https://rawlmp.github.io/frontEndTest/
