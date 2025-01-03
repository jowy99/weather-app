import PropTypes from "prop-types";
import { useState } from "react";
import { fetchCitySuggestions } from "../../services/fetcher";

const Search = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Manejar cambios en el input
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      const cities = await fetchCitySuggestions(value);
      setSuggestions(cities);
    } else {
      setSuggestions([]);
    }
  };

  // Manejar selección de una ciudad
  const handleCitySelect = (cityName) => {
    console.log("Selected city:", cityName); // Verificar el valor
    onCitySelect(cityName); // Llama a onCitySelect en lugar de fetchWeather
    setQuery(""); // Limpia el input
    setSuggestions([]); // Limpia las sugerencias
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search city..."
        className="px-4 py-2 border rounded-md w-full dark:bg-gray-800 dark:text-white"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-50 dark:bg-gray-800">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleCitySelect(suggestion.name)}
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              {suggestion.name}, {suggestion.region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Validación de las props
Search.propTypes = {
  onCitySelect: PropTypes.func.isRequired, // onCitySelect debe ser una función
};

export default Search;
