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
    <main className="pt-4 font-AlbertSans antialiased min-h-screen flex flex-col dark:bg-zinc-800">
      <section className="w-full flex-grow lg:flex lg:flex-col">
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
