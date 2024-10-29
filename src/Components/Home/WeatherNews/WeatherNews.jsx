import { useState, useEffect } from "react";
import axios from "axios";

const WeatherNews = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationDetails, setLocationDetails] = useState({ city: "", country: "" });

  const apiKey = "494b6b9d38fb446ca8c162604242710"; // weatherapi.com API key end date 10/11/2024

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Location access denied:", error);
          setError("Location access denied.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const { latitude, longitude } = location;
        if (!latitude || !longitude) return;

        // Fetch current weather and 6-day forecast data
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=6`
        );

        setWeatherData(response.data.current);
        setForecastData(response.data.forecast.forecastday);
        setLocationDetails({
          city: response.data.location.name,
          country: response.data.location.country,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Error fetching weather data.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location, apiKey]);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>Error fetching weather data: {error}</p>;
  }

  if (!weatherData) {
    return <p>No weather data available.</p>;
  }

  const { temp_c, condition, wind_kph, precip_mm, pressure_mb } = weatherData;

  const forecastItems = forecastData.map((day, index) => (
    <div key={index} className="text-center">
      <p className="text-sm font-bold text-[#007E7E]">
        {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
      </p>
      <img src={day.day.condition.icon} alt="weather icon" className="mx-auto" />
      <p className="text-lg text-[#4A4A4A]">{Math.round(day.day.avgtemp_c)}°c</p>
    </div>
  ));

  return (
    <div className="pt-16 pb-8 mx-auto container flex justify-center items-center">
      <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl text-[#3BAFDA] text-center font-bold mb-4 border-b-2 border-[#007E7E] pb-2">
          Weather Update
        </h2>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#3BAFDA]">
              {`${locationDetails.city}, ${locationDetails.country}`}
            </h3>
            <p className="text-lg capitalize text-[#767676]">{condition.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#007E7E]">Wind</p>
            <p className="text-lg font-medium text-[#4A4A4A]">{Math.round(wind_kph)} kmph</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#007E7E]">Precip</p>
            <p className="text-lg font-medium text-[#4A4A4A]">{precip_mm} mm</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#007E7E]">Pressure</p>
            <p className="text-lg font-medium text-[#4A4A4A]">{pressure_mb} mb</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-5xl font-bold text-[#007E7E]">{Math.round(temp_c)}°c</p>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {forecastItems}
        </div>
      </div>
    </div>
  );
};

export default WeatherNews;
