import PropTypes from "prop-types";
import { getWeatherIcon } from "../../utils/weatherIcons.js";
import { getWmoIcon } from "../../utils/wmoIcons.js";
import { weekdayLabel, tempColor } from "../../utils/format.js";

function Daily({ weatherData = null, extendedDays = null }) {
  if (!weatherData) return null;

  const apiDays = (weatherData.forecast?.forecastday ?? []).map((d) => ({
    date: d.date,
    icon: getWeatherIcon(d.day.condition.code, 1),
    min: d.day.mintemp_c,
    max: d.day.maxtemp_c,
    rain: d.day.daily_chance_of_rain,
  }));

  let days = [...apiDays];
  if (extendedDays && extendedDays.length > 0) {
    const lastApiDate = apiDays.length > 0 ? apiDays[apiDays.length - 1].date : null;
    const extra = extendedDays
      .filter((e) => !lastApiDate || e.date > lastApiDate)
      .map((e) => ({
        date: e.date,
        icon: getWmoIcon(e.code),
        min: e.min,
        max: e.max,
        rain: e.rain,
      }));
    days = [...days, ...extra];
  }

  days = days.slice(0, 10);

  if (days.length === 0) return null;

  const gMin = Math.min(...days.map((d) => d.min));
  const gMax = Math.max(...days.map((d) => d.max));
  const range = Math.max(gMax - gMin, 1);

  return (
    <section aria-labelledby="daily-title" className="glass-card w-full rounded-3xl p-4 sm:p-5">
      <h2 id="daily-title" className="flex items-center gap-2 border-b border-white/15 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-white/70"><path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm-2 8h14v10H5V10z"/></svg>
        Próximos {days.length} días
      </h2>
      <ul>
        {days.map((d, i) => {
          const ariaLabel = `${i === 0 ? "Hoy" : weekdayLabel(d.date)}: mínima ${Math.round(d.min)} grados, máxima ${Math.round(d.max)} grados, ${d.rain} % de lluvia`;
          return (
            <li key={d.date} aria-label={ariaLabel} className="grid grid-cols-[3.5rem_2.5rem_2.75rem_1fr_2.75rem] items-center gap-3 border-t border-white/15 py-3 first:border-t-0">
              <span className="text-lg font-medium text-white">{i === 0 ? "Hoy" : weekdayLabel(d.date)}</span>
              <span className="flex flex-col items-center">
                <img src={d.icon} alt="" aria-hidden="true" width="32" height="32" className="h-8 w-8" />
                {d.rain >= 20 && <span className="text-xs font-semibold text-sky-100">{d.rain}%</span>}
              </span>
              <span className="text-right text-lg font-normal text-white/85">{Math.round(d.min)}°</span>
              <span className="relative h-1.5 rounded-full bg-black/25" aria-hidden="true">
                <span
                  className="absolute inset-y-0 rounded-full"
                  style={{
                    left: `${((d.min - gMin) / range) * 100}%`,
                    width: `${Math.max(((d.max - d.min) / range) * 100, 4)}%`,
                    background: `linear-gradient(90deg, ${tempColor(d.min)}, ${tempColor(d.max)})`,
                  }}
                />
                {i === 0 && (
                  <span
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-[color:var(--accent)]"
                    style={{ left: `${((weatherData.current.temp_c - gMin) / range) * 100}%` }}
                  />
                )}
              </span>
              <span className="text-right text-lg font-normal text-white">{Math.round(d.max)}°</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

Daily.propTypes = {
  weatherData: PropTypes.shape({
    forecast: PropTypes.shape({
      forecastday: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
          day: PropTypes.shape({
            condition: PropTypes.shape({
              code: PropTypes.number,
            }),
          }),
          mintemp_c: PropTypes.number,
          maxtemp_c: PropTypes.number,
          daily_chance_of_rain: PropTypes.number,
        })
      ),
    }),
    current: PropTypes.shape({
      temp_c: PropTypes.number,
    }),
  }),
  extendedDays: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      code: PropTypes.number,
      min: PropTypes.number,
      max: PropTypes.number,
      rain: PropTypes.number,
    })
  ),
};

export default Daily;
