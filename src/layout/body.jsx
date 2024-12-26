import { useState } from 'react';
import Now from '../components/rightnow.jsx';
import Today from '../components/today.jsx';
import Footer from './footer.jsx';
import Extras from '../components/dia.jsx';
import Astro from '../components/astro.jsx';
import Navbar from '../components/nav.jsx';
import useWeatherData from '../hooks/useWeatherData';

function Body() {
    const [city, setCity] = useState(''); // Estado global para la ciudad seleccionada
    const { weatherData, fetchWeather } = useWeatherData(city); // Hook para gestionar datos meteorológicos

    const handleCityChange = (newCity) => {
        setCity(newCity);
        fetchWeather(newCity); // Actualiza los datos basándose en la ciudad seleccionada
    };

    return (
        <main className="pt-4 font-AlbertSans antialiased min-h-screen flex flex-col dark:bg-zinc-800">
            <section className="w-full flex-grow lg:flex lg:flex-col">
                {/* Pasamos el controlador de búsqueda al Navbar */}
                <Navbar onCitySelect={handleCityChange} />
                <Now weatherData={weatherData} /> {/* Componente principal con datos actuales */}
                <Extras weatherData={weatherData} />
                <Today weatherData={weatherData} />
                <Astro weatherData={weatherData} />
            </section>
            <Footer />
        </main>
    );
}

export default Body;
