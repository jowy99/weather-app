import { useState } from "react";
import PropTypes from "prop-types";
import { getWeatherIcon } from "../../utils/weatherIcons.js";
import { translateCondition } from "../../utils/translations.js";
import { to24h, tempColor } from "../../utils/format.js";

const COL = 56; // ancho de cada hora
const H = 96; // alto de la zona de la curva
const PAD_TOP = 26; // hueco para las etiquetas sobre los puntos
const PAD_BOTTOM = 12;

const hh = (h) => h.time.split(" ")[1].slice(0, 2);
const fmt = (n) => Number(n).toLocaleString("es-ES", { maximumFractionDigits: 1 });

// Iconos de trazo fino (24×24) para el selector
const ICONS = {
  cond: <path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0z" />,
  rain: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />,
  wind: <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />,
};
const METRICS = [
  { id: "cond", label: "Condiciones" },
  { id: "rain", label: "Precipitación" },
  { id: "wind", label: "Viento" },
];

function smoothPath(pts) {
  return pts
    .map((p, i) => {
      if (i === 0) return `M${p[0]} ${p[1]}`;
      const p0 = pts[i - 2] ?? pts[i - 1];
      const p1 = pts[i - 1];
      const p3 = pts[i + 1] ?? p;
      const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6];
      const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
      return `C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p[0]} ${p[1]}`;
    })
    .join(" ");
}

