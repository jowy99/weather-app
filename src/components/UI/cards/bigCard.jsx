import PropTypes from "prop-types";

function BigCard({ title, icon, value }) {
  return (
    <div
      className="
        group relative flex h-full w-full flex-col
        items-center justify-between overflow-hidden
        rounded-[2rem] p-5 text-center

        border border-white/60
        bg-white/40
        shadow-[0_8px_32px_rgba(15,23,42,0.08)]

        backdrop-blur-2xl
        backdrop-saturate-150

        transition-all duration-300

        dark:border-white/15
        dark:bg-white/[0.07]
        dark:shadow-[0_8px_32px_rgba(0,0,0,0.30)]

        sm:p-6
      "
    >
      {/* Reflejo superior del cristal */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-br
          from-white/60 via-white/15 to-transparent
          opacity-70

          dark:from-white/15
          dark:via-white/[0.03]
          dark:to-transparent
          dark:opacity-100
        "
      />

      {/* Brillo interior */}
      <div
        className="
          pointer-events-none absolute inset-[1px]
          rounded-[calc(2rem-1px)]
          ring-1 ring-inset ring-white/20

          dark:ring-white/[0.06]
        "
      />

      {/* Contenido */}
      <h3 className="relative z-10 mb-4 text-xs font-semibold tracking-wide uppercase  text-slate-600 dark:text-slate-300 sm:text-sm">
        {title}
      </h3>

      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Icono con su propia capa de glass */}
        <div
          className="
            flex items-center justify-center
            rounded-full border border-white/70
            bg-white/45 p-4
            shadow-[0_4px_20px_rgba(15,23,42,0.08)]

            backdrop-blur-xl
            backdrop-saturate-150

            dark:border-white/15
            dark:bg-white/[0.10]
            dark:shadow-[0_4px_20px_rgba(0,0,0,0.20)]

            sm:p-5
          "
        >
          <img
            src={icon}
            alt={`Icon for ${title}`}
            className="w-16 h-16 sm:h-20 sm:w-20"
          />
        </div>

        <p className="text-2xl font-semibold tracking-tight  text-slate-950 dark:text-white sm:text-3xl">
          {value}
        </p>
      </div>
    </div>
  );
}

BigCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BigCard;
