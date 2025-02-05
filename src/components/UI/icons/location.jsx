import PropTypes from 'prop-types';

const SavedLocationsIcon = ({ color = "currentColor", className = "" }) => {
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
        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
      </svg>
    );
};

SavedLocationsIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

export default SavedLocationsIcon;