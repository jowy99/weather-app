import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/rapidapi.js';

function Home() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data); // Guarda los datos en el estado
    };

    fetchData();
  }, []); // Ejecuta una vez al montar el componente

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        {weatherData ? (
          <div className='flex flex-col space-y-12'>
            <h2 className='text-2xl font-bold'>{weatherData.location.name}</h2>
            <img src={weatherData.current.condition.icon} alt="" />
            <div className='flex space-x-4'>
                <p>{weatherData.current.condition.text}</p>
                <p>{weatherData.current.temp_c}°C</p>
            </div>
            <div className='flex space-x-4'>
                <div className='flex space-x-2'>
                    <p>Maximas:</p>
                    <p>{weatherData.forecast.forecastday[0].day.maxtemp_c}</p>
                </div>
                <div className='flex space-x-2'>
                    <p>Minimas:</p>
                    <p>{weatherData.forecast.forecastday[0].day.mintemp_c}</p>
                </div>
            </div>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
