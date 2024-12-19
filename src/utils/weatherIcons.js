const weatherIcons = {
  1000: { day: "/weather-icons/wi_clear-day.svg", night: "/weather-icons/wi_clear-night.svg" },
  1003: { day: "/weather-icons/wi_partly-cloudy-day.svg", night: "/weather-icons/wi_partly-cloudy-night.svg" },
  1006: { day: "/weather-icons/wi_cloudy.svg", night: "/weather-icons/wi_cloudy.svg" },
  1009: { day: "/weather-icons/wi_overcast.svg", night: "/weather-icons/wi_overcast-night.svg" },
  1030: { day: "/weather-icons/wi_fog-day.svg", night: "/weather-icons/wi_fog-night.svg" },
  1063: { day: "/weather-icons/wi_rain.svg", night: "/weather-icons/wi_rain.svg" },
  1066: { day: "/weather-icons/wi_patchy-snow-day.svg", night: "/weather-icons/wi_patchy-snow-night.svg" },
  1069: { day: "/weather-icons/wi_patchy-sleet-day.svg", night: "/weather-icons/wi_patchy-sleet-night.svg" },
  1087: { day: "/weather-icons/wi_thunderstorm-day.svg", night: "/weather-icons/wi_thunderstorm-night.svg" },
  1114: { day: "/weather-icons/wi_blowing-snow-day.svg", night: "/weather-icons/wi_blowing-snow-night.svg" },
  // Agrega más íconos según los códigos de la API
};

export const getWeatherIcon = (code, isDay) => {
  if (!weatherIcons[code]) return "/weather-icons/default.svg"; // Fallback
  return isDay ? weatherIcons[code].day : weatherIcons[code].night;
};
