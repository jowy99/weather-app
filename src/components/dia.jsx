import PropTypes from 'prop-types';
import BigCard from './cards/bigcard.jsx';

function Astro({ weatherData = null, error = null }) { // Recibe weatherData y error como props
  if (error) {
    return <p>Error fetching weather data.</p>;
  }

  if (!weatherData || !weatherData.current) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      <BigCard
        title="Humidity"
        icon="/weather-icons/wi_humidity.svg"
        value={`${weatherData.current.humidity} %`}
      />
      <BigCard
        title="Thermal sensation"
        icon="/weather-icons/wi_thermometer.svg"
        value={`${Math.round(weatherData.current.feelslike_c)} °C`}
      />
      <BigCard
        title="Wind"
        icon="/weather-icons/wi_wind.svg"
        value={`${Math.round(weatherData.current.wind_kph)} km/h`}
      />
      <BigCard
        title="Pressure"
        icon="/weather-icons/wi_pressure-high.svg"
        value={`${weatherData.current.pressure_mb} hPa`}
      />
    </div>
  );
}

// Validación de props con prop-types
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
