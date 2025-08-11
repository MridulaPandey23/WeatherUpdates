import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const apiKey = "e371b6ff32a66daee9d498eaa64e3ceb";

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
    <div className="min-h-screen bg-[url(/weathr.jpg)] bg-cover flex items-center justify-center p-4">
      <div className="bg-gray-200 rounded-2xl p-6 w-full max-w-md shadow-[0_10px_20px_rgba(0,0,0,0.5),0_6px_6px_rgba(0,0,0,0.4)]">
 
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
