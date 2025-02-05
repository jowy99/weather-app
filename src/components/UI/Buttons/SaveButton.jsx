import PropTypes from "prop-types";
import { useState } from "react";
import AddLocationIcon from "../icons/addLocation.jsx";
import RemoveLocationIcon from "../icons/removeLocation.jsx";

const SaveButton = ({ isSaved, onSave, onRemove }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={isSaved ? onRemove : onSave}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`p-2 rounded-lg transition-all ${
        isSaved
          ? hovered
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isSaved ? (
        hovered ? (
          <RemoveLocationIcon color="white" className="w-6 h-6" />
        ) : (
          <AddLocationIcon color="white" className="w-6 h-6" />
        )
      ) : (
        <AddLocationIcon color="white" className="w-6 h-6" />
      )}
    </button>
  );
};

SaveButton.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default SaveButton;