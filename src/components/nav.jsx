import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Toggle from "./navbar/toggle.jsx";
import Search from "./navbar/search.jsx";
import Saved from "./navbar/saved.jsx";
import SaveButton from "./UI/Buttons/SaveButton.jsx";

const Navbar = ({
  onCitySelect = () => {},
  savedLocations = [],
  addLocation = () => {},
  removeLocation = () => {},
  currentLocation = "",
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true); // Abre el modal de búsqueda
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isSaved = savedLocations.includes(currentLocation);

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
            <div className="flex justify-center flex-1">
              <input
                type="text"
                placeholder="Search city..."
                onClick={() => setIsSearchOpen(true)}
                className="w-1/2 px-3 py-2.5 border rounded-lg cursor-pointer text-sm dark:bg-gray-800 dark:text-white"
                readOnly
              />
            </div>
            <div className="flex items-center space-x-4">
              <Toggle />
              <Saved
                onCitySelect={onCitySelect}
                savedLocations={savedLocations}
                removeLocation={removeLocation}
              />
              <SaveButton
                isSaved={isSaved}
                onSave={() => addLocation(currentLocation)}
                onRemove={() => removeLocation(currentLocation)}
              />
            </div>
          </div>

          {/* Iconos en responsive */}
          <div className="flex items-center justify-center space-x-4 lg:hidden">
            {/* Botón de búsqueda */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-500 transition hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              aria-label="Search"
            >
              🔍
            </button>

            {/* Botón de tema */}
            <Toggle />

            {/* Botón de guardar ubicación */}
            <button
              onClick={isSaved ? () => removeLocation(currentLocation) : () => addLocation(currentLocation)}
              className="text-red-500 transition hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
              aria-label={isSaved ? "Remove from saved locations" : "Save location"}
            >
              {isSaved ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a7.994 7.994 0 013.905 3.905c.921.3.921 1.603 0 1.902a7.994 7.994 0 01-3.905 3.905c-.3.921-1.603.921-1.902 0a7.994 7.994 0 01-3.905-3.905c-.921-.3-.921-1.603 0-1.902a7.994 7.994 0 013.905-3.905z"
                  />
                </svg>
              )}
            </button>

            {/* Menú de ubicaciones guardadas */}
            <Saved
              onCitySelect={onCitySelect}
              savedLocations={savedLocations}
              removeLocation={removeLocation}
              isCompact
            />
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
  addLocation: PropTypes.func.isRequired,
  removeLocation: PropTypes.func.isRequired,
  currentLocation: PropTypes.string.isRequired,
};

export default Navbar;