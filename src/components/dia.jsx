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
                <h3 className='text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4'>Humidity</h3>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='flex items-center justify-center bg-white dark:bg-slate-500 rounded-full p-5 shadow-lg transition-all duration-300'>
                        <img src="/weather-icons/wi_humidity.svg" alt="Humidity" className='w-20 h-20 opacity-90 drop-shadow-lg' />
                    </div>
                    <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{weatherData.current.humidity} %</p>
                </div>
            </div>
            <div className='flex flex-col p-6 w-full h-full items-center justify-between border border-gray-300 rounded-3xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-transform duration-300 hover:scale-105'>
                <h3 className='text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4'>Therman sensation</h3>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='flex items-center justify-center bg-white dark:bg-slate-500 rounded-full p-5 shadow-lg transition-all duration-300'>
                        <img src="/weather-icons/wi_thermometer.svg" alt="Therman sensation" className='w-20 h-20 drop-shadow-lg' />
                    </div>
                    <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{weatherData.current.feelslike_c} °C</p>
                </div>
            </div>
            <div className='flex flex-col p-6 w-full h-full items-center justify-between border border-gray-300 rounded-3xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-transform duration-300 hover:scale-105'>
                <h3 className='text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4'>Wind</h3>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='flex items-center justify-center bg-white dark:bg-slate-500 rounded-full p-5 shadow-lg transition-all duration-300'>
                        <img src="/weather-icons/wi_wind.svg" alt="Wind" className='w-20 h-20 opacity-90 drop-shadow-lg' />
                    </div>
                    <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{weatherData.current.wind_kph} km/h</p>
                </div>
            </div>
            <div className='flex flex-col p-6 w-full h-full items-center justify-between border border-gray-300 rounded-3xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-transform duration-300 hover:scale-105'>
                <h3 className='text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4'>Preassure</h3>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='flex items-center justify-center bg-white dark:bg-slate-500 rounded-full p-5 shadow-lg transition-all duration-300'>
                        <img src="/weather-icons/wi_pressure-high.svg" alt="Preassure" className='w-20 h-20 opacity-90 drop-shadow-lg' />
                    </div>
                    <p className='text-2xl font-bold text-gray-800 dark:text-gray-200'>{weatherData.current.pressure_mb} hPa</p>
                </div>
            </div>
        </div>
    )
};

export default Astro;