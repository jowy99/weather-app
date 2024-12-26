import PropTypes from 'prop-types';
import BigCard from './cards/bigcard.jsx';

function Astro({ weatherData = null, error = null }) { // Recibe weatherData y error como props
  if (error) {
    return <p>Error fetching weather data.</p>;
  }

  if (!weatherData || !weatherData.forecast) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
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
