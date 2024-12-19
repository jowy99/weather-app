import { useState, useEffect, useCallback } from "react";
import { fetchWeatherData } from "../services/rapidapi.js";
import { saveToCache, getFromCache } from "./cacheUtils.js";

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Madrid"); // Default city
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch weather data
  const fetchWeather = useCallback(
    async (query) => {
      setLoading(true);
      setError(null);

      const cacheKey = `weatherData-${query}`; // Dynamic cache key based on query

      try {
        // Check the cache first
        const cachedData = getFromCache(cacheKey);
        if (cachedData) {
          setWeatherData(cachedData);
          console.log("Loaded data from cache:", cachedData);
        } else {
          // Fetch from the API if not in cache
          const data = await fetchWeatherData(query);
          setWeatherData(data);
          saveToCache(cacheKey, data, CACHE_DURATION);
          console.log("Loaded data from API:", data);
        }
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Unable to fetch weather data.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Handle geolocation
  const handleGeolocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const query = `${latitude},${longitude}`;
          setLocation(query);
          await fetchWeather(query);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("Madrid"); // Default to Madrid
          fetchWeather("Madrid");
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
      setLocation("Madrid"); // Default to Madrid
      fetchWeather("Madrid");
    }
  }, [fetchWeather]);

  // Fetch weather data on mount
  useEffect(() => {
    handleGeolocation();
  }, [handleGeolocation]);

  return { weatherData, location, loading, error, fetchWeather };
};

export default useWeatherData;
