import { useState, useEffect } from "react";

const Toggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
        isDarkMode ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`h-4 w-4 bg-white rounded-full shadow-md transform transition-transform ${
          isDarkMode ? "translate-x-4" : ""
        }`}
      ></div>
    </button>
  );
};

export default Toggle;
