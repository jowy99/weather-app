import PropTypes from 'prop-types';
import BigCard from '../UI/cards/bigCard.jsx';

function Astro({ weatherData = null, error = null }) {
  if (error) {
    return (
      <p className="mx-auto max-w-7xl px-4 py-6 text-lg font-medium text-rose-600 dark:text-rose-300">
        Error fetching weather data: {error}
      </p>
    );
  }

  if (!weatherData) {
    return (
      <p className="mx-auto max-w-7xl px-4 py-16 text-xl font-medium text-slate-500 dark:text-slate-300">
        Fetching weather data...
      </p>
    );
  }

  // Datos para las tarjetas (para evitar repetición de código)
  const bigCardData = [
    { title: 'Humedad', icon: '/weather-icons/wi_humidity.svg', value: `${weatherData.current.humidity} %` },
    { title: 'Sensación térmica', icon: '/weather-icons/wi_thermometer.svg', value: `${Math.round(weatherData.current.feelslike_c)} °C` },
    { title: 'Viento', icon: '/weather-icons/wi_wind.svg', value: `${Math.round(weatherData.current.wind_kph)} km/h` },
    { title: 'Presión', icon: '/weather-icons/wi_pressure-high.svg', value: `${weatherData.current.pressure_mb} hPa` },
  ];

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 px-4 py-3 md:grid-cols-4 md:px-8 lg:px-10">
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
