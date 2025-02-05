import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { fetchCitySuggestions } from "../../services/fetcher";
import Magnify from "../UI/icons/magnifying.jsx";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <div
            ref={modalRef}
            className="w-full max-w-2xl p-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-800 rounded-md shadow-lg dark:bg-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
              <Magnify color="#ffffff" className="w-6 h-6 transition-transform hover:scale-110" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                placeholder="Busca una ciudad"
                className="flex-grow bg-transparent outline-none dark:text-gray-200"
              />
              <button
                onClick={onClose}
                className="px-2 py-1 text-sm border border-gray-500 rounded-md dark:text-gray-400"
              >
                esc
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="mt-4 bg-gray-100 border border-gray-700 divide-y divide-gray-700 rounded-md dark:bg-gray-800">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleCitySelect(suggestion.name)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    {suggestion.name}, {suggestion.region}
                  </li>
                ))}
              </ul>
            )}

            {suggestions.length === 0 && query.trim() && (
              <p className="mt-4 text-gray-500">No cities found</p>
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