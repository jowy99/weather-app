import { StrictMode } from 'react'
import RightNow from '../components/rightnow.jsx'
import Today from '../components/today.jsx'
import Footer from '../layout/footer.jsx'

function Home() {
  return (
    <StrictMode>
        <div className=''>
            <RightNow />
            <Today />
            <Footer />
        </div>
    </StrictMode>
  );
}

export default Home;
