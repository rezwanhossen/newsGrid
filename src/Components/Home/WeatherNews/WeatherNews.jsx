import { useState, useEffect } from "react";
import axios from "axios";

const WeatherNews = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

 
  const apiKey = "2550bd0b04ae47ccb107b3acf74a1f4c"; // Weatherbit API key


  useEffect( () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          axios
            .get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            )
            .then((response) => {
              console.log(response.data || 'Unknown location')

              setCity(response.data.address.city || "Unknown location");
              setCountry(response?.data?.address?.country);
            })
        }
  )}
  },[])

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const currentWeatherResponse = await axios.get(
          `https://api.weatherbit.io/v2.0/current?city=${city},${country}&key=${apiKey}`
        );

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
      <p className="text-sm font-bold text-[#007E7E]">
        {new Date(day.valid_date).toLocaleDateString('en-US', { weekday: 'short' })}
      </p>
      <p className="text-lg text-[#4A4A4A]">{Math.round(day.temp)}°c</p>
    </div>
  ));

  return (
    <div className="bg-[#F5F5F5] shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl text-[#3BAFDA] font-bold mb-4 border-b-2 border-[#007E7E] pb-2">
        Weather Update
      </h2>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#3BAFDA]">
            {location}
          </h3>
          <p className="text-lg capitalize text-[#767676]">{weather.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-[#007E7E]">Wind</p>
          <p className="text-lg font-medium text-[#4A4A4A]">{Math.round(wind_spd)} kmph</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[#007E7E]">Precip</p>
          <p className="text-lg font-medium text-[#4A4A4A]">{precip} mm</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[#007E7E]">Pressure</p>
          <p className="text-lg font-medium text-[#4A4A4A]">{pres} mb</p>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-5xl font-bold text-[#007E7E]">{Math.round(temp)}°c</p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {forecastItems}
      </div>
    </div>
  );
};

export default WeatherNews;
