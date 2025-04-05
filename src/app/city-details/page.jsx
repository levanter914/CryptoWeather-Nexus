// /pages/city-details.js
"use client";

import React, { useState } from "react";
import axios from "axios";

const CityDetails = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://api.weatherapi.com/v1/current.json", {
        params: {
          key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
          q: city,
        },
      });
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">City Weather Details</h1>
      <form onSubmit={fetchWeatherData} className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border rounded p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 ml-2">
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2 className="text-xl font-bold">{weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
        </div>
      )}
    </div>
  );
};

export default CityDetails;
