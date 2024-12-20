import { useState, useEffect, useCallback } from "react";
import { fetchWeatherData } from "../services/rapidapi";
import { saveToCache, getFromCache } from "./cacheUtils";

const CACHE_DURATION = 3600000; // 1 hora

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Madrid"); // Ubicación predeterminada
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para obtener datos climáticos
  const fetchWeather = useCallback(async (query) => {
    const cacheKey = `weatherData-${query}`;
    setLoading(true);
    setError(null);

    try {
      // Intentar cargar desde caché
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        setWeatherData({ ...cachedData }); // Forzar reactividad
        console.log("Loaded from cache:", cachedData);
        setLoading(false);
        return;
      }

      // Si no hay caché, hacer fetch desde la API
      const data = await fetchWeatherData(query);
      if (data) {
        saveToCache(cacheKey, data, CACHE_DURATION);
        setWeatherData({ ...data }); // Forzar reactividad
        console.log("Fetched new data:", data);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Unable to fetch weather data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para manejar la ubicación actual
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
          // Si se deniega la ubicación, usar la predeterminada
          setLocation("Madrid");
          fetchWeather("Madrid");
        }
      );
    } else {
      // Si el navegador no soporta geolocalización
      setLocation("Madrid");
      fetchWeather("Madrid");
    }
  }, [fetchWeather]);

  // Cargar datos iniciales al montar el componente
  useEffect(() => {
    fetchCurrentLocationWeather();
  }, [fetchCurrentLocationWeather]);

  // Devuelve funciones y estados necesarios
  return {
    weatherData,
    location,
    fetchWeather,
    loading,
    error,
  };
};

export default useWeatherData;
