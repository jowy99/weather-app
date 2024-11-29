import Now from '../components/rightnow.jsx';
import Today from '../components/today.jsx';
import Footer from './footer.jsx';
import Astro from '../components/astro.jsx';

function body() {
    return (
        <main className="font-AlbertSans antialiased dark:bg-zinc-800">
            <section className='w-full h-screen min-h-screen space-y-8 lg:flex lg:flex-col'>
                <Now/>
                <Astro/>
                <Today/>
            </section>
            <Footer/>
        </main>
    )
};

export default body;