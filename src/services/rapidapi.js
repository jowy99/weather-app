const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

export const hasRapidApiConfig = Boolean(RAPIDAPI_KEY && RAPIDAPI_HOST);

// Configuración de opciones generales para fetch
export const fetchOptions = {
  method: "GET",
  headers: hasRapidApiConfig
    ? {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
      }
    : {},
};

// Función para fetch de datos climáticos
export const fetchWeatherData = async (query = "Madrid") => {
  if (!hasRapidApiConfig) {
    throw new Error("RapidAPI configuration is missing.");
  }

  const params = new URLSearchParams({
    q: query,
    days: "2",
    aqi: "no",
    alerts: "no",
  });
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?${params.toString()}`;
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`Weather API request failed with status ${response.status}.`);
  }

  return response.json();
};
