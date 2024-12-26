import { useState, useEffect } from "react";

const Toggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
        isDarkMode ? "bg-blue-600" : "bg-yellow-500"
      }`}
    >
      {/* Icono del sol (modo claro) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`absolute w-4 h-4 text-white left-2 transition-opacity ${
          isDarkMode ? "opacity-0" : "opacity-100"
        }`}
      >
        <circle cx="12" cy="12" r="5" />
        <line
          x1="12"
          y1="1"
          x2="12"
          y2="4"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="12"
          y1="20"
          x2="12"
          y2="23"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="4.22"
          y1="4.22"
          x2="5.64"
          y2="5.64"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="18.36"
          y1="18.36"
          x2="19.78"
          y2="19.78"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="1"
          y1="12"
          x2="4"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="20"
          y1="12"
          x2="23"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="4.22"
          y1="19.78"
          x2="5.64"
          y2="18.36"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="18.36"
          y1="5.64"
          x2="19.78"
          y2="4.22"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      {/* Icono de la luna (modo oscuro) */}
      <div
        className={`absolute w-4 h-4 flex items-center justify-center right-2 top-1/2 transform -translate-y-1/2 transition-opacity ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4 text-white"
        >
          <path
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      </div>

      {/* Bola del toggle */}
      <div
        className={`h-6 w-6 bg-white rounded-full shadow-md transform transition-transform ${
          isDarkMode ? "translate-x-0" : "translate-x-6"
        }`}
      ></div>
    </button>
  );
};

export default Toggle;
