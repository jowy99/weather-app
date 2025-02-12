import PropTypes from "prop-types";

const AddLocationIcon = ({ color = "currentColor", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className={className}
    >
      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
      <path d="M12.794 21.322a2 2 0 0 1 -2.207 -.422l-4.244 -4.243a8 8 0 1 1 13.59 -4.616"></path>
      <path d="M16 19h6"></path>
      <path d="M19 16v6"></path>
    </svg>
  );
};

AddLocationIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

export default AddLocationIcon;