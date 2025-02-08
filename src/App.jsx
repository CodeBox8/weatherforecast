import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { alignProperty } from "@mui/material/styles/cssUtils";

const API_KEY = "5888311e0d0243dd89d160527250802";
const LOCATIONS = [
  "Amritsar",
  "Pune",
  "Kolkata",
  "Bangalore",
  "Mumbai",
  "Patna",
];

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = {};
        for (const location of LOCATIONS) {
          const response = await axios.get(
            `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5&aqi=yes&alerts=yes`
          );
          data[location] = response.data;
        }
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Weather Forecast</h2>
      {loading ? (
         <Backdrop
         sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}    open={true}    >
         <CircularProgress color="inherit" />
       </Backdrop>
      ) : (
        <div className="row">
          {LOCATIONS.map((location) => (
            <div className="col-md-4 mb-3" key={location}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{location}</h5>
                  <div>
                    {" "}
                    <img
                      src={
                        weatherData[location].forecast.forecastday[0].day
                          .condition.icon
                      }
                    />
                  </div>
                  {weatherData[location] ? (
                    <p className="card-text">
                      Temperature: {weatherData[location].current.temp_c}°C
                      <br />
                      Weather:{" "}
                      {
                        weatherData[location].forecast.forecastday[0].day
                          .condition.text
                      }
                      <br />
                      Simbol:{" "}
                      {
                        weatherData[location].forecast.forecastday[0].day
                          .condition.text
                      }
                      <br />
                      Wind Speed: {weatherData[location].current.wind_kph} km/h
                    </p>
                  ) : (
                    <p className="text-danger">Data not available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div><Button variant="contained">MUI Button</Button></div>
    </div>
  );
};

export default App;
