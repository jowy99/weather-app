import PropTypes from "prop-types";
import { getWeatherIcon } from "../../utils/weatherIcons.js";
import { translateCondition } from "../../utils/translations.js";

const highPriorityImageProps = { fetchpriority: "high" };

function rightNow({ weatherData = null, error = null }) {
  const icon = weatherData
    ? getWeatherIcon(weatherData.current.condition.code, weatherData.current.is_day)
    : "/weather-icons/fill/wi_clear-day.svg";
  const locationName = weatherData?.location.name ?? "Madrid";
  const condition = weatherData
    ? translateCondition(weatherData.current.condition.text)
    : error
      ? "No se ha podido cargar el tiempo"
      : "Cargando…";

  const sh = "drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] [text-shadow:0_0_18px_rgba(15,23,42,0.55)]";
  const today = weatherData?.forecast.forecastday[0].day;
  const when = weatherData
    ? new Date(weatherData.location.localtime.replace(" ", "T")).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
    : "";
  const conditionBlock = (imgCls, condCls, rangeCls) => (
    <>
      <img
        className={imgCls}
        src={icon}
        alt={weatherData ? `Icono del tiempo: ${condition} en ${locationName}` : ""}
        aria-hidden={!weatherData}
        width="144"
        height="144"
        loading="eager"
        {...highPriorityImageProps}
      />
      <p className={`${condCls} font-normal ${sh}`}>{condition}</p>
      <p className={`whitespace-nowrap ${rangeCls} text-white/90 font-normal ${sh}`}>
        {today ? <>Máx. {Math.round(today.maxtemp_c)}&deg; · Mín. {Math.round(today.mintemp_c)}&deg;</> : " "}
      </p>
    </>
  );
  return (
    <header className="relative pt-4 text-white sm:pt-8">
      {/* Móvil: cabecera centrada en columna */}
      <div className="flex flex-col items-center text-center md:hidden">
        <img
          className="h-40 w-40"
          src={icon}
          alt={weatherData ? `Icono del tiempo: ${condition} en ${locationName}` : ""}
          aria-hidden={!weatherData}
          width="160"
          height="160"
          loading="eager"
          {...highPriorityImageProps}
        />
        <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 ${sh}`}>{when || " "}</p>
        <h2 className={`font-sans text-5xl font-normal leading-tight ${sh}`}>{locationName}</h2>
        <p className={`font-sans text-7xl font-normal leading-none ${sh}`}>{weatherData ? <>{Math.round(weatherData.current.temp_c)}&deg;</> : " "}</p>
        <p className={`mt-1 text-xl font-semibold ${sh}`}>{condition}</p>
        <p className={`whitespace-nowrap text-xl font-normal ${sh}`}>
          {today ? <>Máx.: {Math.round(today.maxtemp_c)}&deg;&nbsp;&nbsp;Mín.: {Math.round(today.mintemp_c)}&deg;</> : " "}
        </p>
      </div>

      {/* Tablet y escritorio: temperatura a la izquierda, condición a la derecha */}
      <div className="hidden items-end justify-between gap-10 md:flex md:px-8 lg:px-14">
        <div className="min-w-0">
          <p className={`text-sm font-semibold uppercase tracking-[0.2em] text-white/85 ${sh}`}>{when || " "}</p>
          <h2 className={`mt-1 font-sans text-6xl font-normal leading-tight ${sh}`}>{locationName}</h2>
          <p className={`mt-2 font-sans text-[9.5rem] font-normal leading-[0.8] ${sh}`}>{weatherData ? <>{Math.round(weatherData.current.temp_c)}&deg;</> : " "}</p>
        </div>
        <div className="pb-3 text-right">{conditionBlock("ml-auto h-32 w-32 lg:h-36 lg:w-36", "text-3xl", "text-xl")}</div>
      </div>
    </header>
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
