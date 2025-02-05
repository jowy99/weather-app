import PropTypes from 'prop-types';
import BigCard from '../UI/cards/bigcard';

function Astro({ weatherData = null, error = null }) {
  if (error) {
    return (
      <p className="p-4 text-lg font-medium text-red-500 dark:text-red-300">
        Error fetching weather data: {error}
      </p>
    );
  }

  if (!weatherData) {
    return (
      <p className="p-32 text-xl font-medium text-gray-500 dark:text-gray-300">
        Fetching weather data...
      </p>
    );
  }

  // Datos para las tarjetas (reutilización)
  const astroCardData = [
    { title: 'Salida de la luna', icon: '/weather-icons/wi_moonrise.svg', value: weatherData.forecast.forecastday[0].astro.moonrise },
    { title: 'Puesta de la luna', icon: '/weather-icons/wi_moonset.svg', value: weatherData.forecast.forecastday[0].astro.moonset },
    { title: 'Amanecer', icon: '/weather-icons/wi_sunrise.svg', value: weatherData.forecast.forecastday[0].astro.sunrise },
    { title: 'Atardecer', icon: '/weather-icons/wi_sunset.svg', value: weatherData.forecast.forecastday[0].astro.sunset },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
      {astroCardData.map((card, index) => (
        <BigCard key={index} {...card} />
      ))}
    </div>
  );
}

// Validación de props con prop-types
Astro.propTypes = {
  weatherData: PropTypes.shape({
    forecast: PropTypes.shape({
      forecastday: PropTypes.arrayOf(
        PropTypes.shape({
          astro: PropTypes.shape({
            moonrise: PropTypes.string.isRequired,
            moonset: PropTypes.string.isRequired,
            sunrise: PropTypes.string.isRequired,
            sunset: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }),
  error: PropTypes.string,
};

export default Astro;