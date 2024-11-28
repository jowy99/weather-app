import useWeatherData from '../hooks/useWeatherData.js';
import { getWeatherIcon } from '../utils/weatherIcons.js';

function Home() {
  const { weatherData, error } = useWeatherData();

  if (error)
  {
    return <p>Error fetching weather data.</p>
  }

  return (
    <div className="relative flex flex-col items-center justify-center dark:text-white">
      {weatherData ? (
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <h2 className='text-2xl font-bold'>{weatherData.location.name}</h2>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <img className='w-2/4 h-2/4' src={getWeatherIcon(weatherData.current.condition.code, weatherData.current.condition.is_day)} alt={weatherData.current.condition.text} />
            <div className='flex flex-col items-center justify-center'>
                <p className='text-4xl font-bold'>{weatherData.current.temp_c}</p>
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
  );
}

export default Home;
