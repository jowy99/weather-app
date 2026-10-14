import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Toggle from "../components/UI/navbar/toggle.jsx";
import Search from "../components/UI/navbar/search.jsx";
import Saved from "../components/UI/navbar/saved.jsx";
import SaveButton from "../components/UI/Buttons/SaveButton.jsx";
import Magnify from "../components/UI/icons/magnifying.jsx";
import AddLocationIcon from "../components/UI/icons/addLocation.jsx";
import RemoveLocationIcon from "../components/UI/icons/removeLocation.jsx";

const Navbar = ({
  onCitySelect = () => {},
  savedLocations = [],
  addLocation = () => {},
  removeLocation = () => {},
  currentLocation = "",
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [shortcutKey, setShortcutKey] = useState("");

  useEffect(() => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    setShortcutKey(isMac ? "⌘ K" : "Ctrl K");

    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true); // Abre el modal de búsqueda
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isSaved = savedLocations.includes(currentLocation);

  return (
    <nav className="sticky top-0 z-40 w-full py-2">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <h1 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            WeatherApp
          </h1>

          {/* Contenido en pantallas grandes */}
          <div className="hidden w-full lg:flex lg:items-center lg:justify-between">
            <div className="relative flex justify-center flex-1">
              {/* Input con iconos dentro */}
              <div className="relative w-1/2">
                <button
                  type="button"
                  aria-label="Abrir búsqueda de ciudad"
                  onClick={() => setIsSearchOpen(true)}
                  className="nav-control w-full rounded-full py-3 pl-12 pr-16 cursor-pointer text-left text-sm font-medium text-slate-500 transition focus:outline-none focus:ring-2 focus:ring-sky-300/70 dark:text-slate-200 dark:focus:ring-sky-400/40"
                >
                  Search city...
                </button>

                {/* Icono de lupa dentro del input */}
                <Magnify className="absolute w-5 h-5 text-slate-400 transform -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-slate-300" />

                {/* Tecla de acceso rápido (⌘ K o Ctrl K) dentro del input */}
                <span aria-hidden="true" className="shortcut-pill absolute right-4 top-1/2 transform -translate-y-1/2 text-xs px-2 py-0.5 rounded-full pointer-events-none">
                  {shortcutKey}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Toggle />
              <Saved
                onCitySelect={onCitySelect}
                savedLocations={savedLocations}
                removeLocation={removeLocation}
              />
              <SaveButton
                isSaved={isSaved}
                onSave={() => addLocation(currentLocation)}
                onRemove={() => removeLocation(currentLocation)}
              />
            </div>
          </div>
          {/* Iconos en responsive */}
          <div className="flex items-center justify-between p-1.5 space-x-3 rounded-full lg:hidden">
            {/* Botón de búsqueda */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="icon-button flex items-center justify-center p-2 text-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300/70 dark:text-slate-200 dark:focus:ring-sky-400/40"
              aria-label="Search"
            >
              <Magnify className="w-6 h-6" />
            </button>

            {/* Botón de tema */}
            <Toggle />

            {/* Menú de ubicaciones guardadas */}
            <Saved
              onCitySelect={onCitySelect}
              savedLocations={savedLocations}
              removeLocation={removeLocation}
              isCompact
            />

            {/* Botón de guardar ubicación con animación */}
            <button
              type="button"
              onClick={isSaved ? () => removeLocation(currentLocation) : () => addLocation(currentLocation)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={`flex items-center justify-center p-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-sky-300/70 dark:focus:ring-sky-400/40 ${
                isSaved
                  ? hovered
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600"
                    : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600"
                  : "bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600"
              }`}
              aria-label={isSaved ? "Remove from saved locations" : "Save location"}
            >
              {isSaved ? (
                hovered ? (
                  <RemoveLocationIcon className="w-6 h-6" />
                ) : (
                  <AddLocationIcon className="w-6 h-6" />
                )
              ) : (
                <AddLocationIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Modales */}
        <Search
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onCitySelect={onCitySelect}
        />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  savedLocations: PropTypes.array.isRequired,
  addLocation: PropTypes.func.isRequired,
  removeLocation: PropTypes.func.isRequired,
  currentLocation: PropTypes.string.isRequired,
};

export default Navbar;
