var express = require("express");
var request = require("request");
var db = require("./database/database.js");
var help = require("./help/help.js");
var config = require("./config.js");
var bodyParser = require("body-parser");
var port = 3001;
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/node_modules"));

//routes
app.post("/data", function(req, res) {
  help.getWeatherByCityName(req.body.name, function(err, data) {
    db.saveWeather(data);
  });
  res.send(req.body);
});

app.get("/data", function(req, res) {
  db.Weather.find({}, function(err, data) {
    res.send(data);
  });
});

app.post("/drop", function() {
  db.Weather.remove({}, function(err, data) {
    if (err) {
      throw err;
    }
    console.log("done");
  });
});

app.get("/", (req, res) => {
  res.send("/index.html");
});

app.listen(port, function() {
  console.log("listening on port " + port);
});
