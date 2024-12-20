import { useState, useEffect, useCallback } from "react";
import { fetchWeatherData } from "../services/rapidapi";
import { saveToCache, getFromCache } from "./cacheUtils";

const CACHE_DURATION = 3600000; // 1 hora

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Madrid"); // Default
  const [error, setError] = useState(null);

  // Fetch datos climáticos
  const fetchWeather = useCallback(async (query) => {
    const cacheKey = `weatherData-${query}`;
    try {
      // Intentar cargar desde caché
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        setWeatherData(cachedData);
        return;
      }

      // Si no hay caché, hacer fetch
      const data = await fetchWeatherData(query);
      if (data) {
        saveToCache(cacheKey, data, CACHE_DURATION);
        setWeatherData(data);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Unable to fetch weather data.");
    }
  }, []);

  // Ubicación actual o predeterminada
  const fetchCurrentLocationWeather = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const query = `${latitude},${longitude}`;
          setLocation(query);
          fetchWeather(query);
        },
        () => {
          setLocation("Madrid");
          fetchWeather("Madrid");
        }
      );
    } else {
      setLocation("Madrid");
      fetchWeather("Madrid");
    }
  }, [fetchWeather]);

  // Fetch inicial al montar
  useEffect(() => {
    fetchCurrentLocationWeather();
  }, [fetchCurrentLocationWeather]);

  return { weatherData, location, fetchWeather, error };
};

export default useWeatherData;
