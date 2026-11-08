import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import Search from "../components/UI/navbar/search.jsx";
import Saved from "../components/UI/navbar/saved.jsx";
import SaveButton from "../components/UI/Buttons/SaveButton.jsx";
import Magnifying from "../components/UI/icons/magnifying.jsx";

const APP_NAME = "WeatherApp";

function LocateButton({ onClick, loading = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      aria-label="Usar mi ubicación actual"
      aria-busy={loading}
      className="shrink-0 rounded-xl w-11 h-11 flex items-center justify-center text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${loading ? "motion-safe:animate-pulse" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    </button>
  );
}
LocateButton.propTypes = { onClick: PropTypes.func.isRequired, loading: PropTypes.bool };

const Navbar = ({ onCitySelect, savedLocations, onSave, onRemove, isSaved, currentId = null, onUseLocation, loading = false }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shortcutKey, setShortcutKey] = useState("");
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  useEffect(() => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    setShortcutKey(isMac ? "⌘K" : "Ctrl+K");
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full py-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between gap-3">
          {/* Logo */}
          <h1 className="font-sans text-xl font-semibold tracking-tight text-white shrink-0">{APP_NAME}</h1>

          {/* Desktop search bar — centrado */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 justify-center lg:flex lg:pointer-events-auto">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Buscar ciudad"
              className="glass-pill flex items-center gap-3 w-full max-w-md rounded-2xl pl-5 pr-4 py-2.5 text-left text-sm font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <Magnifying className="h-5 w-5 shrink-0 text-white/50" />
              <span className="min-w-0 truncate text-white/50">Buscar ciudad…</span>
              <span aria-hidden="true" className="ml-auto shrink-0 shortcut-pill rounded-lg px-2 py-0.5 text-xs font-semibold text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                {shortcutKey}
              </span>
            </button>
          </div>

          {/* Right side: unified action pill */}
          <div className="flex items-center gap-2">
            {/* Unified actions pill */}
            <div className="actions-pill flex items-center">
              {/* Mobile search button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Buscar ciudad"
                className="shrink-0 rounded-xl w-11 h-11 flex items-center justify-center text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:hidden"
              >
                <Magnifying className="h-5 w-5" />
              </button>
              <LocateButton onClick={onUseLocation} loading={loading} />
              <Saved onCitySelect={onCitySelect} savedLocations={savedLocations} removeLocation={onRemove} currentId={currentId} />
              <SaveButton isSaved={isSaved} onSave={onSave} onRemove={() => currentId && onRemove(currentId)} />
            </div>
          </div>
        </div>

        <Search isOpen={isSearchOpen} onClose={closeSearch} onCitySelect={onCitySelect} />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  savedLocations: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  currentId: PropTypes.string,
  onUseLocation: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Navbar;
