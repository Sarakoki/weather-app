var request = require("request");
var config = require("../config.js");

let getWeatherByCityName = (cityName, callback) => {
  let options = {
    url:
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=d89eca60ac67077426e65fa0c94e4c83",
    headers: {
      "User-Agent": "request",
      Authorization: `token ${config.TOKEN}`
    }
  };

  request(options, function(error, response, body) {
    console.log("error:", error);
    console.log("statusCode:", response && response.statusCode);
    var info = JSON.parse(body);

    callback(error, info);
  });
};

module.exports.getWeatherByCityName = getWeatherByCityName;
