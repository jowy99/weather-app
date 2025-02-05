import PropTypes from "prop-types";
import HourCard from "../UI/cards/hourCard";

function Today({ weatherData = null, error = null }) {
  if (error) {
    return (
      <p className="text-red-500">
        Error fetching weather data: {error}. Please try again later.
      </p>
    );
  }

  if (!weatherData?.forecast?.forecastday?.[0]?.hour) {
    return (
      <p className="p-32 text-xl font-medium text-gray-500 dark:text-gray-300">
        Fetching weather data...
      </p>
    );
  }

  // Obtén la hora actual
  const currentHour = new Date().getHours();

  // Filtra las horas a partir de la hora actual
  const filteredHours = weatherData.forecast.forecastday[0].hour.filter((hour) => {
    const forecastHour = parseInt(hour.time.split(" ")[1].split(":")[0], 10);
    return forecastHour >= currentHour;
  });

  return (
    <div className="flex w-full px-4 py-8 overflow-x-auto rounded-xl md:px-8 lg:px-12 lg:py-12">
      <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
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