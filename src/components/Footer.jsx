import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const easePremium = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easePremium,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easePremium }
  }
};

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="relative group inline-block text-gray-300">
      <span className="relative z-10 transition-colors duration-300 group-hover:text-brand-orange">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
    </Link>
  </li>
);

// SVG Icons
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="bg-navy-blue text-white pt-16 pb-8 border-t-4 border-brand-orange overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-white p-2 rounded">
                <img src="/logo.png" alt="Jayarams Bharat Private Limited" className="h-14 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Building India's Future Through Engineering Excellence. We deliver turnkey renewable energies, environmental infrastructure, government supplies, network integration, and engineering consultancy across the nation.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <LinkedInIcon />, label: "LinkedIn" },
                { icon: <TwitterIcon />, label: "Twitter" },
                { icon: <FacebookIcon />, label: "Facebook" },
                { icon: <InstagramIcon />, label: "Instagram" }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href="#" 
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.1, backgroundColor: '#F26A21', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: easePremium }}
                  className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-white transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2 inline-block relative after:absolute after:bottom-[-1px] after:left-0 after:w-1/3 after:h-[1px] after:bg-brand-orange">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/projects">Our Projects</FooterLink>
              <FooterLink to="/testimonials">Testimonials</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </ul>
          </motion.div>

          {/* Our Divisions */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2 inline-block relative after:absolute after:bottom-[-1px] after:left-0 after:w-1/3 after:h-[1px] after:bg-brand-orange">Our Divisions</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <FooterLink to="/sustainability-environmental-infrastructure">Sustainability & Environmental Infrastructure</FooterLink>
              <FooterLink to="/renewable-energies">Renewable Energies</FooterLink>
              <FooterLink to="/government-supplies">Government Supplies</FooterLink>
              <FooterLink to="/network-integration">Network Integration</FooterLink>
              <FooterLink to="/consultancy-services">Consultancy Services</FooterLink>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold border-b border-white/20 pb-2 inline-block relative after:absolute after:bottom-[-1px] after:left-0 after:w-1/3 after:h-[1px] after:bg-brand-orange">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-gray-300 text-sm">
              <li className="flex gap-3 group cursor-default">
                <MapPin size={20} className="text-brand-orange shrink-0 transform transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-colors duration-300 group-hover:text-white">123 Corporate Tower, Financial District, Hyderabad, India 500032</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={18} className="text-brand-orange shrink-0 transform transition-transform duration-300 group-hover:scale-110" />
                <a href="tel:+919876543210" className="transition-colors duration-300 group-hover:text-white">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={18} className="text-brand-orange shrink-0 transform transition-transform duration-300 group-hover:scale-110" />
                <a href="mailto:info@jayaramsbharat.com" className="transition-colors duration-300 group-hover:text-white">info@jayaramsbharat.com</a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright & Legal */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {currentYear} Jayarams Bharat Private Limited. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
