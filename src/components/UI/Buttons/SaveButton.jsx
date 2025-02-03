import PropTypes from "prop-types";
import { useState } from "react";

const SaveButton = ({ isSaved, onSave, onRemove }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={isSaved ? onRemove : onSave}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`px-6 py-2 rounded-lg font-medium transition-all ${
        isSaved
          ? hovered
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isSaved ? (hovered ? "Remove" : "Saved") : "Save Location"}
    </button>
  );
};

SaveButton.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default SaveButton;