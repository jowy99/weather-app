import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { searchPlaces } from "../../../services/geocoding.js";
import Magnifying from "../icons/magnifying.jsx";

const GLASS_POPOVER = "glass-popover";

const Search = ({ onCitySelect, isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return undefined;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      setSuggestions(await searchPlaces(query));
      setSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return undefined;
    triggerRef.current = document.activeElement;
    const overlayEl = searchRef.current;
    const handleClickOutside = (event) => {
      if (!overlayEl || event.target === overlayEl || !overlayEl.contains(event.target)) onClose();
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (triggerRef.current && triggerRef.current.focus) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (place) => {
    onCitySelect(place);
    setQuery("");
    setSuggestions([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={searchRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-20 backdrop-blur-sm sm:items-center sm:pt-0 animate-fade-in"
    >
      <div className="w-full max-w-2xl">
        <div className={`${GLASS_POPOVER} flex items-center gap-3 rounded-[1.75rem] px-4 py-3 shadow-2xl`}>
          <Magnifying className="h-5 w-5 shrink-0 text-white/50" />
          <input
            ref={inputRef}
            type="search"
            id="search-title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Ciudad"
            placeholder="Buscar una ciudad"
            className="min-w-0 flex-1 bg-transparent text-base font-medium text-white outline-none placeholder:text-white/40"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar búsqueda"
            className="shrink-0 rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/60 transition hover:bg-white/15 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            esc
          </button>
        </div>

        {suggestions.length > 0 && (
          <ul
            className={`${GLASS_POPOVER} mt-2 overflow-hidden rounded-[1.5rem] shadow-xl`}
            aria-label="Resultados"
            role="listbox"
          >
            {suggestions.map((s) => (
              <li key={s.id} role="option">
                <button
                  type="button"
                  onClick={() => handleSelect(s)}
                  className="block w-full rounded-lg px-4 py-3 text-left transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10 focus-visible:ring-inset"
                >
                  <span className="block text-sm font-semibold text-white">{s.name}</span>
                  <span className="block text-xs text-white/85">{s.region}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-2 hidden px-2 text-sm text-white/70" role="status">
          {query.trim().length >= 2 && !searching && suggestions.length === 0
            ? "No se han encontrado ciudades."
            : ""}
        </p>
      </div>
    </div>
  );
};

Search.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Search;
