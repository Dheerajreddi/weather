const path = require("path");
const express = require("express");
const hbs = require("hbs");
// const request = require("postman-request");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views position
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to servce
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Dheeraj",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    text: "About page text",
    name: "Dheeraj",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "If you have any queries, you can directly reach out to me.",
    mobile: "Dheeraj",
    email: "dheerajreddy80@gmail.",
    name: "Dheeraj",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);

  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "Address is required to fetch forecast data",
    });
  }

  geocode(
    address,
    (error,
    {latitude, longitude, location} = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast,
          location,
          address,
        });
      });
    })

});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "404 Error - Article not found in help section",
    name: "Dheeraj",
  });
});

app.get("/*", (req, res) => {
  // res.send('404 Error - Page Not Found');
  res.render("404", {
    title: "404",
    errorMessage: "404 Error - Page Not Found",
    name: "Dheeraj",
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
