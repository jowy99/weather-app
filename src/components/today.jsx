import useWeatherData from '../hooks/useWeatherData.js';
import { getWeatherIcon } from '../utils/weatherIcons.js';

function Home() {
  const { weatherData, error } = useWeatherData();

  if (error)
  {
    return <p>Error fetching weather data.</p>
  }

  return (
    <div className="flex overflow-x-auto w-full px-4">
      {weatherData ? (
        <div className='flex space-x-4'>
          {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
            <div
              key={index}
              className='flex flex-col items-center space-y-2 p-4 border-2 border-gray-800 dark:border-white rounded-md'
            >
              <p className='dark:text-white'>{hour.time.split(' ')[1]}</p>
              <img src={getWeatherIcon(hour.condition.code, hour.is_day)} alt={hour.condition.text} />
              <p className='dark:text-white'>{hour.temp_c}°C</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Home;
