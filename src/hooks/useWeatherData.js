import { useState, useEffect, useCallback } from "react";
import { fetchWeatherData, reverseGeocode } from "../services/rapidapi";
import { saveToCache, getFromCache } from "./cacheUtils";

const CACHE_DURATION = 3600000; // 1 hora
const DEFAULT_LOCATION = "Madrid";

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obtener datos meteorológicos
  const fetchWeather = useCallback(async (query) => {
    const cacheKey = `weatherData-v2-${query}`;

    setLocation(query);
    setLoading(true);
    setError(null);

    try {
      // Comprobar caché
      const cachedData = getFromCache(cacheKey);

      if (cachedData) {
        setWeatherData({ ...cachedData });
        return;
      }

      // Consultar API
      const data = await fetchWeatherData(query);

      saveToCache(cacheKey, data, CACHE_DURATION);

      setWeatherData({ ...data });
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Unable to fetch weather data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener tiempo usando ubicación actual
  const fetchCurrentLocationWeather = useCallback(async () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported.");

      fetchWeather(DEFAULT_LOCATION);
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        console.log("Ubicación obtenida:", {
          latitude,
          longitude,
          accuracy: position.coords.accuracy,
        });

        // Intentar obtener nombre de ciudad con reverse geocoding
        const cityName = await reverseGeocode(latitude, longitude);
        const query = cityName || `${latitude},${longitude}`;

        console.log("Ciudad resuelta:", cityName ? cityName : "usando coordenadas");

        fetchWeather(query);
      },

      (error) => {
        console.error("Geolocation error:", error);

        // Fallback si falla la ubicación
        fetchWeather(DEFAULT_LOCATION);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, [fetchWeather]);

  // Al iniciar → intentar usar ubicación actual
  useEffect(() => {
    fetchCurrentLocationWeather();
  }, [fetchCurrentLocationWeather]);

  return {
    weatherData,
    location,
    fetchWeather,
    fetchCurrentLocationWeather,
    loading,
    error,
  };
};

export default useWeatherData;
