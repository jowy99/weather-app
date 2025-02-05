import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SavedLocationsIcon from "../icons/savedLocation.jsx";
import Cross from "../icons/cross.jsx";

const Saved = ({ onCitySelect, savedLocations, removeLocation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center"
      ref={dropdownRef}
    >
      {/* Botón principal con icono */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center p-2 text-gray-500 rounded-full hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        <SavedLocationsIcon className="w-6 h-6 transition-transform hover:scale-110" />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 z-50 w-auto max-w-[250px] min-w-[150px]`}
        >
          {savedLocations.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {savedLocations.map((city) => (
                <li
                  key={city}
                  className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <button
                    className="flex-1 overflow-hidden text-left text-gray-800 text-ellipsis whitespace-nowrap dark:text-gray-200"
                    onClick={() => {
                      onCitySelect(city); // Seleccionar ciudad
                      setTimeout(() => setIsDropdownOpen(false), 100); // Pequeño retraso para evitar cierre prematuro
                    }}
                  >
                    {city}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar seleccionar la ciudad al eliminar
                      removeLocation(city); // Eliminar ciudad
                    }}
                    className="flex items-center justify-center px-2 py-1 text-xs font-semibold text-red-500 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
                    aria-label={`Remove ${city}`}
                  >
                    <Cross className="w-4 h-4 transition-transform hover:scale-110" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
              No saved locations yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

Saved.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  savedLocations: PropTypes.array.isRequired,
  removeLocation: PropTypes.func.isRequired,
  isCompact: PropTypes.bool,
};

export default Saved;