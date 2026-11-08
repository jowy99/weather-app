import PropTypes from "prop-types";
import Tile from "../UI/cards/tile.jsx";
import ScaleBar from "../UI/cards/scaleBar.jsx";
import { WindTile, PressureTile, SunTile, MoonTile } from "./tilesExtra.jsx";

const I = (n) => `/weather-icons/fill/wi_${n}.svg`;
const AQI = ["Buena", "Moderada", "Dañina para grupos sensibles", "Dañina", "Muy dañina", "Peligrosa"];
const uvLabel = (u) => (u <= 2 ? "Bajo" : u <= 5 ? "Moderado" : u <= 7 ? "Alto" : u <= 10 ? "Muy alto" : "Extremo");
const visText = (v) => (v >= 10 ? "Visibilidad perfecta." : v >= 5 ? "Buena visibilidad." : v >= 2 ? "Visibilidad reducida." : "Visibilidad muy baja; posible niebla.");
const feelsText = (f, t) => (Math.abs(f - t) < 2 ? "Similar a la temperatura real." : f < t ? "El viento hace que parezca más frío." : "La humedad hace que parezca más cálido.");
const fmt = (n) => Number(n).toLocaleString("es-ES", { maximumFractionDigits: 1 });

function Group({ title, children }) {
  return (
    <section aria-label={title}>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">{title}</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{children}</div>
    </section>
  );
}
Group.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

function Extras({ weatherData = null }) {
  if (!weatherData) return null;

  const cur = weatherData.current;
  const today = weatherData.forecast.forecastday[0].day;
  const aq = cur.air_quality;
  const epa = aq?.["us-epa-index"];
  const tomorrow = weatherData.forecast.forecastday[1]?.day.totalprecip_mm ?? 0;

  return (
    <div id="tiles" className="flex w-full flex-col gap-5">
      <Group title="Ahora mismo">
        <Tile icon={I("thermometer")} title="Sensación térmica" className="col-span-2 md:row-span-2" footer={feelsText(cur.feelslike_c, cur.temp_c)}>
          <p className="font-sans text-6xl leading-none font-normal text-white">{Math.round(cur.feelslike_c)}°</p>
        </Tile>
        <Tile icon={I("humidity")} title="Humedad" footer={`Punto de rocío: ${Math.round(cur.dewpoint_c)}°.`}>
          <p className="font-sans text-3xl font-normal text-white">{cur.humidity}%</p>
        </Tile>
        <Tile icon={I("raindrops")} title="Precipitación" footer={`${fmt(today.totalprecip_mm)} mm hoy.${tomorrow > 0 ? ` Mañana, ${fmt(tomorrow)} mm.` : ""}`}>
          <p className="font-sans text-3xl font-normal text-white">{fmt(cur.precip_mm)} mm</p>
        </Tile>
        <Tile icon={I("uv-index")} title="Índice UV" footer={`${uvLabel(cur.uv)} · máx. hoy ${Math.round(today.uv)}`}>
          <p className="font-sans text-3xl font-normal text-white">{Math.round(cur.uv)}</p>
          <ScaleBar gradient="linear-gradient(90deg,#34c759,#ffd60a,#ff9f0a,#ff3b30,#af52de)" position={cur.uv / 11} />
        </Tile>
        <Tile icon={I("horizon")} title="Visibilidad" footer={visText(cur.vis_km)}>
          <p className="font-sans text-3xl font-normal text-white">{cur.vis_km} km</p>
        </Tile>
      </Group>
      <Group title="Viento y presión">
        <WindTile weatherData={weatherData} />
        <PressureTile weatherData={weatherData} />
        {epa && (
          <Tile icon={I("dust-wind")} title="Calidad del aire" footer={`PM2,5 ${fmt(aq.pm2_5)} · PM10 ${fmt(aq.pm10)} µg/m³`}>
            <p className="text-xl font-semibold text-white">{AQI[epa - 1]}</p>
            <ScaleBar gradient="linear-gradient(90deg,#34c759,#ffd60a,#ff9f0a,#ff3b30,#af52de,#7e1f2e)" position={(epa - 1) / 5} />
          </Tile>
        )}
      </Group>
      <Group title="Sol y luna">
        <div className="col-span-2"><SunTile weatherData={weatherData} /></div>
        <div className="col-span-2"><MoonTile weatherData={weatherData} /></div>
      </Group>
    </div>
  );
}

Extras.propTypes = {
  weatherData: PropTypes.object,
};

export default Extras;
