import PropTypes from "prop-types";
import { getWeatherIcon } from "../../../utils/weatherIcons";

// Subcomponente para mostrar cada hora
const HourCard = ({ hour, isCurrentHour }) => {
  const displayTime = isCurrentHour ? "Ahora" : hour.time.split(" ")[1];

  return (
    <div
      className="
        group relative
        flex min-h-[12.75rem] w-32 shrink-0
        flex-col items-center justify-between
        overflow-hidden
        rounded-[2rem]
        border border-white/60
        bg-white/40
        p-4
        text-center
        shadow-[0_8px_32px_rgba(15,23,42,0.08)]
        backdrop-blur-2xl
        backdrop-saturate-150
        transition-all duration-300

        dark:border-white/15
        dark:bg-white/[0.07]
        dark:shadow-[0_8px_32px_rgba(0,0,0,0.30)]

        md:w-36 md:p-5
        lg:w-40 lg:p-5
      "
    >
      {/* Reflejo del cristal */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-br
          from-white/60
          via-white/15
          to-transparent
          opacity-70

          dark:from-white/15
          dark:via-white/[0.03]
          dark:to-transparent
          dark:opacity-100
        "
      />

      {/* Borde / brillo interior */}
      <div
        className="
          pointer-events-none absolute inset-[1px]
          rounded-[calc(2rem-1px)]
          ring-1 ring-inset ring-white/20

          dark:ring-white/[0.06]
        "
      />

      {/* Hora */}
      <h3 className="relative z-10 mb-2 text-sm font-semibold tracking-tight  text-slate-900 dark:text-white md:text-base">
        {displayTime}
      </h3>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center space-y-2">
        {/* Glass del icono */}
        <div
          className="
            flex items-center justify-center
            rounded-full
            border border-white/70
            bg-white/45
            p-3
            shadow-[0_4px_20px_rgba(15,23,42,0.08)]
            backdrop-blur-xl
            backdrop-saturate-150

            dark:border-white/15
            dark:bg-white/[0.10]
            dark:shadow-[0_4px_20px_rgba(0,0,0,0.20)]

            md:p-4
          "
        >
          <img
            className="w-10 h-10 md:h-12 md:w-12"
            src={getWeatherIcon(hour.condition.code, hour.is_day)}
            alt={`Weather icon showing ${hour.condition.text} with a temperature of ${Math.round(hour.temp_c)}°C`}
          />
        </div>

        {/* Temperatura */}
        <p className="text-2xl font-semibold tracking-tight  text-slate-950 dark:text-white">
          {Math.round(hour.temp_c)}&deg;C
        </p>
      </div>
    </div>
  );
};

HourCard.propTypes = {
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

export default HourCard;
