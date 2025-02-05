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
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
        <path d="M21 21l-6 -6"></path>
      </svg>
    );
};

SavedLocationsIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

export default SavedLocationsIcon;