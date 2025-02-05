import { useState, useEffect } from "react";

const ThemeToggle = () => {
  // Estado del tema
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar el tema por defecto del sistema
  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(systemPrefersDark);
    document.documentElement.classList.toggle("dark", systemPrefersDark);
  }, []);

  // Alternar el tema
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      document.documentElement.classList.toggle("dark", newTheme);
      return newTheme;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none"
    >
      {isDarkMode ? (
        // Sol (Modo oscuro)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-yellow-500"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" strokeWidth="2" />
          <line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
          <line x1="1" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
        </svg>
      ) : (
        // Luna (Modo claro)
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-gray-800"
        >
        <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            fill="currentColor"
        />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;