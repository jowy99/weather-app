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
            <div className='flex flex-col p-4 w-full h-full items-center justify-center border-2 border-zinc-800 rounded-lg'>
                <h3 className='text-sm font-bold text-blue-500'>Humedad</h3>
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <img src="/weather-icons/wi_humidity.svg" alt="" className='w-24 h-24' />
                    <p className='text-xl font-semibold'>{weatherData.current.humidity} %</p>
                </div>
            </div>
            <div className='flex flex-col p-4 w-full h-full items-center justify-center border-2 border-zinc-800 rounded-lg'>
                <h3 className='text-sm font-bold text-blue-500'>Sensación térmica</h3>
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <img src="/weather-icons/wi_thermometer.svg" alt="" className='w-24 h-24' />
                    <p className='text-xl font-semibold'>{weatherData.current.feelslike_c} °C</p>
                </div>
            </div>
            <div className='flex flex-col p-4 w-full h-full items-center justify-center border-2 border-zinc-800 rounded-lg'>
                <h3 className='text-sm font-bold text-blue-500'>Viento</h3>
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <img src="/weather-icons/wi_wind.svg" alt="" className='w-24 h-24' />
                    <p className='text-xl font-semibold'>{weatherData.current.wind_kph} /kmph</p>
                </div>
            </div>
            <div className='flex flex-col p-4 w-full h-full items-center justify-center border-2 border-zinc-800 rounded-lg'>
                <h3 className='text-sm font-bold text-blue-500'>Presión</h3>
                <div className='flex flex-col items-center justify-center space-y-2'>
                    <img src="/weather-icons/wi_pressure-high.svg" alt="" className='w-24 h-24' />
                    <p className='text-xl font-semibold'>{weatherData.current.pressure_mb} hPa</p>
                </div>
            </div>
        </div>
    )
};

export default Astro;