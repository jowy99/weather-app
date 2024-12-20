import { useState } from "react";
import Toggle from "./navbar/toggle.jsx";
import Search from "./navbar/search.jsx";
import Saved from "./navbar/saved.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
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
            <Search />
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
            <Search />
            <Toggle />
            <Saved />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
