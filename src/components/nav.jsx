import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Toggle from "./navbar/toggle.jsx";
import Search from "./navbar/search.jsx";
import Saved from "./navbar/saved.jsx";

const Navbar = ({ onCitySelect, savedLocations }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [setIsSavedOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true); // Abre el modal
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav className="w-full">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-semibold text-gray-800 dark:text-white">
            WeatherApp
          </div>

          {/* Contenido en pantallas grandes */}
          <div className="hidden w-full lg:flex lg:items-center lg:justify-between">
            {/* Buscador centrado */}
            <div className="flex justify-center flex-1">
              <input
                type="text"
                placeholder="Search city..."
                onClick={() => setIsSearchOpen(true)}
                className="w-1/2 px-3 py-2.5 border rounded-lg cursor-pointer text-sm dark:bg-gray-800 dark:text-white"
                readOnly
              />
            </div>

            {/* Toggle y Localizaciones a la derecha */}
            <div className="flex items-center space-x-4">
              <Toggle />
              <Saved
                onCitySelect={onCitySelect}
                savedLocations={savedLocations}
              />
            </div>
          </div>

          {/* Iconos en responsive */}
          <div className="flex items-center space-x-6 lg:hidden">
            {/* Lupa - Abrir buscador */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-500 transition hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              aria-label="Search"
            >
              🔍
            </button>

            {/* Tema - Cambiar tema */}
            <Toggle />

            {/* Localizaciones guardadas */}
            <button
              onClick={() => setIsSavedOpen(true)}
              className="text-gray-500 transition hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              aria-label="Saved Locations"
            >
              📍
            </button>
          </div>
        </div>

        {/* Modales */}
        <Search
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onCitySelect={onCitySelect}
        />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  savedLocations: PropTypes.array.isRequired,
};

export default Navbar;