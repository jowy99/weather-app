import PropTypes from "prop-types";
import Tile from "../UI/cards/tile.jsx";
import { to24h } from "../../utils/format.js";

const I = (n) => `/weather-icons/fill/wi_${n}.svg`;
const pt = (n, r, c = 60) => { const a = ((n - 90) * Math.PI) / 180; return [c + r * Math.cos(a), c + r * Math.sin(a)]; };
const arc = (from, to, r) => { const [x1, y1] = pt(from, r); const [x2, y2] = pt(to, r); return `M${x1} ${y1} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`; };
const minutesOf = (localtime) => { const [h, m] = localtime.split(" ")[1].split(":").map(Number); return h * 60 + m; };

export function WindTile({ weatherData }) {
  const cur = weatherData.current;
  const dir = cur.wind_dir.replace(/W/g, "O");
  const rows = [["Viento", `${Math.round(cur.wind_kph)} km/h`], ["Rachas", `${Math.round(cur.gust_kph)} km/h`], ["Dirección", `${cur.wind_degree}° ${dir}`]];
  return (
    <Tile icon={I("wind")} title="Viento" className="col-span-2">
      <div className="flex flex-1 items-center gap-4">
        <dl className="flex-1 divide-y divide-white/15">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between py-2 text-white"><dt>{k}</dt><dd className="text-white/85">{v}</dd></div>
          ))}
        </dl>
        <svg viewBox="0 0 120 120" className="h-28 w-28 shrink-0" aria-hidden="true">
          {Array.from({ length: 36 }, (_, i) => { const [x1, y1] = pt(i * 10, i % 9 === 0 ? 44 : 48); const [x2, y2] = pt(i * 10, 54); return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.5)" strokeWidth={i % 9 === 0 ? 2 : 1} />; })}
          {[["N", 0], ["E", 90], ["S", 180], ["O", 270]].map(([l, d]) => { const [x, y] = pt(d, 36); return <text key={l} x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="white">{l}</text>; })}
          <g transform={`rotate(${(cur.wind_degree + 180) % 360} 60 60)`}>
            <line x1="60" y1="98" x2="60" y2="28" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 18 L67 32 L53 32 Z" fill="white" />
            <circle cx="60" cy="98" r="4" fill="white" />
          </g>
          <circle cx="60" cy="60" r="17" fill="rgba(0,0,0,0.4)" />
          <text x="60" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">{Math.round(cur.wind_kph)}</text>
          <text x="60" y="71" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)">km/h</text>
        </svg>
      </div>
    </Tile>
  );
}

export function PressureTile({ weatherData }) {
  const p = weatherData.current.pressure_mb;
  const hours = weatherData.forecast.forecastday.flatMap((d) => d.hour);
  const later = hours.find((h) => h.time_epoch >= weatherData.location.localtime_epoch + 3 * 3600)?.pressure_mb ?? p;
  const trend = later - p > 1 ? "Subiendo" : later - p < -1 ? "Bajando" : "Estable";
  const ang = -135 + 270 * Math.min(Math.max((p - 960) / 100, 0), 1);
  const [x1, y1] = pt(ang, 40); const [x2, y2] = pt(ang, 56);
  return (
    <Tile icon={I("barometer")} title="Presión" footer={`${trend} en las próximas horas.`}>
      <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28" role="img" aria-label={`${p} hectopascales, ${trend.toLowerCase()}`}>
        <path d={arc(-135, 135, 48)} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="8" strokeLinecap="round" />
        <path d={arc(-135, ang, 48)} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="8" strokeLinecap="round" />
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="4" strokeLinecap="round" />
        <text x="60" y="62" textAnchor="middle" fontSize="20" fontWeight="600" fill="white">{Math.round(p)}</text>
        <text x="60" y="78" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.8)">hPa</text>
      </svg>
    </Tile>
  );
}

export function SunTile({ weatherData }) {
  const [d0, d1] = weatherData.forecast.forecastday;
  const now = minutesOf(weatherData.location.localtime);
  const sr = to24h(d0.astro.sunrise); const ss = to24h(d0.astro.sunset);
  const srM = sr.h * 60 + sr.m; const ssM = ss.h * 60 + ss.m;
  const isDay = now >= srM && now < ssM;
  const big = isDay ? ["Atardecer", ss.label] : ["Amanecer", now >= ssM && d1 ? to24h(d1.astro.sunrise).label : sr.label];
  const small = isDay ? `Amanecer: ${sr.label}` : `Atardecer: ${ss.label}`;
  const curve = Array.from({ length: 81 }, (_, i) => { const x = i * 2; return `${i ? "L" : "M"}${x} ${45 - 30 * Math.sin((Math.PI * (x - 40)) / 80)}`; }).join(" ");
  const sx = Math.min(Math.max(40 + (80 * (now - srM)) / (ssM - srM), 0), 160);
  const sy = 45 - 30 * Math.sin((Math.PI * (sx - 40)) / 80);
  return (
    <Tile icon={I(isDay ? "sunset" : "sunrise")} title={big[0]} footer={small}>
      <p className="text-2xl font-sans font-normal text-white">{big[1]}</p>
      <svg viewBox="0 0 160 80" className="mt-auto w-full" aria-hidden="true">
        <path d={curve} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
        <line x1="0" y1="45" x2="160" y2="45" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <circle cx={sx} cy={sy} r="5" fill={isDay ? "white" : "rgba(255,255,255,0.5)"} style={isDay ? { filter: "drop-shadow(0 0 4px white)" } : undefined} />
      </svg>
    </Tile>
  );
}

const PHASES = {
  "New Moon": ["Luna nueva", "moon-new"], "Waxing Crescent": ["Creciente", "moon-waxing-crescent"],
  "First Quarter": ["Cuarto creciente", "moon-first-quarter"], "Waxing Gibbous": ["Gibosa creciente", "moon-waxing-gibbous"],
  "Full Moon": ["Luna llena", "moon-full"], "Waning Gibbous": ["Gibosa menguante", "moon-waning-gibbous"],
  "Last Quarter": ["Cuarto menguante", "moon-last-quarter"], "Waning Crescent": ["Menguante", "moon-waning-crescent"],
};

export function MoonTile({ weatherData }) {
  const a = weatherData.forecast.forecastday[0].astro;
  const [name, icon] = PHASES[a.moon_phase] ?? [a.moon_phase, "moon-full"];
  const t = (s) => (s && s.includes(":") ? to24h(s).label : "—");
  const rows = [["Iluminación", `${a.moon_illumination}%`], ["Salida", t(a.moonrise)], ["Puesta", t(a.moonset)]];
  return (
    <Tile icon={I("moonrise")} title="Luna">
      <div className="flex items-center gap-2">
        <img src={I(icon)} alt="" aria-hidden="true" width="48" height="48" className="h-12 w-12" />
        <p className="text-lg font-semibold text-white">{name}</p>
      </div>
      <dl className="mt-1 divide-y divide-white/15 text-sm">
        {rows.map(([k, v]) => (<div key={k} className="flex justify-between py-1 text-white"><dt>{k}</dt><dd className="text-white/85">{v}</dd></div>))}
      </dl>
    </Tile>
  );
}

const shape = { weatherData: PropTypes.object.isRequired };
WindTile.propTypes = shape; PressureTile.propTypes = shape; SunTile.propTypes = shape; MoonTile.propTypes = shape;
