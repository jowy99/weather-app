export const fetchWeatherData = async (query = "Madrid") => {
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${query}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data; // Retorna los datos de la API
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null; // Manejo de errores
  }
};
