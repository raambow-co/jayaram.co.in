import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageWrapper from './components/PageWrapper';
import Home from './pages/Home';
import SolarEPC from './pages/SolarEPC';
import EVInfrastructure from './pages/EVInfrastructure';
import GovernmentSupplies from './pages/GovernmentSupplies';
import CCSecurities from './pages/CCSecurities';
import ConsultancyServices from './pages/ConsultancyServices';
import About from './pages/About';
import Projects from './pages/Projects';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/testimonials" element={<PageWrapper><Testimonials /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/solar-epc" element={<PageWrapper><SolarEPC /></PageWrapper>} />
        <Route path="/ev-infrastructure" element={<PageWrapper><EVInfrastructure /></PageWrapper>} />
        <Route path="/government-supplies" element={<PageWrapper><GovernmentSupplies /></PageWrapper>} />
        <Route path="/cc-securities" element={<PageWrapper><CCSecurities /></PageWrapper>} />
        <Route path="/consultancy-services" element={<PageWrapper><ConsultancyServices /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
