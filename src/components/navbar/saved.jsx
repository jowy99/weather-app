import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const Saved = ({ onCitySelect, savedLocations }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (city) => {
    if (onCitySelect) {
      onCitySelect(city); // Llama a la función de cambio de ciudad desde Body.jsx
    }
    setIsDropdownOpen(false); // Cierra el desplegable
  };

  return (
    <div className="relative mt-4 lg:mt-0" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none hover:bg-blue-600 transition"
      >
        Saved Locations
      </button>

      {isDropdownOpen && (
        <ul className="absolute z-10 w-48 bg-white border border-gray-300 rounded shadow-lg mt-2 dark:bg-gray-800">
          {savedLocations.length > 0 ? (
            savedLocations.map((city, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all"
              >
                <span
                  className="text-gray-800 dark:text-gray-200 cursor-pointer"
                  onClick={() => handleSelect(city)} // Al seleccionar, cambia la ciudad
                >
                  {city}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar que cierre el dropdown
                    const updatedLocations = savedLocations.filter((location) => location !== city);
                    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
                  }}
                  className="text-red-500 hover:text-red-700 transition"
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
};

export default Saved;
