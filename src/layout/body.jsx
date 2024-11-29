import Now from '../components/rightnow.jsx';
import Today from '../components/today.jsx';
import Footer from './footer.jsx';
import Astro from '../components/dia.jsx';

function Body() {
    return (
        <main className="font-AlbertSans antialiased dark:bg-zinc-800 min-h-screen flex flex-col">
            <section className="w-full flex-grow space-y-8 lg:flex lg:flex-col">
                <Now />
                <Astro />
                <Today />
            </section>
            <Footer />
        </main>
    );
}

export default Body;
