import PropTypes from "prop-types";
import { useState } from "react";
import AddLocationIcon from "../icons/addLocation.jsx";
import RemoveLocationIcon from "../icons/removeLocation.jsx";

const SaveButton = ({ isSaved, onSave, onRemove }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={isSaved ? onRemove : onSave}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={isSaved ? "Remove from saved locations" : "Save location"}
      className={`rounded-full p-2 transition-all focus:outline-none focus:ring-2 focus:ring-sky-300/70 dark:focus:ring-sky-400/40 ${
        isSaved
          ? hovered
            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600"
            : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600"
          : "bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600"
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
