import PropTypes from "prop-types";

const CrossIcon = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className={className}
    >
      <path d="M18 6l-12 12"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  );
};

CrossIcon.propTypes = {
  className: PropTypes.string,
};

export default CrossIcon;