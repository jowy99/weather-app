const CACHE_DURATION = 3600000; // 1h = ms

export const saveToCache = (key, data) => {
    const cacheEntry = {
        data,
        timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
};

export const getFromCache = (key) => {
    const cacheEntry = localStorage.getItem(key);
    if (!cacheEntry) return null;

    const { data, timestamp } = JSON.parse(cacheEntry);

    if(Date.now() - timestamp > CACHE_DURATION)
    {
        // Si los datos estan caducados, los eliminamos.
        localStorage.removeItem(key);
        return null;
    };
    return data;
};