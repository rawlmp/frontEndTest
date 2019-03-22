//Required to use Asynch in jest testing
require("es6-promise").polyfill();
require("isomorphic-fetch");

async function checkData(type) {

  return await fetch("https://my-json-server.typicode.com/rawlmp/marfeel_data/" + type)
    .then(data => data.json())
    .then(json => (data = json));

}
module.exports.checkData = checkData;
