// Configuración de opciones generales para fetch
export const fetchOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
    "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
  },
};

// Función para fetch de datos climáticos
export const fetchWeatherData = async (query = "Madrid") => {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${query}`;

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
