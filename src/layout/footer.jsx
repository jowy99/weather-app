function Footer() {
    return (
        <footer className="relative text-white/85">
            <div className="px-4 py-8 mx-auto max-w-7xl lg:px-8">
                <div className="flex flex-col items-center justify-center gap-2 text-sm font-medium">
                    <a href="https://joelarnaud.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-sky-600">
                        &copy; Joël Arnaud Carreras
                    </a>
                    <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
                        <span>Datos:</span>
                        <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-sky-600">WeatherAPI.com</a>
                        <span>·</span>
                        <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-sky-600">Open-Meteo</a>
                        <span>·</span>
                        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="transition hover:text-sky-600">OpenStreetMap</a>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
