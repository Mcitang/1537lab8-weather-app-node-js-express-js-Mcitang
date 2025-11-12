const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const port = 3000;
const netlifyURL = "splendid-gelato-a5acea.netlify.app";
app.use(
  cors({
    origin: netlifyURL,
  })
);

//Port Listen
app.listen(port, () => {
  console.log(`The server is up, all is good, it's listening to ${port}`);
});

app.get("/weather", async (req, res) => {
  const cityName = req.query.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=64a222ed39a72e510306ff2ea1ea03e8&units=metric
`;
  try {
    const response = await axios.get(url);
    const weatherData = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    };
    res.json(weatherData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error occurred when fetching weather data." });
  }
});

// get API key, add api key thing to axios


