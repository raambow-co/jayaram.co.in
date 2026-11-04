import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageWrapper from './components/PageWrapper';
import Home from './pages/Home';
import RenewableEnergies from './pages/RenewableEnergies';
import SustainabilityInfrastructure from './pages/SustainabilityInfrastructure';
import NetworkIntegration from './pages/NetworkIntegration';
import GovernmentSupplies from './pages/GovernmentSupplies';
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
        
        {/* Core Divisions */}
        <Route path="/renewable-energies" element={<PageWrapper><RenewableEnergies /></PageWrapper>} />
        <Route path="/sustainability-environmental-infrastructure" element={<PageWrapper><SustainabilityInfrastructure /></PageWrapper>} />
        <Route path="/network-integration" element={<PageWrapper><NetworkIntegration /></PageWrapper>} />
        <Route path="/government-supplies" element={<PageWrapper><GovernmentSupplies /></PageWrapper>} />
        <Route path="/consultancy-services" element={<PageWrapper><ConsultancyServices /></PageWrapper>} />

        {/* Backward Compatibility Redirects */}
        <Route path="/solar-epc" element={<Navigate to="/renewable-energies" replace />} />
        <Route path="/ev-infrastructure" element={<Navigate to="/renewable-energies" replace />} />
        <Route path="/cc-securities" element={<Navigate to="/network-integration" replace />} />
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
