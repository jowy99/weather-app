import Now from '../components/rightnow.jsx';
import Today from '../components/today.jsx';
import Footer from './footer.jsx';
import Extras from '../components/dia.jsx';
import Astro from '../components/astro.jsx';

function Body() {
    return (
        <main className="pt-4 font-AlbertSans antialiased min-h-screen flex flex-col dark:bg-zinc-800">
            <section className="w-full flex-grow lg:flex lg:flex-col">
                <Now />
                <Extras />
                <Today />
                <Astro />
            </section>
            <Footer />
        </main>
    );
}

export default Body;
