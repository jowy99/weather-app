import PropTypes from "prop-types";

const SavedLocationsIcon = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor" // Esto permite que el color se maneje con Tailwind
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className={className} // El color ahora se define en la clase
    >
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
      <path d="M21 21l-6 -6"></path>
    </svg>
  );
};

SavedLocationsIcon.propTypes = {
  className: PropTypes.string, // Solo se usa la clase
};

export default SavedLocationsIcon;