import useWeatherData from '../hooks/useWeatherData.js';
import { getWeatherIcon } from '../utils/weatherIcons.js';

function Today() {
  const { weatherData, error } = useWeatherData();

  if (error) {
    return <p>Error fetching weather data.</p>;
  }

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  // Obtén la hora actual
  const currentHour = new Date().getHours();

  // Filtra las horas a partir de la hora actual
  const filteredHours = weatherData.forecast.forecastday[0].hour.filter(
    (hour) => {
      const forecastHour = parseInt(hour.time.split(' ')[1].split(':')[0], 10);
      return forecastHour >= currentHour;
    }
  );

  return (
    <div className="flex overflow-x-auto w-full max-w-5xl px-4 py-8 rounded-xl">
      <div className="flex space-x-4">
        {filteredHours.map((hour, index) => {
          const forecastHour = parseInt(hour.time.split(' ')[1].split(':')[0], 10);
          const displayTime = forecastHour === currentHour ? 'Ahora' : hour.time.split(' ')[1];

          return (
            <div
              key={index}
              className="flex flex-col p-4 w-28 items-center justify-between border border-gray-300 rounded-3xl bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                {displayTime}
              </h3>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center bg-white dark:bg-slate-500 rounded-full p-3 shadow-lg transition-all duration-300">
                  <img
                    className="w-8 h-8 drop-shadow-lg md:w-10 md:h-10 lg:w-12 lg:h-12 dark:opacity-90"
                    src={getWeatherIcon(hour.condition.code, hour.is_day)}
                    alt={hour.condition.text}
                  />
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {Math.round(hour.temp_c)}&deg;C
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Today;