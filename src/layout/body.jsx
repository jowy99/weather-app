import { useState } from "react";
import Now from "../components/rightnow.jsx";
import Today from "../components/today.jsx";
import Footer from "./footer.jsx";
import Extras from "../components/dia.jsx";
import Astro from "../components/astro.jsx";
import Navbar from "../components/nav.jsx";
import useWeatherData from "../hooks/useWeatherData";

function Body() {
  const [city, setCity] = useState(""); // Ciudad seleccionada o buscada
  const {
    weatherData,
    error,
    fetchWeather,
    fetchCurrentLocationWeather, // Asegúrate de incluir esto
    loading, // Asegúrate de incluir esto
  } = useWeatherData();

  // Estado para ubicaciones guardadas, inicializamos con localStorage
  const [savedLocations, setSavedLocations] = useState(() => {
    const saved = localStorage.getItem("savedLocations");
    return saved ? JSON.parse(saved) : [];
  });

  // Manejar cambio de ciudad seleccionada
  const handleCityChange = (newCity) => {
    setCity(newCity); // Actualiza el estado de la ciudad seleccionada
    fetchWeather(newCity); // Obtén los datos meteorológicos para esa ciudad
  };

  // Manejar guardar ubicación
  const handleSaveLocation = (cityToSave) => {
    if (!savedLocations.includes(cityToSave)) {
      const updatedLocations = [...savedLocations, cityToSave];
      setSavedLocations(updatedLocations);
      localStorage.setItem("savedLocations", JSON.stringify(updatedLocations)); // Persistencia
    }
  };

  // Manejar eliminación de ubicación
  const handleRemoveLocation = (cityToRemove) => {
    const updatedLocations = savedLocations.filter((loc) => loc !== cityToRemove);
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations)); // Persistencia
  };

  return (
    <main className="relative flex flex-col min-h-screen pt-4 antialiased font-AlbertSans">
      <div className="absolute top-0 z-[-2] h-full min-h-screen w-screen rotate-180 transform bg-fixed bg-white dark:bg-gray-900 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(173,216,230,0.5)_100%)] dark:bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,0%,0)_0,rgba(38,70,83,0.5)_100%)]"></div>
      <section className="flex-grow w-full lg:flex lg:flex-col">
        <Navbar
          onCitySelect={handleCityChange} // Función para seleccionar ciudad
          savedLocations={savedLocations} // Lista de ubicaciones guardadas
          addLocation={handleSaveLocation} // Añadir ubicación
          removeLocation={handleRemoveLocation} // Eliminar ubicación
          currentLocation={city} // Ciudad seleccionada o buscada
          fetchCurrentLocationWeather={fetchCurrentLocationWeather} // Función para obtener ubicación actual
          loading={loading} // Estado de carga
        />
        <Now weatherData={weatherData} error={error} />
        <Extras weatherData={weatherData} error={error} />
        <Today weatherData={weatherData} error={error} />
        <Astro weatherData={weatherData} error={error} />
      </section>
      <Footer />
    </main>
  );
}

export default Body;