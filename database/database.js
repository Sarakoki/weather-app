const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Weather");

const db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connection successfull");
});

const WeatherSchema = mongoose.Schema({
  CityName: { type: String, unique: true },
  weather: String,
  Temperature: Number
});

const Weather = mongoose.model("Weather", WeatherSchema);

const saveWeather = function(data) {
  if (!data.name) {
    return console.log("no data");
  }
  obj = {
    CityName: data.name,
    weather: data.weather[0].description,
    Temperature: data.main.temp
  };
  const weather = new Weather(obj);
  weather.save(function(err, data) {
    if (err) {
      return console.log("error");
    }
    console.log("database saved");
  });
};

module.exports.saveWeather = saveWeather;
module.exports.Weather = Weather;
