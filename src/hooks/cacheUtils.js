const DEFAULT_CACHE_DURATION = 3600000; // 1h en milisegundos

// Guardar datos en caché
export const saveToCache = (key, data, duration = DEFAULT_CACHE_DURATION) => {
    try {
        const cacheEntry = {
            data,
            timestamp: Date.now(),
            duration, // Guardamos la duración personalizada
        };
        localStorage.setItem(key, JSON.stringify(cacheEntry));
    } catch (error) {
        console.error("Error saving to cache:", error);
    }
};

// Recuperar datos del caché
export const getFromCache = (key) => {
    try {
        const cacheEntry = localStorage.getItem(key);
        if (!cacheEntry) return null;

        const { data, timestamp, duration } = JSON.parse(cacheEntry);

        // Usar la duración específica si está definida, de lo contrario usar la predeterminada
        const cacheDuration = duration || DEFAULT_CACHE_DURATION;

        // Verificar si los datos están caducados
        if (Date.now() - timestamp > cacheDuration) {
            localStorage.removeItem(key); // Eliminar datos caducados
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error retrieving from cache:", error);
        return null;
    }
};

// Eliminar datos del caché por clave
export const removeFromCache = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing from cache:", error);
    }
};

// Limpiar todo el caché
export const clearCache = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("Error clearing cache:", error);
    }
};
