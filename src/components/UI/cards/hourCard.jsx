import PropTypes from "prop-types";
import { getWeatherIcon } from "../../../utils/weatherIcons";

// Subcomponente para mostrar cada hora
const hourCard = ({ hour, isCurrentHour }) => {
  const displayTime = isCurrentHour ? "Ahora" : hour.time.split(" ")[1];
  return (
    <div
      className="flex flex-col p-4 w-28 items-center justify-between rounded-3xl border shadow-lg
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
            alt={`Weather icon showing ${hour.condition.text} with a temperature of ${Math.round(hour.temp_c)}°C`}
          />
        </div>
        <p className="text-lg font-bold text-gray-800 dark:text-gray-200 md:text-xl lg:text-2xl">
          {Math.round(hour.temp_c)}&deg;C
        </p>
      </div>
    </div>
  );
};

hourCard.propTypes = {
  hour: PropTypes.shape({
    time: PropTypes.string.isRequired,
    temp_c: PropTypes.number.isRequired,
    condition: PropTypes.shape({
      text: PropTypes.string.isRequired,
      code: PropTypes.number.isRequired,
    }).isRequired,
    is_day: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  }).isRequired,
  isCurrentHour: PropTypes.bool.isRequired,
};

export default hourCard;