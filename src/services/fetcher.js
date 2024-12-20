import { fetchOptions } from "./rapidapi";

// Función genérica para fetch
export const fetcher = async (url) => {
  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Error in fetch: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Función para datos climáticos
export const fetchWeatherData = async (query) => {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${query}`;
  return await fetcher(url);
};

// Función para sugerencias de ciudades
export const fetchCitySuggestions = async (query) => {
  const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${query}`;
  return await fetcher(url);
};
