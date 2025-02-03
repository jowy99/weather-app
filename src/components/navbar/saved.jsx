import { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const Saved = ({ onCitySelect, savedLocations, setSavedLocations }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Cerrar el menú al hacer clic fuera o presionar Esc
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

  // Manejar la selección de una ciudad
  const handleSelect = useCallback((city) => {
    onCitySelect(city);
    setIsDropdownOpen(false);
  }, [onCitySelect]);

  // Manejar la eliminación de una ciudad
  const handleDelete = (e, city) => {
    e.stopPropagation(); // Evita que se seleccione la ciudad al eliminarla
    const updatedLocations = savedLocations.filter((location) => location !== city);
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
  };

  return (
    <div className="relative mt-4 lg:mt-0" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 text-white transition-all bg-blue-500 rounded-md focus:outline-none hover:bg-blue-600"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        Saved Locations
      </button>

      {isDropdownOpen && (
        <ul
          className="absolute z-10 w-48 mt-2 transition-opacity bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800"
          role="menu"
        >
          {savedLocations.length > 0 ? (
            savedLocations.map((city, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-4 py-2 transition-all cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                role="menuitem"
                tabIndex={0}
                onClick={() => handleSelect(city)}
                onKeyDown={(e) => e.key === "Enter" && handleSelect(city)}
              >
                <span className="text-gray-800 dark:text-gray-200">{city}</span>
                <button
                  onClick={(e) => handleDelete(e, city)}
                  className="text-red-500 transition hover:text-red-700"
                  aria-label={`Remove ${city}`}
                >
                  ✖
                </button>
              </li>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-500 dark:text-gray-400">No saved locations yet.</p>
          )}
        </ul>
      )}
    </div>
  );
};

Saved.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  savedLocations: PropTypes.array.isRequired,
  setSavedLocations: PropTypes.func.isRequired, // Ahora permite actualizar la lista
};

export default Saved;