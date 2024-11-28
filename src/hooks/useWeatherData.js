import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/rapidapi.js';
import { saveToCache, getFromCache } from './cacheUtils.js';

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const cacheKey = 'weatherData'; // Clave única para este tipo de datos en la caché

  useEffect(() => {
    const fetchData = async () => {
      // Verificar la caché
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        setWeatherData(cachedData); // Usar datos de la caché
        console.log('Datos obtenidos de la caché:', cachedData);
        return;
      }

      try {
        // Si no hay datos en la caché, hacemos el fetch
        const data = await fetchWeatherData();
        setWeatherData(data); // Actualizar estado
        saveToCache(cacheKey, data); // Guardar en caché
        console.log('Datos obtenidos del fetch:', data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err);
      }
    };

    fetchData();
  }, []); // Ejecutar una vez al montar el componente

  return { weatherData, error };
};

export default useWeatherData;