function Today({ weatherData = null }) {
  const [metric, setMetric] = useState("cond");
  if (!weatherData) return null;

  const days = weatherData.forecast.forecastday;
  const now = weatherData.location.localtime_epoch;
  const hours = days.slice(0, 2).flatMap((d) => d.hour).filter((h) => h.time_epoch >= now - 3600).slice(0, 24);
  if (hours.length === 0) return null;

  // Frase según el dato elegido
  const rainy = hours.slice(0, 12).find((h) => h.chance_of_rain >= 50);
  const maxChance = Math.max(...hours.map((h) => h.chance_of_rain));
  const maxWind = Math.round(Math.max(...hours.map((h) => h.wind_kph)));
  const maxGust = Math.round(Math.max(...hours.map((h) => h.gust_kph)));
  const summary = {
    cond: rainy ? `Lluvia probable hacia las ${hh(rainy)}:00.` : `${translateCondition(days[0].day.condition.text)} todo el día.`,
    rain: rainy
      ? `Lluvia probable hacia las ${hh(rainy)}:00. ${fmt(days[0].day.totalprecip_mm)} mm previstos hoy.`
      : maxChance > 0
        ? `Probabilidad baja de lluvia (máx. ${maxChance}%).`
        : "Sin lluvia prevista en las próximas 24 horas.",
    wind: `Viento de hasta ${maxWind} km/h, con rachas de ${maxGust} km/h.`,
  }[metric];

  // Escala de la curva (mínimo 4 °C o 10 km/h de rango para que no exagere)
  const values = hours.map((h) => (metric === "wind" ? h.wind_kph : h.temp_c));
  const vMin = Math.min(...values);
  const vMax = Math.max(...values);
  const range = Math.max(vMax - vMin, metric === "wind" ? 10 : 4);
  const mid = (vMax + vMin) / 2;
  const y = (v) => PAD_TOP + (H - PAD_TOP - PAD_BOTTOM) * (1 - (v - (mid - range / 2)) / range);
  const pts = hours.map((h, i) => [i * COL + COL / 2, y(values[i])]);
  const line = smoothPath(pts);
  const width = hours.length * COL;

  // Amanecer / atardecer dentro de las 24 horas
  const start = hours[0].time_epoch;
  const events = days
    .slice(0, 2)
    .flatMap((d) =>
      [["sunrise", d.astro.sunrise], ["sunset", d.astro.sunset]].map(([kind, s]) => {
        const t = to24h(s);
        const base = d.hour.find((h) => Number(hh(h)) === t.h);
        return base ? { kind, label: t.label, epoch: base.time_epoch + t.m * 60 } : null;
      }),
    )
    .filter((e) => e && e.epoch >= start && e.epoch <= hours[hours.length - 1].time_epoch);

  return (
    <section aria-labelledby="hourly-title" className="glass-card w-full rounded-3xl p-3 sm:p-4">
      <h2 id="hourly-title" className="sr-only">Previsión por horas</h2>

      {/* Frase + selector */}
      <div className="flex items-center justify-between gap-3 border-b border-white/15 px-1 pb-3">
        <p className="min-w-0 text-[15px] leading-snug text-white" aria-live="polite">{summary}</p>
        <div role="radiogroup" aria-label="Dato a mostrar" className="flex shrink-0 gap-1 rounded-full bg-black/20 p-1">
          {METRICS.map((m) => {
            const active = metric === m.id;
            return (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={m.label}
                title={m.label}
                onClick={() => setMetric(m.id)}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                  active ? "bg-white text-slate-900 shadow-sm" : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICONS[m.id]}
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="sr-only">
        {hours.map((h, i) => (
          <li key={h.time_epoch}>
            {i === 0 ? "Ahora" : `${hh(h)}:00`}: {Math.round(h.temp_c)} grados, {translateCondition(h.condition.text)}, {h.chance_of_rain} % de lluvia, viento {Math.round(h.wind_kph)} km/h
          </li>
        ))}
      </ul>

      {/* Tira de horas */}
      <div className="weather-scroll -mx-1 mt-3 overflow-x-auto px-1 pb-1" tabIndex={0} role="region" aria-label="Gráfica por horas, desplazable">
        <div className="relative py-2" style={{ width }} aria-hidden="true">
          {/* Resaltado de "Ahora": cubre la columna entera, de la hora al porcentaje */}
          <div className="absolute inset-y-0 left-0 rounded-2xl bg-white/10" style={{ width: COL }} />

          <div className="relative flex">
            {hours.map((h, i) => (
              <div key={h.time_epoch} className="flex flex-col items-center gap-1.5" style={{ width: COL }}>
                <span className="text-[13px] font-semibold text-white">{i === 0 ? "Ahora" : hh(h)}</span>
                {metric === "wind" ? (
                  <svg viewBox="-12 -12 24 24" width="34" height="34">
                    <path d="M0 -8 L5.5 5 L0 2 L-5.5 5 Z" fill="white" transform={`rotate(${(h.wind_degree + 180) % 360})`} />
                  </svg>
                ) : (
                  <img src={getWeatherIcon(h.condition.code, h.is_day)} alt="" width="34" height="34" className="h-[34px] w-[34px]" />
                )}
              </div>
            ))}
          </div>

          <svg width={width} height={H} className="relative block overflow-visible">
            <defs>
              <linearGradient id="hourly-stroke" x1="0" y1={PAD_TOP} x2="0" y2={H - PAD_BOTTOM} gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor={metric === "wind" ? "#a5d8ff" : tempColor(vMax)} />
                <stop offset="1" stopColor={metric === "wind" ? "#7cc4ff" : tempColor(vMin)} />
              </linearGradient>
              <linearGradient id="hourly-fill" x1="0" y1="0" x2="0" y2={H} gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" stopOpacity="0.16" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            {events.map((e) => {
              const x = ((e.epoch - start) / 3600) * COL + COL / 2;
              return (
                <g key={e.kind + e.epoch}>
                  <line x1={x} y1="4" x2={x} y2={H} stroke="rgba(255,255,255,0.4)" strokeDasharray="3 4" />
                  <text x={x + 4} y="12" fontSize="10" fill="rgba(255,255,255,0.85)">{e.kind === "sunrise" ? "↑" : "↓"} {e.label}</text>
                </g>
              );
            })}

            {metric === "rain" ? (
              hours.map((h, i) => {
                const bh = (h.chance_of_rain / 100) * (H - PAD_TOP);
                const cx = i * COL + COL / 2;
                return (
                  <g key={h.time_epoch}>
                    {h.chance_of_rain > 0 && <rect x={cx - 7} y={H - bh} width="14" height={bh} rx="4" fill="rgba(125,211,252,0.9)" />}
                    <text x={cx} y={H - bh - 6} textAnchor="middle" fontSize="12" fontWeight="600" fill="white">{h.chance_of_rain}%</text>
                  </g>
                );
              })
            ) : (
              <>
                <path d={`${line} L${pts[pts.length - 1][0]} ${H} L${pts[0][0]} ${H} Z`} fill="url(#hourly-fill)" />
                <path d={line} fill="none" stroke="url(#hourly-stroke)" strokeWidth="3" strokeLinecap="round" />
                {pts.map(([px, py], i) => (
                  <g key={i}>
                    <circle cx={px} cy={py} r="3.5" fill="white" />
                    <text x={px} y={py - 10} textAnchor="middle" fontSize="13" fontWeight="600" fill="white">
                      {metric === "wind" ? Math.round(values[i]) : `${Math.round(values[i])}°`}
                    </text>
                  </g>
                ))}
              </>
            )}
          </svg>

          <div className="relative mt-1 flex">
            {hours.map((h) => (
              <span key={h.time_epoch} className="h-4 text-center text-[11px] font-semibold leading-4 text-sky-100" style={{ width: COL }}>
                {metric === "wind" ? Math.round(h.gust_kph) : metric === "cond" && h.chance_of_rain >= 20 ? `${h.chance_of_rain}%` : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
      {metric === "wind" && <p className="mt-1 px-1 text-[11px] text-white/85">Fila inferior: rachas (km/h)</p>}
    </section>
  );
}

Today.propTypes = {
  weatherData: PropTypes.object,
};

export default Today;
