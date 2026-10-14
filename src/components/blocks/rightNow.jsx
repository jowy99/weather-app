import PropTypes from "prop-types";
import { getWeatherIcon } from "../../utils/weatherIcons.js";
import { translateCondition } from "../../utils/translations.js";

const highPriorityImageProps = { fetchpriority: "high" };

function rightNow({ weatherData = null, error = null }) {
  const icon = weatherData
    ? getWeatherIcon(weatherData.current.condition.code, weatherData.current.is_day)
    : "/weather-icons/wi_clear-day.svg";
  const locationName = weatherData?.location.name ?? "Madrid";
  const condition = weatherData
    ? translateCondition(weatherData.current.condition.text)
    : error
      ? "No se ha podido cargar el tiempo"
      : "Cargando el tiempo...";

  return (
    <div className="relative flex flex-col items-center justify-center px-4 pt-5 text-center dark:text-white sm:pt-8">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center w-full max-w-md p-5 sm:p-7">
          <img
            className="h-52 w-52 sm:h-64 sm:w-64"
            src={icon}
            alt={weatherData ? `Weather icon showing ${weatherData.current.condition.text} in ${locationName}` : ""}
            aria-hidden={!weatherData}
            width="256"
            height="256"
            loading="eager"
            {...highPriorityImageProps}
          />
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{locationName}</h2>
          {weatherData && (
            <p className="mt-1 text-6xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-7xl">
              {Math.round(weatherData.current.temp_c)}&deg;C
            </p>
          )}
          <p className="mt-2 text-lg font-medium text-sky-600 dark:text-sky-300 sm:text-xl">
            {condition}
          </p>
          {weatherData && (
            <div className="mt-5 flex rounded-full px-4 py-2 text-sm font-semibold text-slate-600 ring-1 ring-white/60 glass-surface dark:text-slate-200">
              <p>
                <span className="text-sky-700 dark:text-sky-300">Máx:</span>{" "}
                {Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}&deg;C
              </p>
              <span className="mx-3 text-slate-300 dark:text-slate-600">|</span>
              <p>
                <span className="text-sky-700 dark:text-sky-300">Mín:</span>{" "}
                {Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}&deg;C
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

rightNow.propTypes = {
  error: PropTypes.string,
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
