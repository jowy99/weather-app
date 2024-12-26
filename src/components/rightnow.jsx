import PropTypes from 'prop-types';
import { getWeatherIcon } from '../utils/weatherIcons.js';

function Home({ weatherData = null, error= null }) {
  if (error) {
    return <p>Error fetching weather data.</p>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center dark:text-white">
      {weatherData ? (
        <div className="flex flex-col items-center justify-center w-full p-8">
          <div className="flex flex-col items-center w-full max-w-md p-6">
            <img
              className="w-64 h-64"
              src={getWeatherIcon(weatherData.current.condition.code, weatherData.current.is_day)}
              alt={weatherData.current.condition.text}
            />
            <div className="flex flex-col items-center justify-center mt-4 space-y-2">
              {/* Nombre ciudad */}
              <h2 className="text-2xl font-extrabold">{weatherData.location.name}</h2>

              {/* Temperatura ciudad */}
              <p className="text-5xl font-bold">{Math.round(weatherData.current.temp_c)}&deg;C</p>

              {/* Condiciones meteorológicas ciudad */}
              <p className="text-xl font-medium text-blue-500">{weatherData.current.condition.text}</p>

              {/* Max y Min temperatura */}
              <div className="flex space-x-8 mt-4">
                <p className="text-lg font-medium">
                  <span className="font-semibold text-blue-600">Max:</span> {Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}&deg;C
                </p>
                <p className="text-lg font-medium">
                  <span className="font-semibold text-blue-600">Min:</span> {Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}&deg;C
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

// Validación de props con prop-types
Home.propTypes = {
  weatherData: PropTypes.shape({
    location: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    current: PropTypes.shape({
      temp_c: PropTypes.number.isRequired,
      condition: PropTypes.shape({
        text: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
      }).isRequired,
      is_day: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired, // Agregado is_day
    }).isRequired,
    forecast: PropTypes.shape({
      forecastday: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.shape({
            maxtemp_c: PropTypes.number.isRequired,
            mintemp_c: PropTypes.number.isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }),
  error: PropTypes.string,
};

export default Home;
