import { useState } from "react";
import Now from "../components/rightnow.jsx";
import Today from "../components/today.jsx";
import Footer from "./footer.jsx";
import Extras from "../components/dia.jsx";
import Astro from "../components/astro.jsx";
import Navbar from "../components/nav.jsx";
import useWeatherData from "../hooks/useWeatherData";

function Body() {
  const [city, setCity] = useState(""); // Estado global para la ciudad seleccionada
  const { weatherData, error, fetchWeather } = useWeatherData(city);

  // Estado para ubicaciones guardadas, inicializamos con localStorage
  const [savedLocations, setSavedLocations] = useState(() => {
    const saved = localStorage.getItem("savedLocations");
    return saved ? JSON.parse(saved) : [];
  });

  // Manejar cambio de ciudad seleccionada
  const handleCityChange = (newCity) => {
    setCity(newCity);
    fetchWeather(newCity); // Actualiza los datos basándose en la ciudad seleccionada
  };

  // Manejar guardar ubicación
  const handleSaveLocation = (city) => {
    setSavedLocations((prevLocations) => {
      if (!prevLocations.includes(city)) {
        const updatedLocations = [...prevLocations, city];
        localStorage.setItem("savedLocations", JSON.stringify(updatedLocations)); // Persistencia
        return updatedLocations;
      }
      return prevLocations;
    });
  };

  return (
    <main className="relative flex flex-col min-h-screen pt-4 antialiased font-AlbertSans">
      {/* Fondo dinámico para modo claro y oscuro */}
      <div className="absolute top-0 z-[-2] h-full min-h-screen w-screen rotate-180 transform bg-fixed bg-white dark:bg-gray-900 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(173,216,230,0.5)_100%)] dark:bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,0%,0)_0,rgba(38,70,83,0.5)_100%)]"></div>
      <section className="flex-grow w-full lg:flex lg:flex-col">
        {/* Pasamos el controlador de búsqueda y ubicaciones al Navbar */}
        <Navbar
          onCitySelect={handleCityChange}
          onSaveLocation={handleSaveLocation}
          savedLocations={savedLocations} // Pasamos las ubicaciones guardadas
        />
        <Now
          weatherData={weatherData}
          error={error}
          onSaveLocation={handleSaveLocation} // Pasamos la función de guardar
        />
        <Extras weatherData={weatherData} error={error} />
        <Today weatherData={weatherData} error={error} />
        <Astro weatherData={weatherData} error={error} />
      </section>
      <Footer />
    </main>
  );
}

export default Body;