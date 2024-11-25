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
      <div className="flex flex-col items-center justify-center w-full h-full">
        {weatherData ? (
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <img className='w-2/4 h-2/4' src={weatherData.current.condition.icon} alt="" />
            <div className='flex flex-col items-center justify-center space-y-2'>
                <h2 className='text-2xl font-bold'>{weatherData.location.name}</h2>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-4xl'>{weatherData.current.temp_c}°C</p>
                    <p className='text-blue-400 font-medium'>{weatherData.current.condition.text}</p>
                    <div className='flex space-x-4'>
                        <div className='flex space-x-2'>
                            <p>Máx:</p>
                            <p>{weatherData.forecast.forecastday[0].day.maxtemp_c}°C</p>
                        </div>
                        <div className='flex space-x-2'>
                            <p>Mín:</p>
                            <p>{weatherData.forecast.forecastday[0].day.mintemp_c}°C</p>
                        </div>
                    </div>
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
