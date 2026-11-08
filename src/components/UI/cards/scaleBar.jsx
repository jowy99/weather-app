import PropTypes from "prop-types";

function ScaleBar({ gradient, position }) {
  const p = Math.min(Math.max(position, 0), 1) * 100;
  return (
    <div className="relative mt-3 h-1.5 rounded-full" style={{ background: gradient }} aria-hidden="true">
      <span className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-[color:var(--accent)]" style={{ left: `${p}%` }} />
    </div>
  );
}

ScaleBar.propTypes = { gradient: PropTypes.string.isRequired, position: PropTypes.number.isRequired };

export default ScaleBar;
