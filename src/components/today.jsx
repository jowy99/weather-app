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
    <div className='flex items-center justify-center'>
      <div className="flex overflow-x-auto w-full lg:w-1/3 p-4">
        {weatherData ? (
          <div className='flex space-x-4'>
            {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
              <div
                key={index}
                className='flex flex-col items-center space-y-2 p-4 border-2 border-gray-800 dark:border-white rounded-md'
              >
                <p className='dark:text-white'>{hour.time.split(' ')[1]}</p>
                <img src={hour.condition.icon} alt={hour.condition.text} />
                <p className='dark:text-white'>{hour.temp_c}°C</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
