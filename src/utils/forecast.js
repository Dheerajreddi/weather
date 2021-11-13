const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d3d188c8140749a35b0ea9f3421aa668&units=m&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const res = body.current;

      callback(
        undefined,
        `${res.weather_descriptions[0]}. It is currently ${res.temperature} degrees out. It feels like ${res.feelslike} degress out`
      );
    }
  });
};

module.exports = forecast;
