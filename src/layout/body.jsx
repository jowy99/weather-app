import { useState } from "react";
import Now from "../components/blocks/rightNow.jsx";
import Today from "../components/blocks/today.jsx";
import Footer from "./footer.jsx";
import Extras from "../components/blocks/features.jsx";
import Astro from "../components/blocks/astro.jsx";
import Navbar from "./nav.jsx";
import useWeatherData from "../hooks/useWeatherData";

function Body() {
  const [city, setCity] = useState("Madrid"); // Ciudad seleccionada o buscada
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
    <main className="app-shell relative flex flex-col min-h-screen overflow-x-hidden pt-3 antialiased font-AlbertSans">
      <div className="app-background"></div>
      <section className="relative flex-grow w-full lg:flex lg:flex-col">
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
