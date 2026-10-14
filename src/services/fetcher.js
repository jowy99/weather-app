import { fetchOptions, hasRapidApiConfig } from "./rapidapi";

// Función para obtener sugerencias de ciudades
export const fetchCitySuggestions = async (query) => {
  if (!hasRapidApiConfig || query.trim() === "") {
    return [];
  }

  const params = new URLSearchParams({ q: query });
  const url = `https://weatherapi-com.p.rapidapi.com/search.json?${params.toString()}`;

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch {
    return [];
  }
};
