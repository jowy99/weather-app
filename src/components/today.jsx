import PropTypes from 'prop-types';
import { getWeatherIcon } from '../utils/weatherIcons.js';

function Today({ weatherData = null, error = null }) {
  if (error) {
    return <p>Error fetching weather data.</p>;
  }

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  // Obtén la hora actual
  const currentHour = new Date().getHours();

  // Filtra las horas a partir de la hora actual
  const filteredHours = weatherData.forecast.forecastday[0].hour.filter((hour) => {
    const forecastHour = parseInt(hour.time.split(' ')[1].split(':')[0], 10);
    return forecastHour >= currentHour;
  });

  return (
    <div className="flex w-full px-4 py-8 overflow-x-auto rounded-xl md:px-8 lg:px-12 lg:py-12">
      <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
        {filteredHours.map((hour, index) => {
          const forecastHour = parseInt(hour.time.split(' ')[1].split(':')[0], 10);
          const displayTime = forecastHour === currentHour ? 'Ahora' : hour.time.split(' ')[1];

          return (
            <div
              key={index}
              className="flex flex-col p-4 w-28 items-center justify-between rounded-3xl border shadow-lg transition-transform duration-300 hover:scale-105
                backdrop-blur-lg backdrop-saturate-150 bg-white/50 dark:bg-[rgba(17,25,40,0.5)] border-gray-300/20 dark:border-white/10
                md:w-36 md:p-5 lg:w-44 lg:p-6"
            >
              <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white md:text-base lg:text-lg">
                {displayTime}
              </h3>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center p-3 rounded-full shadow-lg bg-neutral-50 md:p-4 lg:p-5 dark:bg-gray-800">
                  <img
                    className="w-10 h-10 opacity-100 md:w-12 md:h-12 lg:w-14 lg:h-14 dark:opacity-90"
                    src={getWeatherIcon(hour.condition.code, hour.is_day)}
                    alt={hour.condition.text}
                  />
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200 md:text-xl lg:text-2xl">
                  {Math.round(hour.temp_c)}&deg;C
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Validación de props con prop-types
Today.propTypes = {
  weatherData: PropTypes.shape({
    forecast: PropTypes.shape({
      forecastday: PropTypes.arrayOf(
        PropTypes.shape({
          hour: PropTypes.arrayOf(
            PropTypes.shape({
              time: PropTypes.string.isRequired,
              temp_c: PropTypes.number.isRequired,
              condition: PropTypes.shape({
                text: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
              }).isRequired,
              is_day: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired, // Agregado is_day
            }).isRequired
          ).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }),
  error: PropTypes.string,
};

export default Today;