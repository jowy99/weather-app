import { fetchOptions } from "./rapidapi";

// Función para obtener sugerencias de ciudades
export const fetchCitySuggestions = async (query) => {
  const url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${query}`;
  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`Error fetching city suggestions: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
