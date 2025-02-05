import PropTypes from "prop-types";

const RemoveLocationIcon = ({ color = "currentColor", className = "" }) => {
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
      <path d="M13.024 21.204a2 2 0 0 1 -2.437 -.304l-4.244 -4.243a8 8 0 1 1 13.119 -2.766"></path>
      <path d="M22 22l-5 -5"></path>
      <path d="M17 22l5 -5"></path>
    </svg>
  );
};

RemoveLocationIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

export default RemoveLocationIcon;