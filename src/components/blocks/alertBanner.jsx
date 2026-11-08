import PropTypes from "prop-types";
import { translateAlerts } from "../../utils/alerts";

const LEVEL_STROKE = { amarillo: "#fbbf24", naranja: "#f97316", rojo: "#ef4444" };

function AlertBanner({ weatherData = null }) {
  const alerts = translateAlerts(weatherData?.alerts?.alert);
  if (alerts.length === 0) return null;

  const primero = alerts[0];
  const resto = alerts.length - 1;
  const stroke = LEVEL_STROKE[primero.level] || "#fbbf24";

  return (
    <section role="alert" aria-label="Aviso meteorológico" className="glass-card w-full rounded-3xl p-4 sm:p-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/85">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Aviso meteorológico
      </p>
      <p className="mt-2 font-semibold text-white">{primero.title}</p>
      <p className="mt-1 text-sm font-medium text-white/80">Nivel {primero.level}</p>
      {primero.zones && <p className="mt-1 text-sm text-white/80">{primero.zones}</p>}
      {primero.expiry && <p className="mt-1 text-sm text-white/85">{primero.expiry}</p>}
      {primero.advice && <p className="mt-2 text-sm text-white/65">{primero.advice}</p>}
      {resto > 0 && <p className="mt-2 text-sm text-white/85">y {resto} aviso{resto > 1 ? "s" : ""} más</p>}
    </section>
  );
}

AlertBanner.propTypes = {
  weatherData: PropTypes.shape({
    alerts: PropTypes.shape({
      alert: PropTypes.array,
    }),
  }),
};

export default AlertBanner;
