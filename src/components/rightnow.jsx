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
        <div className='flex flex-col items-center justify-center w-full p-8'>
          <div className='flex flex-col items-center w-full max-w-md p-6'>
            <img 
              className='w-64 h-64' 
              src={getWeatherIcon(weatherData.current.condition.code, weatherData.current.is_day)} 
              alt={weatherData.current.condition.text} 
            />
            <div className='flex flex-col items-center justify-center mt-4 space-y-2'>
              <h2 className='text-2xl font-extrabold'>{weatherData.location.name}</h2>
              <p className='text-5xl font-bold'>{weatherData.current.temp_c}&deg;C</p>
              <p className='text-xl font-medium text-blue-500'>{weatherData.current.condition.text}</p>
              <div className='flex space-x-8 mt-4'>
                <p className='text-lg font-medium'>
                  <span className='font-semibold text-blue-600'>Max:</span> {weatherData.forecast.forecastday[0].day.maxtemp_c}&deg;C
                </p>
                <p className='text-lg font-medium'>
                  <span className='font-semibold text-blue-600'>Min:</span> {weatherData.forecast.forecastday[0].day.mintemp_c}&deg;C
                </p>
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
