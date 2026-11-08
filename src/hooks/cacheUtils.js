const DEFAULT_CACHE_DURATION = 3600000; // 1 h

export const saveToCache = (key, data, duration = DEFAULT_CACHE_DURATION) => {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now(), duration }));
  } catch {
    // almacenamiento lleno o bloqueado: se ignora
  }
};

const read = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Datos vigentes (no caducados). No borra los caducados: sirven para el modo sin conexión.
export const getFromCache = (key) => {
  const entry = read(key);
  if (!entry || Date.now() - entry.timestamp > entry.duration) return null;
  return entry.data;
};

// Últimos datos guardados aunque estén caducados, con su hora.
export const getStaleFromCache = (key) => {
  const entry = read(key);
  return entry ? { data: entry.data, timestamp: entry.timestamp } : null;
};
