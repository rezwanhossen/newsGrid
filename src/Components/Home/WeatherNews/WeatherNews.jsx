import { useState, useEffect } from "react";
import axios from "axios";
import './WeatherNewsStyle.css'; 

const WeatherNews = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const city = "Tungi";
  const country = "Bangladesh";
  const apiKey = "2550bd0b04ae47ccb107b3acf74a1f4c"; // Weatherbit API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch current weather data
        const currentWeatherResponse = await axios.get(
          `https://api.weatherbit.io/v2.0/current?city=${city},${country}&key=${apiKey}`
        );

        // Fetch forecast data
        const forecastResponse = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${country}&key=${apiKey}&days=5`
        );

        setWeatherData(currentWeatherResponse.data.data[0]);
        setForecastData(forecastResponse.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>Error fetching weather data: {error}</p>;
  }

  const { temp, weather, wind_spd, precip, pres } = weatherData;
  const forecastItems = forecastData.map((day, index) => (
    <div key={index} className="text-center">
      <p className="text-sm font-bold text-gray-300">
        {new Date(day.valid_date).toLocaleDateString('en-US', { weekday: 'short' })}
      </p>
      <p className="text-lg text-white">{Math.round(day.temp)}°c</p>
    </div>
  ));

  return (
    <div className="p-6 bg-[#F5F5F5] shadow-lg rounded-lg max-w-lg relative">
      {/* Two animated cloud SVGs */}
      <div className="cloud-front">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-full h-full">
          <path
            fill="#90caf9"
            d="M41.2 31.9h-.5a12.8 12.8 0 0 0-23.9-5 8.8 8.8 0 0 0-5.6 16h29a8.8 8.8 0 0 0 1-17.6Z"
          />
        </svg>
      </div>

      <div className="cloud-back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-full h-full">
          <path
            fill="#90caf9"
            d="M41.2 31.9h-.5a12.8 12.8 0 0 0-23.9-5 8.8 8.8 0 0 0-5.6 16h29a8.8 8.8 0 0 0 1-17.6Z"
          />
        </svg>
      </div>

      {/* Current Weather */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#3BAFDA]">
            {city}, {country}
          </h2>
          <p className="text-lg capitalize text-[#767676]">{weather.description}</p>
        </div>
      </div>

      {/* Weather Stats */}
      <div className="justify-between mb-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-300">Wind</p>
          <p className="text-lg font-bold text-white">{Math.round(wind_spd)} kmph</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-300">Precip</p>
          <p className="text-lg font-bold text-white">{precip} mm</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-300">Pressure</p>
          <p className="text-lg font-bold text-white">{pres} mb</p>
        </div>
      </div>

      {/* Current Temperature */}
      <div className="text-center mb-6">
        <p className="text-5xl font-bold text-white">{Math.round(temp)}°c</p>
      </div>

      {/* 5-day Forecast */}
      <div className="grid grid-cols-5 gap-4">
        {forecastItems}
      </div>
    </div>
  );
};

export default WeatherNews;
