import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { fetchCitySuggestions } from "../../../services/fetcher.js";
import Magnify from "../icons/magnifying.jsx";

const Search = ({ onCitySelect, isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const modalRef = useRef(null);

  // Manejar cambios en el input
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() !== "") {
        try {
          const cities = await fetchCitySuggestions(query);
          setSuggestions(cities);
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Cerrar modal al hacer clic fuera o al presionar ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Manejar selección de una ciudad
  const handleCitySelect = (cityName) => {
    onCitySelect(cityName);
    setQuery("");
    setSuggestions([]);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/35 px-4 pt-20 backdrop-blur-xl dark:bg-black/50 sm:items-center sm:pt-0">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            className="w-full max-w-2xl"
          >
            <h2 id="search-dialog-title" className="sr-only">
              Buscar ciudad
            </h2>
            <div className="glass-surface flex items-center gap-3 rounded-[1.75rem] px-4 py-3 shadow-2xl focus-within:ring-2 focus-within:ring-sky-300/70 dark:focus-within:ring-sky-400/40">
              <Magnify className="w-6 h-6 text-slate-500 dark:text-slate-200" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                aria-label="Ciudad"
                placeholder="Busca una ciudad"
                className="min-w-0 flex-grow bg-transparent text-base font-medium text-slate-950 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar búsqueda"
                className="rounded-full border border-slate-300/50 bg-white/50 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:bg-white/80 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15"
              >
                esc
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="glass-surface mt-4 overflow-hidden rounded-[1.5rem]">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="text-slate-800 dark:text-slate-100"
                  >
                    <button
                      type="button"
                      onClick={() => handleCitySelect(suggestion.name)}
                      className="w-full px-5 py-3 text-left text-sm font-medium transition hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-sky-300/70 dark:hover:bg-white/10"
                    >
                      {suggestion.name}, {suggestion.region}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {suggestions.length === 0 && query.trim() && (
              <p className="mt-4 px-2 font-semibold text-rose-600 dark:text-rose-300">No cities found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

Search.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Search;
