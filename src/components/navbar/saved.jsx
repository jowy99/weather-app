import { useState, useEffect } from "react";

const Saved = () => {
  const [savedLocations, setSavedLocations] = useState([]);

  // Cargar ubicaciones desde localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedLocations")) || [];
    setSavedLocations(saved);
  }, []);

  // Guardar ubicaciones en localStorage
  useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  const handleRemove = (city) => {
    setSavedLocations(savedLocations.filter((location) => location !== city));
  };

  return (
    <div className="mt-4 lg:mt-0">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Saved Locations
      </h3>
      <ul className="space-y-2 mt-2">
        {savedLocations.map((city, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-md"
          >
            <span className="text-gray-800 dark:text-gray-200">{city}</span>
            <button
              onClick={() => handleRemove(city)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Saved;
