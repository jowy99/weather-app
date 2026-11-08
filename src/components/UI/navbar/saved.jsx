import { useRef, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import SavedLocation from "../icons/savedLocation.jsx";
import Cross from "../icons/cross.jsx";

const GLASS_POPOVER = "glass-popover";

const Saved = ({ onCitySelect, savedLocations, removeLocation, currentId = null }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  const closeAndFocus = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (open) closeAndFocus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeAndFocus]);

  const handlePanelKeyDown = (event) => {
    if (!panelRef.current) return;
    const items = panelRef.current.querySelectorAll("button:not(:disabled)");
    if (!items.length) return;

    const currentIndex = Array.from(items).indexOf(document.activeElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = items[currentIndex + 1] || items[0];
      next.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = items[currentIndex - 1] || items[items.length - 1];
      prev.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeAndFocus();
    }
  };

  useEffect(() => {
    if (open && panelRef.current) {
      const firstBtn = panelRef.current.querySelector("button");
      firstBtn?.focus();
    }
  }, [open]);

  return (
    <div className="relative flex items-center justify-center" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Mis ubicaciones"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="saved-locations-panel"
        className="shrink-0 rounded-full w-11 h-11 flex items-center justify-center text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <SavedLocation className="h-5 w-5" filled={false} />
      </button>

      {open && (
        <div
          id="saved-locations-panel"
          role="listbox"
          aria-labelledby="saved-locations-title"
          ref={panelRef}
          onKeyDown={handlePanelKeyDown}
          className={`${GLASS_POPOVER} absolute right-0 top-full z-50 mt-3 max-w-[calc(100vw-2rem)] w-72 overflow-hidden rounded-[1.5rem] shadow-2xl animate-fade-in`}
        >
          <p
            id="saved-locations-title"
            className="border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/85"
          >
            Mis ubicaciones
          </p>
          {savedLocations.length > 0 ? (
            <ul>
              {savedLocations.map((loc) => (
                <li key={loc.id} className="border-b border-white/10 last:border-b-0 flex items-center justify-between gap-2 px-4 py-3 transition hover:bg-white/10">
                  <button
                    type="button"
                    role="option"
                    aria-selected={loc.id === currentId}
                    className="min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset rounded-lg px-1 py-0.5"
                    onClick={() => {
                      onCitySelect(loc);
                      closeAndFocus();
                    }}
                  >
                    <span className="block truncate text-sm font-semibold text-white">
                      {loc.name}
                      {loc.id === currentId && (
                        <span className="ml-2 text-xs font-normal text-white/85">(actual)</span>
                      )}
                    </span>
                    {loc.region && (
                      <span className="block truncate text-xs text-white/85">{loc.region}</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeLocation(loc.id)}
                    aria-label={`Quitar ${loc.name} de mis ubicaciones`}
                    className="shrink-0 rounded-full p-[7px] text-white/50 transition hover:text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    <Cross className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-4 text-sm text-white/85">Aún no has guardado ninguna ubicación.</p>
          )}
        </div>
      )}
    </div>
  );
};

Saved.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  savedLocations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      region: PropTypes.string,
    }),
  ).isRequired,
  removeLocation: PropTypes.func.isRequired,
  currentId: PropTypes.string,
};

export default Saved;
