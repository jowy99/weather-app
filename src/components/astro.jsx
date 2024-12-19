import useWeatherData from '../hooks/useWeatherData.js';
import BigCard from './cards/bigcard.jsx';

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
            <BigCard
                title="Moonrise"
                icon="/weather-icons/wi_moonrise.svg"
                value={weatherData.forecast.forecastday[0].astro.moonrise}
            />
            <BigCard
                title="Moonset"
                icon="/weather-icons/wi_moonset.svg"
                value={weatherData.forecast.forecastday[0].astro.moonset}
            />
            <BigCard
                title="Sunrise"
                icon="/weather-icons/wi_sunrise.svg"
                value={weatherData.forecast.forecastday[0].astro.sunrise}
            />
            <BigCard
                title="Sunset"
                icon="/weather-icons/wi_sunset.svg"
                value={weatherData.forecast.forecastday[0].astro.sunset}
            />
        </div>
    )
};

export default Astro;