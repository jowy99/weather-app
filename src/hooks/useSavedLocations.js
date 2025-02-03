import { useState, useEffect } from "react";

const useSavedLocations = () => {
  const [savedLocations, setSavedLocations] = useState([]);

  // Cargar ubicaciones guardadas desde localStorage al iniciar
  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem("savedLocations")) || [];
    setSavedLocations(storedLocations);
  }, []);

  // Guardar ubicación
  const addLocation = (location) => {
    if (!savedLocations.includes(location)) {
      const updatedLocations = [...savedLocations, location];
      setSavedLocations(updatedLocations);
      localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
    }
  };

  // Eliminar ubicación
  const removeLocation = (location) => {
    const updatedLocations = savedLocations.filter((loc) => loc !== location);
    setSavedLocations(updatedLocations);
    localStorage.setItem("savedLocations", JSON.stringify(updatedLocations));
  };

  return { savedLocations, addLocation, removeLocation };
};

export default useSavedLocations;