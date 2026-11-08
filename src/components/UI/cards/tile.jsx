import PropTypes from "prop-types";

function Tile({ icon, title, children, footer = null, className = "" }) {
  return (
    <section aria-label={title} className={`glass-card flex min-h-[10.5rem] flex-col rounded-3xl p-4 sm:p-5 ${className}`}>
      <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/85">
        <img src={icon} alt="" aria-hidden="true" width="18" height="18" className="h-[18px] w-[18px]" />
        {title}
      </h3>
      <div className="mt-2 flex flex-1 flex-col">{children}</div>
      {footer && <p className="mt-2 text-sm leading-snug text-white">{footer}</p>}
    </section>
  );
}

Tile.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};

export default Tile;
