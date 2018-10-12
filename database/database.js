var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Weather");

var db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connection successfull");
});

const WeatherSchema = mongoose.Schema({
  CityName: { type: String, unique: true },
  Weather: String,
  Temperature: Number
});

var Weather = mongoose.model("Weather", WeatherSchema);

var saveWeather = function(data) {
  if (!data.name) {
    return console.log("no data");
  }
  obj = {
    CityName: data.name,
    Weather: data.weather[0].description,
    Temperature: data.main.temp
  };

  var weather = new Weather(obj);
  weather.save(function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("database saved");
  });
};

module.exports.Weather = Weather;
module.exports.saveWeather = saveWeather;
