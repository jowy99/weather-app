import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

// ── Pure classification ──

const BOLTS = [
  { id: "b1", left: "22%", top: "2%", dur: 11, delay: -3, scale: 1 },
  { id: "b2", left: "68%", top: "0%", dur: 17, delay: -9, scale: 1.3 },
  { id: "b3", left: "45%", top: "4%", dur: 23, delay: -15, scale: 0.8 },
];

const CLEAR_CODES = new Set([1000]);
const PARTLY_CODES = new Set([1003]);
const CLOUDY_CODES = new Set([1006, 1009]);
const FOG_CODES = new Set([1030, 1135, 1147]);
const DRIZZLE_CODES = new Set([1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1198, 1240]);
const RAIN_CODES = new Set([1186, 1189, 1192, 1195, 1201, 1243, 1246]);
const STORM_CODES = new Set([1087, 1273, 1276, 1279, 1282]);
const SNOW_CODES = new Set([1066, 1069, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264]);

function getCondition(code) {
  const c = Number(code);
  if (CLEAR_CODES.has(c)) return "clear";
  if (PARTLY_CODES.has(c)) return "partly";
  if (CLOUDY_CODES.has(c)) return "cloudy";
  if (FOG_CODES.has(c)) return "fog";
  if (DRIZZLE_CODES.has(c)) return "drizzle";
  if (RAIN_CODES.has(c)) return "rain";
  if (STORM_CODES.has(c)) return "storm";
  if (SNOW_CODES.has(c)) return "snow";
  return "clear";
}

// ── Panel tint map (Apple Weather material) ──

const PANEL_TINT = {
  clear:   { day: "rgba(16,58,130,0.69)",  night: "rgba(30,60,120,0.15)" },
  partly:  { day: "rgba(22,62,120,0.81)", night: "rgba(20,40,80,0.18)" },
  cloudy:  { day: "rgba(38,48,62,0.72)", night: "rgba(30,35,45,0.2)" },
  fog:     { day: "rgba(40,50,62,0.71)",  night: "rgba(35,40,50,0.22)" },
  drizzle: { day: "rgba(34,44,58,0.5)", night: "rgba(20,30,50,0.2)" },
  rain:    { day: "rgba(28,36,50,0.3)",   night: "rgba(15,25,40,0.22)" },
  storm:   { day: "rgba(50,60,80,0.25)",    night: "rgba(10,15,30,0.28)" },
  snow:    { day: "rgba(30,45,70,0.74)", night: "rgba(25,35,55,0.18)" },
};

const ACCENT = {
  day:   { clear: "#ffb340", partly: "#ffc966", cloudy: "#a9bfd4", fog: "#c3ccd5", drizzle: "#5ed3c5", rain: "#3fd0d6", storm: "#b49bff", snow: "#a8dcff" },
  night: { clear: "#b9a6ff", partly: "#b9a6ff", cloudy: "#9fb0c9", fog: "#aab4c2", drizzle: "#5ed3c5", rain: "#4fd8d8", storm: "#c9b0ff", snow: "#b0deff" },
};

function panelTintFor(cond, amb) {
  return PANEL_TINT[cond]?.[amb] || PANEL_TINT.clear[amb];
}

// ── Sky gradient map ──

const SKY_COLORS = {
  clear:   { day: ["#1f6fd1", "#3d8fe0", "#6fb1ec"],  night: ["#050a1f", "#0d1a3d", "#1b2d5c"] },
  partly:  { day: ["#2a6db8", "#4f8fcf", "#86b4e0"],  night: ["#0a1128", "#16244a", "#26385f"] },
  cloudy:  { day: ["#5f6f82", "#7d8c9e", "#a2afbd"],  night: ["#15191f", "#222831", "#313844"] },
  fog:     { day: ["#76818c", "#949ea8", "#b8c0c8"],  night: ["#1d2127", "#2b3038", "#3b414a"] },
  drizzle: { day: ["#4d5b6b", "#66768a", "#8796a8"],  night: ["#111620", "#1c2330", "#2a3343"] },
  rain:    { day: ["#3a4555", "#4f5b6c", "#6a7686"],  night: ["#0c1018", "#161c27", "#222a38"] },
  storm:   { day: ["#232a36", "#343c4a", "#4a5262"],  night: ["#07090e", "#10141c", "#1b212c"] },
  snow:    { day: ["#6f87a3", "#9bb0c6", "#cdd8e4"],  night: ["#1a2333", "#2a3548", "#3d4a60"] },
};

function skyFor(cond, amb) {
  const [a, b, c] = SKY_COLORS[cond]?.[amb] || SKY_COLORS.clear[amb];
  return `linear-gradient(180deg, ${a} 0%, ${b} 50%, ${c} 100%)`;
}

