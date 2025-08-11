import React from "react";

const WeatherCard = ({ weather, forecast }) => {
  const { name, main, weather: w, wind } = weather;
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm text-gray-500">{currentDate}</p>
      <div className="my-4">
        <img
          className="mx-auto w-16 "
          src={`https://openweathermap.org/img/wn/${w[0].icon}@2x.png`}
          alt={w[0].description}
        />
        <h1 className="text-4xl font-semibold">{Math.round(main.temp)}°C</h1>
        <p className="text-pink-500">{w[0].description}</p>
      </div>
      <div className="flex justify-between text-sm text-gray-600 my-4">
        <p>💨 {wind.speed} m/s</p>
        <p>💧 {main.humidity}%</p>
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2">5-Day Forecast:</h3>
        <div className="grid grid-cols-5 gap-2 text-sm">
          {forecast.slice(0, 5).map((day, idx) => (
            <div key={idx} className="bg-blue-100 p-2 rounded-lg">
              <p>{new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="w-8 mx-auto"
              />
              <p>{Math.round(day.main.temp)}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
