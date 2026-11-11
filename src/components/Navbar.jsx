import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const easePremium = [0.16, 1, 0.3, 1];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Divisions', path: '#', hasDropdown: true },
    { name: 'Projects', path: '/#projects' },
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'Contact', path: '/#contact' },
  ];

  const divisionLinks = [
    { name: 'Sustainability & Environmental Infrastructure', path: '/sustainability-environmental-infrastructure' },
    { name: 'Renewable Energies', path: '/renewable-energies' },
    { name: 'Government Supplies', path: '/government-supplies' },
    { name: 'Network Integration', path: '/network-integration' },
    { name: 'Consultancy Services', path: '/consultancy-services' },
  ];

  // Always white with a dynamic border and shadow falling onto the page below
  const headerClass = `fixed w-full z-50 bg-white border-b border-gray-200 ${isScrolled ? 'shadow-md py-3' : 'shadow-sm py-4'} transition-all duration-300`;

  const textClass = `font-medium relative py-2 transition-colors duration-300 text-text-primary hover:text-corporate-blue`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3">
          <div className="p-1 rounded">
            <img src="/logo.webp" alt="Jayarams Bharat Private Limited" className="h-12 w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative"
              onMouseEnter={() => {
                setHoveredLink(link.name);
                if (link.hasDropdown) setDropdownOpen(true);
              }}
              onMouseLeave={() => {
                setHoveredLink(null);
                if (link.hasDropdown) setDropdownOpen(false);
              }}
            >
              {link.hasDropdown ? (
                <div className={`flex items-center gap-1 cursor-pointer ${textClass}`}>
                  {link.name}
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: easePremium }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: easePremium }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl border border-border-gray overflow-hidden origin-top"
                      >
                        <div className="py-2">
                          {divisionLinks.map((divLink) => (
                            <Link
                              key={divLink.name}
                              to={divLink.path}
                              className="block px-4 py-2.5 text-sm text-text-secondary hover:text-brand-orange hover:bg-light-bg transition-colors duration-200 leading-snug"
                            >
                              {divLink.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to={link.path} className={textClass}>
                  {link.name}
                </Link>
              )}
              
              {/* Animated Underline */}
              {((hoveredLink === link.name) || (location.pathname === link.path && link.path !== '#')) && (
                <motion.div
                  layoutId="navbar-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange origin-center"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.3, ease: easePremium }}
                />
              )}
            </div>
          ))}
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/#contact"
              className="px-6 py-2.5 bg-brand-orange text-white font-medium rounded hover:bg-orange-600 transition-colors duration-300 shadow-sm flex items-center gap-2 group"
            >
              Get in Touch
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden transition-colors duration-300 text-corporate-blue`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: easePremium }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-border-gray shadow-xl flex flex-col overflow-hidden"
          >
            <div className="py-4 px-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold text-corporate-blue py-2">{link.name}</span>
                      <div className="flex flex-col pl-4 border-l-2 border-light-bg gap-2">
                        {divisionLinks.map((divLink) => (
                          <Link
                            key={divLink.name}
                            to={divLink.path}
                            className="py-2 text-text-secondary active:text-brand-orange transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {divLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className="block font-semibold text-corporate-blue py-2 border-b border-light-bg last:border-0 active:text-brand-orange transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/#contact"
                className="mt-4 px-6 py-3 bg-brand-orange text-white text-center font-medium rounded active:scale-[0.98] transition-transform"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
