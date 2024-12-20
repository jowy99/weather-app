const DEFAULT_CACHE_DURATION = 3600000; // 1h en milisegundos

export const saveToCache = (key, data, duration = DEFAULT_CACHE_DURATION) => {
  const cacheEntry = { data, timestamp: Date.now(), duration };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
};

export const getFromCache = (key) => {
  const cacheEntry = localStorage.getItem(key);
  if (!cacheEntry) return null;

  const { data, timestamp, duration } = JSON.parse(cacheEntry);
  if (Date.now() - timestamp > duration) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};
