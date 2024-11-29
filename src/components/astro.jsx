import useWeatherData from '../hooks/useWeatherData.js';

function Astro() {
    const { weatherData, error } = useWeatherData();

    if (error)
    {
      return <p>Error fetching weather data.</p>
    }

    if (!weatherData || !weatherData.current)
    {
        return <p>Loading weather data...</p>;
    }

    return(
        <div className='p-4 grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='flex flex-col p-6 w-full h-full items-center justify-between border border-gray-300 rounded-3xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-transform duration-300 hover:scale-105'>
                <h3 className='text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4'>Moonrise</h3>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='flex items-center justify-center bg-white dark:bg-slate-500 rounded-full p-5 shadow-lg transition-all duration-300'>
                        <img src="/weather-icons/wi_moonrise.svg" alt="Moonrise Icon" className='w-20 h-20 opacity-90' />
                    </div>
                    <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{weatherData.forecast.forecastday[0].astro.moonrise}</p>
                </div>
            </div>
            <div className='flex flex-col p-6 w-full h-full items-center justify-between border border-gray-300 rounded-3xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-transform duration-300 hover:scale-105'>
                <h3 className='text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4'>Moonset</h3>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='flex items-center justify-center bg-white dark:bg-slate-500 rounded-full p-5 shadow-lg transition-all duration-300'>
                        <img src="/weather-icons/wi_moonset.svg" alt="Moonset Icon" className='w-20 h-20 opacity-90' />
                    </div>
                    <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{weatherData.forecast.forecastday[0].astro.moonset}</p>
                </div>
            </div>
            <div className='flex flex-col p-6 w-full h-full items-center justify-between border border-gray-300 rounded-3xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-transform duration-300 hover:scale-105'>
                <h3 className='text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4'>Sunrise</h3>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='flex items-center justify-center bg-white dark:bg-slate-500 rounded-full p-5 shadow-lg transition-all duration-300'>
                        <img src="/weather-icons/wi_sunrise.svg" alt="Sunrise Icon" className='w-20 h-20 opacity-90' />
                    </div>
                    <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{weatherData.forecast.forecastday[0].astro.sunrise}</p>
                </div>
            </div>
            <div className='flex flex-col p-6 w-full h-full items-center justify-between border border-gray-300 rounded-3xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-transform duration-300 hover:scale-105'>
                <h3 className='text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4'>Sunset</h3>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='flex items-center justify-center bg-white dark:bg-slate-500 rounded-full p-5 shadow-lg transition-all duration-300'>
                        <img src="/weather-icons/wi_sunset.svg" alt="Sunset Icon" className='w-20 h-20 opacity-90' />
                    </div>
                    <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{weatherData.forecast.forecastday[0].astro.sunset}</p>
                </div>
            </div>
        </div>
    )
};

export default Astro;