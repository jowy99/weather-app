import PropTypes from "prop-types";
import { getWeatherIcon } from "../../utils/weatherIcons.js";
import { translateCondition } from "../../utils/translations.js";

function rightNow({ weatherData = null }) {
  if (!weatherData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-xl font-medium text-gray-500 dark:text-gray-300">
          Fetching weather data...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center dark:text-white">
      <div className="flex flex-col items-center justify-center w-full p-8">
        <div className="flex flex-col items-center w-full max-w-md p-6">
          <img
            className="w-64 h-64"
            src={getWeatherIcon(weatherData.current.condition.code, weatherData.current.is_day)}
            alt={`Weather icon showing ${weatherData.current.condition.text} in ${weatherData.location.name}`}
          />
          <h2 className="mt-4 text-2xl font-extrabold">{weatherData.location.name}</h2>
          <p className="text-5xl font-bold">
            {Math.round(weatherData.current.temp_c)}&deg;C
          </p>
          <p className="text-xl font-medium text-blue-500">
            {translateCondition(weatherData.current.condition.text)}
          </p>
          <div className="flex mt-4 space-x-4">
            <p className="text-lg font-medium">
              <span className="font-semibold text-blue-600">Máx:</span>{" "}
              {Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}&deg;C
            </p>
            <p className="text-lg font-medium">
              <span className="font-semibold text-blue-600">Mín:</span>{" "}
              {Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}&deg;C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

rightNow.propTypes = {
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
      is_day: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
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
};

export default rightNow;