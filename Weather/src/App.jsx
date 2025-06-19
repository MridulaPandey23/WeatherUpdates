import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const apiKey = "6fc9354392ec67d2668181d16a47dd84";

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecastRes.json();

      const daily = forecastData.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );

      setWeather(weatherData);
      setForecast(daily);
    } catch (err) {
      alert("City not found");
    }
  };

  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center p-4">
      <div className="bg-white/90 rounded-2xl p-6 w-full max-w-md shadow-xl">
        <input
          type="text"
          placeholder="Enter city name"
          className="w-full p-3 rounded-md border mb-4 focus:outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        {weather && <WeatherCard weather={weather} forecast={forecast} />}
      </div>
    </div>
  );
}

export default App;
