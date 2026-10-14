import PropTypes from "prop-types";
import HourCard from "../UI/cards/hourCard";

const getHourKey = (time) => time?.slice(0, 13) ?? "";

function Today({ weatherData = null, error = null }) {
  if (error) {
    return (
      <p className="mx-auto max-w-7xl px-4 py-6 text-rose-600 dark:text-rose-300">
        Error fetching weather data: {error}. Please try again later.
      </p>
    );
  }

  if (!weatherData?.forecast?.forecastday?.[0]?.hour) {
    return (
      <p className="mx-auto max-w-7xl px-4 py-16 text-xl font-medium text-slate-500 dark:text-slate-300">
        Fetching weather data...
      </p>
    );
  }

  const currentHourKey = getHourKey(weatherData.location?.localtime);
  const hourlyForecast = weatherData.forecast.forecastday.flatMap((day) => day.hour ?? []);
  const filteredHours = hourlyForecast
    .filter((hour) => getHourKey(hour.time) >= currentHourKey)
    .slice(0, 24);

  return (
    <div className="weather-scroll mx-auto flex w-full max-w-7xl overflow-x-auto px-4 py-7 md:px-8 lg:px-10 lg:py-10">
      <div className="flex space-x-4 md:space-x-5 lg:space-x-6">
        {filteredHours.map((hour, index) => (
          <HourCard key={index} hour={hour} isCurrentHour={index === 0} />
        ))}
      </div>
    </div>
  );
}

// Validación de props con prop-types
Today.propTypes = {
  weatherData: PropTypes.shape({
    location: PropTypes.shape({
      localtime: PropTypes.string.isRequired,
    }).isRequired,
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
              is_day: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
            }).isRequired
          ).isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }),
  error: PropTypes.string,
};

export default Today;
