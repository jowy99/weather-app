import { useState, useEffect, useCallback } from "react";
import { fetchWeatherData, reverseGeocode } from "../services/rapidapi";
import { fetchExtendedDaily } from "../services/openMeteo";
import { saveToCache, getFromCache, getStaleFromCache } from "./cacheUtils";

const HOUR = 3600000;
const DEFAULT_PLACE = "Madrid";
const coords = (lat, lon) => `${Number(lat).toFixed(3)},${Number(lon).toFixed(3)}`;
// Un lugar puede ser un texto (nombre) o un objeto { id, name, region, lat, lon }.
// Si tiene coordenadas se consulta SIEMPRE por coordenadas, nunca por nombre.
const queryOf = (p) => (typeof p === "string" ? p : p.lat != null ? coords(p.lat, p.lon) : p.name);

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [extendedDays, setExtendedDays] = useState(null);
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [offlineSince, setOfflineSince] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadExtended = useCallback(async (lat, lon) => {
    const key = `extendedDays-v5-${coords(lat, lon)}`;
    const cached = getFromCache(key);
    if (cached) {
      setExtendedDays(cached);
      return;
    }
    try {
      const data = await fetchExtendedDaily(lat, lon);
      saveToCache(key, data, 3 * HOUR);
      setExtendedDays(data);
    } catch (e) {
      const stale = getStaleFromCache(key);
      setExtendedDays(stale ? stale.data : null);
      console.warn("Previsión extendida no disponible:", e.message);
    }
  }, []);

  const fetchWeather = useCallback(
    async (target) => {
      const query = queryOf(target);
      const key = `weatherData-v4-${query}`;
      const byCoords = typeof target !== "string" && target.lat != null;

      const show = (data) => {
        const name = (byCoords && target.name) || data.location.name;
        setWeatherData({ ...data, location: { ...data.location, name } });
        setPlace({
          id: byCoords ? coords(target.lat, target.lon) : coords(data.location.lat, data.location.lon),
          name,
          region: (byCoords && target.region) || [data.location.region, data.location.country].filter(Boolean).join(", "),
          lat: byCoords ? target.lat : data.location.lat,
          lon: byCoords ? target.lon : data.location.lon,
        });
        loadExtended(data.location.lat, data.location.lon);
      };

      setLoading(true);
      setError(null);
      setNotice(null);
      try {
        const cached = getFromCache(key);
        if (cached) {
          setOfflineSince(null);
          show(cached);
          return;
        }
        const data = await fetchWeatherData(query);
        saveToCache(key, data, HOUR);
        setOfflineSince(null);
        show(data);
      } catch (e) {
        const stale = getStaleFromCache(key);
        if (stale) {
          setOfflineSince(stale.timestamp);
          show(stale.data);
        } else {
          setError(
            navigator.onLine === false
              ? "Sin conexión y sin datos guardados para esta ubicación."
              : "No se ha podido cargar el tiempo. Inténtalo de nuevo en unos minutos.",
          );
        }
        console.warn("Error al cargar el tiempo:", e.message);
      } finally {
        setLoading(false);
      }
    },
    [loadExtended],
  );

  // fromUser = true cuando lo pide el usuario con el botón (muestra avisos en vez de ir a Madrid)
  const fetchCurrentLocationWeather = useCallback(
    (fromUser = false) => {
      setNotice(null);
      if (!navigator.geolocation) {
        if (fromUser) setNotice("Tu navegador no permite obtener la ubicación.");
        else fetchWeather(DEFAULT_PLACE);
        return;
      }
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async ({ coords: c }) => {
          const { name, region } = await reverseGeocode(c.latitude, c.longitude);
          fetchWeather({ name: name || null, region, lat: c.latitude, lon: c.longitude });
        },
        (err) => {
          setLoading(false);
          console.warn("Geolocalización no disponible:", err.message);
          if (fromUser) setNotice("No se ha podido obtener tu ubicación. Revisa los permisos de ubicación del navegador.");
          else fetchWeather(DEFAULT_PLACE);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: fromUser ? 0 : 600000 },
      );
    },
    [fetchWeather],
  );

  // Al iniciar: intentar la ubicación actual (si no hay permiso, Madrid)
  useEffect(() => {
    fetchCurrentLocationWeather(false);
  }, [fetchCurrentLocationWeather]);

  // Al recuperar la conexión, recargar el lugar actual
  useEffect(() => {
    const onOnline = () => place && fetchWeather(place);
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [place, fetchWeather]);

  return { weatherData, extendedDays, place, error, notice, offlineSince, loading, fetchWeather, fetchCurrentLocationWeather };
};

export default useWeatherData;
