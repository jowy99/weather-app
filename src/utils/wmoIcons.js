// Código WMO (Open-Meteo) → icono relleno de Meteocons
const MAP = [
  [[0], "clear-day"], [[1, 2], "partly-cloudy-day"], [[3], "overcast-day"], [[45, 48], "fog-day"],
  [[51, 53, 55, 56, 57], "drizzle"], [[61, 63, 66, 80, 81], "rain"], [[65, 67, 82], "extreme-rain"],
  [[71, 73, 75, 77, 85, 86], "snow"], [[95], "thunderstorms-day-rain"], [[96, 99], "thunderstorms-day-extreme-rain"],
];

export function getWmoIcon(code) {
  const hit = MAP.find(([codes]) => codes.includes(Number(code)));
  return `/weather-icons/fill/wi_${hit ? hit[1] : "not-available"}.svg`;
}
