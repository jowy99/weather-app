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

// Reverse geocoding con Nominatim (OpenStreetMap) — gratis, sin API key
// Devuelve { name, region } — ambos en español gracias a accept-language=es
export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1&accept-language=es`,
      { headers: { "User-Agent": "weather-app/1.0" } }
    );
    if (!response.ok) return { name: null, region: null };
    const data = await response.json();

    // Nombre del lugar (ciudad, pueblo, etc.)
    const address = data.address || {};
    const name = address.city || address.town || address.village || address.municipality || address.county || address.state || null;

    // Región: comunidad/provincia + país, en español
    const state = address.state || null;
    const county = address.county || null;
    const country = address.country || null;
    const region = state || county
      ? [state || county, country].filter(Boolean).join(", ")
      : null;

    return { name, region };
  } catch {
    return { name: null, region: null };
  }
};

// Función para fetch de datos climáticos
export const fetchWeatherData = async (query = "Madrid") => {
  if (!hasRapidApiConfig) {
    throw new Error("RapidAPI configuration is missing.");
  }

  const params = new URLSearchParams({
    q: query,
    days: "3",
    aqi: "yes",
    alerts: "yes",
  });
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?${params.toString()}`;
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`Weather API request failed with status ${response.status}.`);
  }

  return response.json();
};
