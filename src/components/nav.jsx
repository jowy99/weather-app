import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Toggle from "./navbar/toggle.jsx";
import Search from "./navbar/search.jsx";
import Saved from "./navbar/saved.jsx";
import SaveButton from "./UI/Buttons/SaveButton.jsx";
import Magnify from "./UI/icons/magnifying.jsx";
import AddLocationIcon from "./UI/icons/addLocation.jsx";
import RemoveLocationIcon from "./UI/icons/removeLocation.jsx";

const Navbar = ({
  onCitySelect = () => {},
  savedLocations = [],
  addLocation = () => {},
  removeLocation = () => {},
  currentLocation = "",
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [shortcutKey, setShortcutKey] = useState("");

  useEffect(() => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    setShortcutKey(isMac ? "⌘ K" : "Ctrl K");

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
            <div className="relative flex justify-center flex-1">
              {/* Input con iconos dentro */}
              <div className="relative w-1/2">
                <input
                  type="text"
                  placeholder="Search city..."
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full py-2.5 pl-12 pr-16 border rounded-lg cursor-pointer text-sm dark:bg-gray-800 dark:text-white focus:outline-none"
                  readOnly
                />

                {/* Icono de lupa dentro del input */}
                <Magnify className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-500" />

                {/* Tecla de acceso rápido (⌘ K o Ctrl K) dentro del input */}
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-md pointer-events-none">
                  {shortcutKey}
                </span>
              </div>
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
          <div className="flex items-center justify-between p-2 space-x-4 rounded-lg lg:hidden">
            {/* Botón de búsqueda */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center p-2 text-gray-500 rounded-full hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Search"
            >
              <Magnify className="w-6 h-6" />
            </button>

            {/* Botón de tema */}
            <Toggle />

            {/* Menú de ubicaciones guardadas */}
            <Saved
              onCitySelect={onCitySelect}
              savedLocations={savedLocations}
              removeLocation={removeLocation}
              isCompact
            />

            {/* Botón de guardar ubicación con animación */}
            <button
              onClick={isSaved ? () => removeLocation(currentLocation) : () => addLocation(currentLocation)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={`flex items-center justify-center p-2 rounded-full transition-all ${
                isSaved
                  ? hovered
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              aria-label={isSaved ? "Remove from saved locations" : "Save location"}
            >
              {isSaved ? (
                hovered ? (
                  <RemoveLocationIcon className="w-6 h-6" />
                ) : (
                  <AddLocationIcon className="w-6 h-6" />
                )
              ) : (
                <AddLocationIcon className="w-6 h-6" />
              )}
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
  addLocation: PropTypes.func.isRequired,
  removeLocation: PropTypes.func.isRequired,
  currentLocation: PropTypes.string.isRequired,
};

export default Navbar;