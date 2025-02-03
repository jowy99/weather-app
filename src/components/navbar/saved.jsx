import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const Saved = ({ onCitySelect, savedLocations, removeLocation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el menú al hacer clic fuera o presionar ESC
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
    <div className="relative" ref={dropdownRef}>
      {/* Botón principal */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center px-4 py-2 text-sm font-medium text-white transition-all bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        📍 Saved Locations
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 z-50 w-64 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          {savedLocations.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {savedLocations.map((city) => (
                <li
                  key={city}
                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-800 cursor-pointer dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => onCitySelect(city)} // Seleccionar ciudad
                >
                  <span>{city}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Evita seleccionar la ciudad al eliminar
                      removeLocation(city); // Elimina la ciudad
                    }}
                    className="px-2 py-1 text-xs font-semibold text-red-500 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
                    aria-label={`Remove ${city}`}
                  >
                    ✖
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
};

export default Saved;