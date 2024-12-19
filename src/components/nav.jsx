import { useState } from "react";
import PropTypes from "prop-types";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const handleThemeToggle = () => {
    const isDarkMode = !darkMode;
    setDarkMode(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-primary dark:bg-dark dark:text-light">
      <h1 className="text-lg font-bold dark:text-white">Weather App</h1>
      <button
        onClick={handleThemeToggle}
        className="bg-secondary py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 hover:text-white transition duration-300 dark:text-white dark:bg-gray-700"
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </nav>
  );
};

Navbar.propTypes = {
  toggleTheme: PropTypes.func,
};

export default Navbar;