// ── Particle counts per condition ──

const COUNTS = {
  clear:   { day: { stars: 60, clouds: 0, rain: 0, snow: 0, wind: 0 }, night: { stars: 60, clouds: 0, rain: 0, snow: 0, wind: 0 } },
  partly:  { day: { stars: 0, clouds: 3, rain: 0, snow: 0, wind: 0 }, night: { stars: 25, clouds: 3, rain: 0, snow: 0, wind: 0 } },
  cloudy:  { day: { stars: 0, clouds: 7, rain: 0, snow: 0, wind: 0 }, night: { stars: 0, clouds: 7, rain: 0, snow: 0, wind: 0 } },
  fog:     { day: { stars: 0, clouds: 5, rain: 0, snow: 0, wind: 0 }, night: { stars: 0, clouds: 5, rain: 0, snow: 0, wind: 0 } },
  drizzle: { day: { stars: 0, clouds: 6, rain: 50, snow: 0, wind: 0 }, night: { stars: 0, clouds: 6, rain: 50, snow: 0, wind: 0 } },
  rain:    { day: { stars: 0, clouds: 6, rain: 120, snow: 0, wind: 0 }, night: { stars: 0, clouds: 6, rain: 120, snow: 0, wind: 0 } },
  storm:   { day: { stars: 0, clouds: 8, rain: 120, snow: 0, wind: 0 }, night: { stars: 0, clouds: 8, rain: 120, snow: 0, wind: 0 } },
  snow:    { day: { stars: 0, clouds: 5, rain: 0, snow: 60, wind: 0 }, night: { stars: 0, clouds: 5, rain: 0, snow: 60, wind: 0 } },
};

