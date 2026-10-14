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
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="icon-button flex items-center justify-center p-2 text-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300/70 dark:text-slate-200 dark:focus:ring-sky-400/40"
        aria-label="Mostrar ubicaciones guardadas"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        <SavedLocationsIcon className="w-6 h-6 transition-transform hover:scale-110" />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          className="glass-surface absolute left-1/2 top-full z-50 mt-3 w-auto min-w-[180px] max-w-[280px] -translate-x-1/2 overflow-hidden rounded-[1.5rem]"
        >
          {savedLocations.length > 0 ? (
              <ul className="divide-y divide-slate-200/45 dark:divide-white/10">
              {savedLocations.map((city) => (
                <li
                  key={city}
                  className="flex items-center justify-between gap-2 px-4 py-3 text-sm transition hover:bg-white/45 dark:hover:bg-white/10"
                >
                  <button
                    type="button"
                    className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left font-medium text-slate-800 dark:text-slate-100"
                    onClick={() => {
                      onCitySelect(city); // Seleccionar ciudad
                      setTimeout(() => setIsDropdownOpen(false), 100); // Pequeño retraso para evitar cierre prematuro
                    }}
                  >
                    {city}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar seleccionar la ciudad al eliminar
                      removeLocation(city); // Eliminar ciudad
                    }}
                    className="flex items-center justify-center rounded-full bg-rose-100 p-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:hover:bg-rose-500/25"
                    aria-label={`Remove ${city}`}
                  >
                    <Cross className="w-4 h-4 transition-transform hover:scale-110" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm font-medium text-slate-500 dark:text-slate-400">
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
