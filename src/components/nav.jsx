import PropTypes from "prop-types"; // Importar prop-types
import { useState } from "react";
import Toggle from "./navbar/toggle.jsx";
import Search from "./navbar/search.jsx";
import Saved from "./navbar/saved.jsx";

const Navbar = ({ onCitySelect }) => { // Recibe onCitySelect como prop
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-semibold dark:text-white text-gray-800">
            WeatherApp
          </div>

          {/* Menú hamburguesa */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 dark:text-gray-300 focus:outline-none"
            >
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>

          {/* Contenido del navbar */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Search onCitySelect={onCitySelect} /> {/* Pasamos la prop aquí */}
            <Toggle />
            <Saved />
          </div>
        </div>

        {/* Desplegable en móviles */}
        <div
          className={`${
            isMenuOpen ? "max-h-screen" : "max-h-0"
          } overflow-hidden transition-max-height duration-300 ease-in-out lg:hidden`}
        >
          <div className="flex flex-col space-y-4 mt-4">
            <Search onCitySelect={onCitySelect} /> {/* También aquí */}
            <Toggle />
            <Saved />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Validación de las props
Navbar.propTypes = {
  onCitySelect: PropTypes.func.isRequired, // Aseguramos que sea una función y obligatoria
};

export default Navbar;
