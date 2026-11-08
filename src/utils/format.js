export const to24h = (s) => {
  const [t, ap] = s.split(" ");
  let [h, m] = t.split(":").map(Number);
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return { h, m, label: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}` };
};

export const weekdayLabel = (date) => {
  const s = new Date(`${date}T12:00`).toLocaleDateString("es-ES", { weekday: "short" });
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const tempColor = (t) =>
  t <= 0
    ? "#3d7bff"
    : t <= 8
      ? "#4aa3ff"
      : t <= 13
        ? "#7cc4ff"
        : t <= 24
          ? "#ffd60a"
          : t <= 30
            ? "#ff9f0a"
            : "#ff453a";