// Seeded PRNG for stable particle positions
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function makeHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function WeatherBackground({ weatherData }) {
  const rootRef = useRef(null);
  const isHiddenRef = useRef(document?.hidden);

  // ── Derived values ──

  const condition = useMemo(() => {
    if (!weatherData?.current) return "clear";
    return getCondition(weatherData.current.condition?.code ?? weatherData.current.code);
  }, [weatherData]);

  const ambient = useMemo(() => {
    if (!weatherData?.current) return "day";
    return weatherData.current.is_day === 1 ? "day" : "night";
  }, [weatherData]);

  const windy = useMemo(() => {
    if (!weatherData?.current) return false;
    return (weatherData.current.wind_kph ?? 0) >= 30;
  }, [weatherData]);

  const theme = `${condition}-${ambient}`;

  // ── Sky crossfade via state ──

  const sky = skyFor(condition, ambient);
  const [layers, setLayers] = useState([{ key: theme, bg: sky }]);
  useEffect(() => {
    setLayers((prev) => (prev[prev.length - 1].key === theme ? prev : [prev[prev.length - 1], { key: theme, bg: sky }]));
  }, [theme, sky]);

  // ── Particles (stable per condition+ambient) ──

  const particles = useMemo(() => {
    const c = COUNTS[condition]?.[ambient] || COUNTS.clear[ambient];
    const seed = makeHash(`${condition}-${ambient}`);
    const rand = seededRandom(seed);

    const rain = Array.from({ length: c.rain }, (_, i) => ({
      id: `r-${i}`,
      left: rand() * 100,
      top: -rand() * 20,
      height: ambient === "night" ? (condition === "drizzle" ? 10 + rand() * 6 : 16 + rand() * 10) : (condition === "drizzle" ? 10 + rand() * 6 : 16 + rand() * 10),
      opacity: condition === "drizzle" ? 0.3 + rand() * 0.1 : 0.4 + rand() * 0.2,
      duration: condition === "drizzle" ? 0.9 + rand() * 0.5 : 0.5 + rand() * 0.3,
      delay: -(rand() * 2),
    }));

    const snow = Array.from({ length: c.snow }, (_, i) => {
      const size = 2 + rand() * 4;
      const speed = 6 + (size / 6) * 8;
      return {
        id: `s-${i}`,
        left: rand() * 100,
        top: -rand() * 20,
        size,
        opacity: 0.5 + (size / 6) * 0.4,
        duration: Math.min(speed, 14),
        sway: -3 + rand() * 6,
        delay: -(rand() * 5),
      };
    });

    const stars = Array.from({ length: c.stars }, (_, i) => ({
      id: `st-${i}`,
      top: rand() * 60,
      left: rand() * 100,
      size: 1 + rand() * 1.5,
      duration: 3 + rand() * 3,
      delay: -(rand() * 4),
    }));

    const cloudCount = c.clouds;
    const clouds = Array.from({ length: cloudCount }, (_, i) => {
      const depth = cloudCount <= 3 ? (i % 3) : (i < cloudCount * 0.3 ? 0 : i < cloudCount * 0.65 ? 1 : 2);
      const scale = depth === 0 ? 0.6 : depth === 1 ? 0.9 : 1.2;
      const duration = 40 + (depth * 25) + (i % 3) * 10;
      return { id: `c-${i}`, depth, scale, duration, delay: -(i * duration / Math.max(cloudCount, 1)) };
    });

    const wind = windy
      ? Array.from({ length: 10 }, (_, i) => ({
          id: `w-${i}`,
          top: 5 + (i * 10) + rand() * 5,
          width: 60 + rand() * 100,
          duration: 3 + rand() * 3,
          delay: -(rand() * 3),
        }))
      : [];

    return { rain, snow, stars, clouds, wind };
  }, [condition, ambient, windy]);

  // ── Panel tint CSS variable ──

  useEffect(() => {
    const tint = panelTintFor(condition, ambient);
    document.documentElement.style.setProperty("--panel-tint", tint);
    document.documentElement.style.setProperty("--accent", ACCENT[ambient][condition] ?? ACCENT.day.clear);
  }, [condition, ambient]);

  // ── Page visibility → pause ──

  useEffect(() => {
    const handleVis = () => {
      isHiddenRef.current = document.hidden;
      if (rootRef.current) {
        rootRef.current.classList.toggle("paused", document.hidden);
      }
    };
    document.addEventListener("visibilitychange", handleVis);
    handleVis();
    return () => document.removeEventListener("visibilitychange", handleVis);
  }, []);

  // ── Cloud color helpers ──

  const cloudColor = (cond, amb, idx) => {
    const isDay = amb === "day";
    switch (cond) {
      case "partly":
        return isDay ? `rgba(236,240,246,0.55)` : `rgba(120,135,160,0.35)`;
      case "cloudy":
        return isDay
          ? (idx % 2 === 0 ? `rgba(196,204,214,0.55)` : `rgba(170,180,192,0.5)`)
          : `rgba(70,78,92,0.55)`;
      case "fog":
        return isDay ? `rgba(210,216,224,0.55)` : `rgba(80,90,105,0.45)`;
      case "drizzle":
      case "rain":
        return isDay ? `rgba(120,130,145,0.75)` : `rgba(45,52,64,0.7)`;
      case "storm":
        return isDay ? `rgba(40,46,58,0.85)` : `rgba(20,24,32,0.9)`;
      case "snow":
        return isDay ? `rgba(220,228,238,0.5)` : `rgba(90,100,118,0.5)`;
      default:
        return isDay ? `rgba(255,255,255,0.85)` : `rgba(120,135,160,0.35)`;
    }
  };

  // ── Windy speed multiplier ──
  const windSpeed = windy ? 0.5 : 1;

  // ── Render ──

  return (
    <div ref={rootRef} className="app-background" aria-hidden="true">
      {/* Sky crossfade */}
      {layers.map((l, i) => (
        <div
          key={l.key}
          className={`weather-sky${i === layers.length - 1 && layers.length > 1 ? " weather-sky-enter" : ""}`}
          style={{ background: l.bg }}
          onAnimationEnd={() => setLayers((prev) => prev.slice(-1))}
        />
      ))}

      {/* Sun glow (clear/partly, day) */}
      {(condition === "clear" || condition === "partly") && ambient === "day" && (
        <div className="weather-sun" />
      )}

      {/* Moon + stars (clear/partly, night) */}
      {(condition === "clear" || condition === "partly") && ambient === "night" && (
        <>
          <div className="weather-moon" />
          {particles.stars.map((s) => (
            <div
              key={s.id}
              className="weather-star"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Clouds */}
      {particles.clouds.map((cl, i) => (
        <Cloud
          key={cl.id}
          index={i}
          condition={condition}
          ambient={ambient}
          depth={cl.depth}
          scale={cl.scale}
          duration={cl.duration * windSpeed}
          delay={cl.delay}
          colorFn={cloudColor}
          isFog={condition === "fog"}
        />
      ))}

      {/* Fog bands */}
      {condition === "fog" && (
        <>
          <div
            className="weather-cloud"
            style={{
              bottom: "10%",
              left: "-10%",
              width: "120%",
              height: "8%",
              animationDuration: `${60 * windSpeed}s`,
              animationDelay: "-10s",
            }}
          >
            <div
              className="puff"
              style={{
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25) 35%, transparent)",
              }}
            />
          </div>
          <div
            className="weather-cloud"
            style={{
              bottom: "20%",
              left: "-15%",
              width: "130%",
              height: "6%",
              animationDuration: `${75 * windSpeed}s`,
              animationDelay: "-30s",
            }}
          >
            <div
              className="puff"
              style={{
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 35%, transparent)",
              }}
            />
          </div>
        </>
      )}

      {/* Legibility scrim */}
      {(ambient === "day" && (condition === "partly" || condition === "cloudy" || condition === "fog" || condition === "snow")) && (
        <div className="weather-scrim" />
      )}

      {/* Rain */}
      {particles.rain.length > 0 && (
        <div className={`weather-rain-container${windy ? " windy" : ""}`}>
          {particles.rain.map((r) => (
            <div
              key={r.id}
              className="weather-rain"
              style={{
                left: `${r.left}%`,
                top: `${r.top}%`,
                height: `${r.height}px`,
                opacity: r.opacity,
                animationDuration: `${r.duration}s`,
                animationDelay: `${r.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Snow */}
      {particles.snow.length > 0 && (
        <>
          {particles.snow.map((s) => (
            <div
              key={s.id}
              className="weather-snow"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                opacity: s.opacity,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
                animationName: "snow-fall",
                "--sway": `${s.sway}vw`,
              }}
            />
          ))}
        </>
      )}

      {/* Lightning (storm) */}
      {condition === "storm" && BOLTS.map((b) => (
        <div key={b.id} className="weather-strike" style={{ animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}>
          <div className="weather-strike-flash" />
          <svg className="weather-bolt" viewBox="0 0 64 170" style={{ left: b.left, top: b.top, transform: `scale(${b.scale})` }}>
            <path d="M38 0 L12 78 L30 78 L16 170 L52 66 L33 66 L50 0 Z" />
          </svg>
        </div>
      ))}

      {/* Wind streaks */}
      {windy && particles.wind.length > 0 && (
        <div className="weather-wind-container">
          {particles.wind.map((w) => (
            <div
              key={w.id}
              className="weather-wind"
              style={{
                top: `${w.top}%`,
                width: `${w.width}px`,
                animationDuration: `${w.duration * windSpeed}s`,
                animationDelay: `${w.delay}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sub-components ──

function Cloud({ index, condition, ambient, depth, scale, duration, delay, colorFn, isFog }) {
  const color = colorFn(condition, ambient, depth);

  // Distribute clouds across the viewport
  const left = `${((index * 29) % 85) - 5}%`;

  // Vertical spread by condition
  const rainLike = ["drizzle", "rain", "storm"];
  const base = rainLike.includes(condition) ? 5 : 3;
  const range = rainLike.includes(condition) ? 18 : 38;
  const top = `${base + (index * 13) % range}%`;

  // Depth → opacity / z-index
  const opacity = depth === 0 ? 0.6 : depth === 1 ? 0.8 : 1;
  const zIndex = depth === 0 ? 1 : depth === 1 ? 2 : 3;

  if (isFog) {
    return (
      <div
        className="weather-cloud"
        style={{
          top,
          left,
          width: `${100 + depth * 20}%`,
          height: `${6 + depth * 3}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      >
        <div
          className="puff"
          style={{
            inset: 0,
            background: `radial-gradient(ellipse, ${color} 0%, transparent 70%)`,
          }}
        />
      </div>
    );
  }

  // Standard cloud: pixel-based circular puffs with flat base
  const puffs = [
    { left: 20, top: 70, size: 150 },
    { left: 110, top: 20, size: 200 },
    { left: 240, top: 55, size: 160 },
    { left: 310, top: 90, size: 110 },
  ];

  return (
    <div
      className="weather-cloud"
      style={{
        top,
        left,
        opacity,
        zIndex,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="cloud-body"
        style={{ scale: String(scale), transformOrigin: "top left" }}
      >
        {puffs.map((p, i) => (
          <div key={i} className="puff" style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: color }} />
        ))}
        <div className="puff" style={{ left: 40, top: 130, width: 360, height: 70, borderRadius: 35, background: color }} />
      </div>
    </div>
  );
}

// ── PropTypes ──

WeatherBackground.propTypes = {
  weatherData: PropTypes.shape({
    current: PropTypes.shape({
      condition: PropTypes.shape({
        code: PropTypes.number,
      }),
      code: PropTypes.number,
      is_day: PropTypes.number,
      wind_kph: PropTypes.number,
    }),
  }),
};

Cloud.propTypes = {
  index: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
  ambient: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
  colorFn: PropTypes.func.isRequired,
  isFog: PropTypes.bool.isRequired,
};
