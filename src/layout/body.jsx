import { useState } from "react";
import Now from "../components/blocks/rightNow.jsx";
import Today from "../components/blocks/today.jsx";
import Footer from "./footer.jsx";
import Extras from "../components/blocks/features.jsx";
import Navbar from "./nav.jsx";
import WeatherBackground from "../components/UI/WeatherBackground.jsx";
import AlertBanner from "../components/blocks/alertBanner.jsx";
import Daily from "../components/blocks/daily.jsx";
import useWeatherData from "../hooks/useWeatherData";

function Body() {
  const { weatherData, error, notice, offlineSince, fetchWeather, fetchCurrentLocationWeather, loading, extendedDays, place } = useWeatherData();

  const [savedLocations, setSavedLocations] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("savedLocations") || "[]");
      // Migración: antes se guardaban solo nombres (texto)
      return raw.map((s) => (typeof s === "string" ? { id: `nombre:${s}`, name: s, region: "" } : s));
    } catch {
      return [];
    }
  });

  const persist = (list) => {
    setSavedLocations(list);
    localStorage.setItem("savedLocations", JSON.stringify(list));
  };

  const handleSelect = (p) => fetchWeather(p.lat != null ? p : p.name);

  const handleSave = () => {
    if (place && !savedLocations.some((s) => s.id === place.id)) {
      persist([...savedLocations, { id: place.id, name: place.name, region: place.region || "", lat: place.lat, lon: place.lon }]);
    }
  };

  const handleRemove = (id) => persist(savedLocations.filter((s) => s.id !== id));

  const isSaved = !!place && savedLocations.some((s) => s.id === place.id);


  return (
    <main className="app-shell relative flex flex-col min-h-screen overflow-x-hidden pt-3 antialiased font-AlbertSans">
      <WeatherBackground weatherData={weatherData} />
      <section className="relative flex-grow w-full lg:flex lg:flex-col">
        <Navbar
          onCitySelect={handleSelect}
          savedLocations={savedLocations}
          onSave={handleSave}
          onRemove={handleRemove}
          isSaved={isSaved}
          currentId={place?.id ?? null}
          onUseLocation={() => fetchCurrentLocationWeather(true)}
          loading={loading}
        />
        <div className="mx-auto flex min-h-[100svh] w-full max-w-4xl flex-col gap-4 px-4 pb-6 sm:px-6">
          <div className="flex flex-col gap-4">
            <Now weatherData={weatherData} error={error} />
            <AlertBanner weatherData={weatherData} />
            {(notice || offlineSince) && (
              <section role="status" aria-live="polite" className="glass-card w-full rounded-3xl p-4">
                {notice && <p className="text-sm text-white/90">{notice}</p>}
                {offlineSince && (
                  <p className="mt-1 text-sm text-white/70">
                    Sin conexión. Mostrando los datos guardados a las{" "}
                    {new Date(offlineSince).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}.
                  </p>
                )}
              </section>
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-4">
            <Today weatherData={weatherData} />
            <Daily weatherData={weatherData} extendedDays={extendedDays} />
            <Extras weatherData={weatherData} />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Body;
