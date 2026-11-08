import PropTypes from "prop-types";
import AddLocation from "../icons/addLocation.jsx";
import RemoveLocation from "../icons/removeLocation.jsx";

const SaveButton = ({ isSaved, onSave, onRemove }) => (
  <button
    type="button"
    onClick={isSaved ? onRemove : onSave}
    aria-label={isSaved ? "Quitar de ubicaciones guardadas" : "Guardar ubicación"}
    className="shrink-0 rounded-full w-11 h-11 flex items-center justify-center text-white/80 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-inset"
  >
    {isSaved ? (
      <RemoveLocation className="h-5 w-5" />
    ) : (
      <AddLocation className="h-5 w-5" />
    )}
  </button>
);

SaveButton.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default SaveButton;
