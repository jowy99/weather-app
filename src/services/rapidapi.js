export const fetchWeatherData = async () => {
    const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=Granada';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST
      }
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data)
      return data; // Cambiado a JSON
    } catch (error) {
      console.error(error);
      return null; // Manejo de errores
    }
  };
  