import { Sun } from "lucide-react";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API; // Ensure you have this in your .env file
  console.log("API_KEY:", API_KEY); // Debugging line to check if API_KEY is loaded
  // if (!API_KEY) {
  //   return <div className="text-red-500">API key not configured</div>;
  // }

  useEffect(() => {
    const fetchAllData = async (lat, lon) => {
      try {
        // Weather API
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
        );

        setWeather(weatherRes.data);

        // AQI API
        const aqiRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
        );
        setAqi(aqiRes.data.list[0].main.aqi); // AQI is a value from 1 to 5

        // UV Index from OneCall API (includes current UV)
        // const oneCallRes = await axios.get(
        //   `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`
        // )
        // setUvIndex(oneCallRes.data.current.uvi)
      } catch (err) {
        setError("Failed to fetch weather data");
        console.error(err);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchAllData(latitude, longitude);
        },
        (err) => {
          console.warn("Location access denied. Using default location.");
          console.log(err);
          fetchAllData(28.61, 77.21); // Delhi coords
        },
      );
    } else {
      setError("Geolocation not supported");
    }
  }, [API_KEY]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!weather || aqi === null /* || uvIndex === null */)
    return <div className="text-muted-foreground">Loading weather...</div>;

  // Convert AQI number to label
  const getAqiLabel = (val) => {
    switch (val) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "Unknown";
    }
  };

  const temp = Math.round(weather.main.temp);
  const condition = weather.weather[0].description;
  const icon = weather.weather[0].icon;
  const city = weather.name;
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed;

  return (
    <div className="bg-gradient-to-br from-blue-200 to-cyan-300 rounded-2xl shadow-lg p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-blue-900">Today's Weather</h3>
        <Sun className="w-8 h-8 text-yellow-500" />
      </div>
      <div className="text-center">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
          className="mx-auto mb-2"
        />
        <div className="text-4xl font-bold text-foreground">{temp}°C</div>
        <p className="text-orange-600 mb-1 font-semibold capitalize">
          {condition}
        </p>
        <p className="text-muted-foreground text-sm">{city}</p>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>Humidity: {humidity}%</p>
          <p className="mb-8">Wind: {windSpeed} m/s</p>
          <span className="text-yellow-700 bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-2 rounded-full">
            AQI: {getAqiLabel(aqi)}
          </span>
          {/* <p>UV Index: {uvIndex}</p> */}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
