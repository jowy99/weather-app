import PropTypes from 'prop-types';
import BigCard from '../UI/cards/bigcard.jsx';

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

  // Datos para las tarjetas (para evitar repetición de código)
  const bigCardData = [
    { title: 'Humidity', icon: '/weather-icons/wi_humidity.svg', value: `${weatherData.current.humidity} %` },
    { title: 'Thermal sensation', icon: '/weather-icons/wi_thermometer.svg', value: `${Math.round(weatherData.current.feelslike_c)} °C` },
    { title: 'Wind', icon: '/weather-icons/wi_wind.svg', value: `${Math.round(weatherData.current.wind_kph)} km/h` },
    { title: 'Pressure', icon: '/weather-icons/wi_pressure-high.svg', value: `${weatherData.current.pressure_mb} hPa` },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
      {bigCardData.map((card, index) => (
        <BigCard key={index} {...card} />
      ))}
    </div>
  );
}

Astro.propTypes = {
  weatherData: PropTypes.shape({
    current: PropTypes.shape({
      humidity: PropTypes.number.isRequired,
      feelslike_c: PropTypes.number.isRequired,
      wind_kph: PropTypes.number.isRequired,
      pressure_mb: PropTypes.number.isRequired,
    }).isRequired,
  }),
  error: PropTypes.string,
};

export default Astro;