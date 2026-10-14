const icon = (name) => `/weather-icons/${name}.svg`;

const sameIcon = (name) => ({
  day: icon(name),
  night: icon(name),
});

const dayNight = (day, night) => ({
  day: icon(day),
  night: icon(night),
});

const weatherIcons = {
  1000: dayNight("wi_clear-day", "wi_clear-night"),
  1003: dayNight("wi_partly-cloudy-day", "wi_partly-cloudy-night"),
  1006: sameIcon("wi_cloudy"),
  1009: dayNight("wi_overcast-day", "wi_overcast-night"),
  1030: dayNight("wi_fog-day", "wi_fog-night"),
  1063: dayNight("wi_partly-cloudy-day-rain", "wi_partly-cloudy-night-rain"),
  1066: dayNight("wi_partly-cloudy-day-snow", "wi_partly-cloudy-night-snow"),
  1069: dayNight("wi_partly-cloudy-day-sleet", "wi_partly-cloudy-night-sleet"),
  1072: dayNight("wi_partly-cloudy-day-drizzle", "wi_partly-cloudy-night-drizzle"),
  1087: dayNight("wi_thunderstorms-day", "wi_thunderstorms-night"),
  1114: sameIcon("wi_wind-snow"),
  1117: dayNight("wi_extreme-day-snow", "wi_extreme-night-snow"),
  1135: dayNight("wi_fog-day", "wi_fog-night"),
  1147: dayNight("wi_extreme-day-fog", "wi_extreme-night-fog"),
  1150: dayNight("wi_partly-cloudy-day-drizzle", "wi_partly-cloudy-night-drizzle"),
  1153: sameIcon("wi_drizzle"),
  1168: dayNight("wi_extreme-day-drizzle", "wi_extreme-night-drizzle"),
  1171: dayNight("wi_extreme-day-drizzle", "wi_extreme-night-drizzle"),
  1180: dayNight("wi_partly-cloudy-day-rain", "wi_partly-cloudy-night-rain"),
  1183: sameIcon("wi_rain"),
  1186: dayNight("wi_overcast-day-rain", "wi_overcast-night-rain"),
  1189: dayNight("wi_overcast-day-rain", "wi_overcast-night-rain"),
  1192: dayNight("wi_extreme-day-rain", "wi_extreme-night-rain"),
  1195: sameIcon("wi_extreme-rain"),
  1198: dayNight("wi_extreme-day-sleet", "wi_extreme-night-sleet"),
  1201: sameIcon("wi_extreme-sleet"),
  1204: sameIcon("wi_sleet"),
  1207: sameIcon("wi_extreme-sleet"),
  1210: dayNight("wi_partly-cloudy-day-snow", "wi_partly-cloudy-night-snow"),
  1213: sameIcon("wi_snow"),
  1216: dayNight("wi_overcast-day-snow", "wi_overcast-night-snow"),
  1219: sameIcon("wi_overcast-snow"),
  1222: dayNight("wi_extreme-day-snow", "wi_extreme-night-snow"),
  1225: sameIcon("wi_extreme-snow"),
  1237: sameIcon("wi_hail"),
  1240: dayNight("wi_partly-cloudy-day-rain", "wi_partly-cloudy-night-rain"),
  1243: dayNight("wi_extreme-day-rain", "wi_extreme-night-rain"),
  1246: sameIcon("wi_extreme-rain"),
  1249: dayNight("wi_partly-cloudy-day-sleet", "wi_partly-cloudy-night-sleet"),
  1252: dayNight("wi_extreme-day-sleet", "wi_extreme-night-sleet"),
  1255: dayNight("wi_partly-cloudy-day-snow", "wi_partly-cloudy-night-snow"),
  1258: dayNight("wi_extreme-day-snow", "wi_extreme-night-snow"),
  1261: sameIcon("wi_hail"),
  1264: sameIcon("wi_extreme-hail"),
  1273: dayNight("wi_thunderstorms-day-rain", "wi_thunderstorms-night-rain"),
  1276: dayNight("wi_thunderstorms-day-extreme-rain", "wi_thunderstorms-night-extreme-rain"),
  1279: dayNight("wi_thunderstorms-day-snow", "wi_thunderstorms-night-snow"),
  1282: dayNight("wi_thunderstorms-day-extreme-snow", "wi_thunderstorms-night-extreme-snow"),
};

export const getWeatherIcon = (code, isDay) => {
  const weatherIcon = weatherIcons[Number(code)];

  if (!weatherIcon) {
    return icon("wi_not-available");
  }

  return Number(isDay) === 1 ? weatherIcon.day : weatherIcon.night;
};
