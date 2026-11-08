// Buscador de lugares de Open-Meteo: gratis, sin clave, en español. No gasta cuota de WeatherAPI.
export const searchPlaces = async (query) => {
  const q = query.trim();
  if (q.length < 2) return [];
  const params = new URLSearchParams({ name: q, count: "6", language: "es", format: "json" });
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map((r) => ({
      id: `${r.latitude.toFixed(3)},${r.longitude.toFixed(3)}`,
      name: r.name,
      region: [r.admin1, r.country].filter(Boolean).join(", "),
      lat: r.latitude,
      lon: r.longitude,
    }));
  } catch {
    return [];
  }
};
