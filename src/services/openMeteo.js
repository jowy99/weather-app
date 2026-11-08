const OPEN_METEO_BASE = "https://api.open-meteo.com/v1/forecast";

// Previsión diaria de 10 días (gratis, sin clave). Devuelve [{ date, code, max, min, rain }].
export const fetchExtendedDaily = async (lat, lon) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "10",
  });
  const response = await fetch(`${OPEN_METEO_BASE}?${params.toString()}`);
  if (!response.ok) throw new Error(`Open-Meteo request failed with status ${response.status}`);
  const { daily } = await response.json();
  return daily.time.map((date, i) => ({
    date,
    code: daily.weather_code[i],
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    rain: daily.precipitation_probability_max[i] ?? 0,
  }));
};
