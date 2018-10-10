const express = require("express");
const request = require("request");
const db = require("./database/database.js");
const config = require("./config.js");
const bodyParser = require("body-parser");
const port = 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/node_modules"));

//helper function
let getWeatherByCityname = (cityName, callback) => {
  let options = {
    url:
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=7f2df14e0a531ed8ee69b8f42c2b73dc",
    headers: {
      "User-Agent": "request",
      Authorization: `apikey ${config.APIkey}`
    }
  };
  request(options, function(error, response, body) {
    console.log("error:", error);
    console.log("statusCode:", response && response.statusCode);
    var info = JSON.parse(body);
    callback(error, info);
  });
};

//routes
app.post("/data", function(req, res) {
  getWeatherByCityName(req.body.name, function(err, data) {
    db.saveWeather(data);
  });
  res.send(req.body);
});

app.get("/data", function(req, res) {
  db.Weather.find({}, function(err, data) {
    res.send(data);
  });
});

app.get("/", (req, res) => {
  res.send("listening on PORT 3001");
});

app.listen(port, function() {
  console.log("listening on port " + port);
});
