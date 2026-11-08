/**
 * Traduce y formatea alertas meteorológicas de WeatherAPI / Meteoalarm al español.
 */

// Umbral de gravedad → color en español
const SEVERITY_LABEL = {
  Minor: "amarillo",
  Moderate: "amarillo",
  Severe: "naranja",
  Extreme: "rojo",
};

const SEVERITY_ORDER = { Extreme: 0, Severe: 1, Moderate: 2, Minor: 3 };

// Palabras clave para detectar el fenómeno
function detectPhenomenon(event) {
  const e = (event || "").toLowerCase();
  if (/rain|thunderstorm/i.test(e)) return "lluvia";
  if (/snow|ice/i.test(e)) return "nieve";
  if (/wind|gale|storm surge/i.test(e)) return "viento";
  if (/thunder/i.test(e)) return "tormenta";
  if (/heat|extreme temperature/i.test(e)) return "calor";
  if (/cold|frost|freezing/i.test(e)) return "frío";
  if (/fog|visibility/i.test(e)) return "niebla";
  if (/flood|flash flood/i.test(e)) return "inundación";
  if (/lightning/i.test(e)) return "relámpago";
  if (/tornado|tsunami|volcan/i.test(e)) return event || "evento";
  return event || "evento";
}

// Formatear fecha/hora en español
function formatExpiry(expiry) {
  if (!expiry) return "";
  const d = new Date(expiry);
  const hoy = new Date();
  const manana = new Date(hoy);
  manana.setDate(hoy.getDate() + 1);

  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const dia = d.getDate();

  const sameDay = hoy.getFullYear() === d.getFullYear() && hoy.getMonth() === d.getMonth() && hoy.getDate() === d.getDate();
  const nextDay = manana.getFullYear() === d.getFullYear() && manana.getMonth() === d.getMonth() && manana.getDate() === d.getDate();

  if (sameDay) return `Hasta hoy, ${h}:${m}`;
  if (nextDay) return `Hasta mañana, ${h}:${m}`;
  return `Hasta el ${dias[d.getDay()]} ${dia}, ${h}:${m}`;
}

// Consejos según gravedad (tú)
function advice(severity) {
  switch (severity) {
    case "Extreme":
      return "Sigue las instrucciones de las autoridades. Busca refugio inmediato.";
    case "Severe":
      return "Sigue las instrucciones de las autoridades. Ten precaución.";
    case "Moderate":
      return "Ten precaución y mantente informado.";
    case "Minor":
      return "Monitorea la situación y ten precaución.";
    default:
      return "";
  }
}

/**
 * Traduce un array de alertas de WeatherAPI a objetos en español.
 * @param {Array} alerts - Array de alertas raw de weatherData.alerts.alert
 * @returns {Array} Array de objetos traducidos y ordenados por severidad.
 */
export function translateAlerts(alerts) {
  if (!alerts || !Array.isArray(alerts) || alerts.length === 0) return [];

  // Agrupar por evento + áreas
  const groups = {};
  for (const a of alerts) {
    const phenon = detectPhenomenon(a.event);
    const areas = a.areas || a.area || "";
    const key = `${phenon}|||${areas}`;
    if (!groups[key]) {
      groups[key] = { event: a.event, phenomena: new Set(), areas: [], severity: a.severity, expiry: a.expiry };
    }
    groups[key].phenomena.add(phenon);
    if (!groups[key].areas.includes(areas)) groups[key].areas.push(areas);
    // Mantener la severidad más alta
    if ((SEVERITY_ORDER[a.severity] ?? 99) < (SEVERITY_ORDER[groups[key].severity] ?? 99)) {
      groups[key].severity = a.severity;
    }
    // Usar el expiry más lejano
    if (a.expiry && (!groups[key].expiry || new Date(a.expiry) > new Date(groups[key].expiry))) {
      groups[key].expiry = a.expiry;
    }
  }

  const translated = Object.values(groups).map((g) => {
    const label = SEVERITY_LABEL[g.severity] || "amarillo";
    const phenos = Array.from(g.phenomena);
    const title = `Aviso ${label} por ${phenos.join(" y ")}`;
    return {
      title,
      level: label,
      zones: g.areas.join(", "),
      expiry: formatExpiry(g.expiry),
      advice: advice(g.severity),
      severityOrder: SEVERITY_ORDER[g.severity] ?? 99,
    };
  });

  // Ordenar: más severo primero
  translated.sort((a, b) => a.severityOrder - b.severityOrder);
  return translated;
}
