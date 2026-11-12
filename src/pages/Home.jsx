import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Building2, Landmark, Briefcase, Star, ChevronRight, Leaf, Network, CheckCircle2, MapPin, HelpCircle, Plus, Minus } from 'lucide-react';
import { submitInquiry } from '../services/inquiryService';
import { subscribeToProjects } from '../services/projectService';
import SEO from '../components/SEO';
const India3DMap = lazy(() => import('../components/India3DMap'));

const easePremium = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easePremium }
  }
};

const testimonialsRow1 = [
  { text: "Jayarams Bharat executed our 5MW solar & EV fleet charging hub with exceptional precision. Top-tier engineering.", author: "Rajesh Kumar", role: "Director, TechPark Solutions" },
  { text: "The environmental wastewater recycling plant achieved 100% zero liquid discharge compliance effortlessly.", author: "Anjali Desai", role: "VP Operations, EcoTransit" },
  { text: "Unmatched expertise in government tenders. They delivered our command center project ahead of schedule.", author: "Vikram Singh", role: "Chief Engineer, State Infra" },
  { text: "Their Network Integration team completely transformed our enterprise infrastructure with high-speed fiber backbones.", author: "Priya Sharma", role: "Head of Infrastructure, Nexus Corp" },
  { text: "Strategic engineering consultancy that navigated complex regulatory and environmental approvals smoothly.", author: "Amit Patel", role: "Managing Partner, BuildRight" },
];

const testimonialsRow2 = [
  { text: "Flawless rainwater harvesting and groundwater recharging across our 40-acre commercial campus.", author: "Dr. K. Venkat Rao", role: "Sustainability Lead, GreenAcre" },
  { text: "High-power DC EV charging stations deployed across 12 highway corridors with outstanding 99.9% uptime.", author: "Arvind Menon", role: "Fleet Director, TransLogix" },
  { text: "Seamless institutional procurement and transparent supply chain execution on mission-critical tenders.", author: "R. K. Nambiar", role: "Procurement Head, State Works" },
  { text: "Enterprise structured cabling and unified video surveillance integration executed flawlessly across 6 facilities.", author: "Sunita Reddy", role: "CIO, Apex Systems" },
  { text: "Turnkey Solar EPC execution with real-time SCADA telemetry and proactive preventive maintenance support.", author: "Meera Nair", role: "General Manager, SunPower Corp" },
];

const featuredProjects = [
  {
    img: "/sustainability-infra.webp",
    title: "Sustainable Environmental Hub",
    desc: "Closed-loop wastewater reclamation and eco-resilient civil engineering."
  },
  {
    img: "/renewable-energies.webp",
    title: "Renewable Energy Hub",
    desc: "Commercial Solar EPC coupled with high-speed EV charging infrastructure."
  },
  {
    img: "/network-integration.webp",
    title: "Enterprise Network & Command Center",
    desc: "Optical fiber backbones integrated with AI surveillance systems."
  },
  {
    img: "/government-supplies.webp",
    title: "Government Procurement & Supplies",
    desc: "Institutional delivery and national tender fulfillment across sectors."
  },
  {
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    title: "Infrastructure Consultancy & PMO",
    desc: "Technical feasibility, regulatory clearances, and capital advisory."
  }
];

const ReviewCard = ({ t }) => (
  <div className="w-[310px] sm:w-[350px] md:w-[390px] bg-white px-5 py-3.5 rounded-xl border border-border-gray/70 hover:border-brand-orange/40 shrink-0 whitespace-normal flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-default group/card">
    {/* Top Bar: Stars & Verified Badge */}
    <div className="flex justify-between items-center mb-1.5">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-brand-orange text-brand-orange" />
        ))}
      </div>
      <div className="flex items-center gap-1.5 bg-light-bg px-2 py-0.5 rounded-full border border-border-gray">
        <span className="text-[9px] font-bold text-corporate-blue uppercase tracking-wider">Verified</span>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
      </div>
    </div>

    {/* Quote Text (Compact height) */}
    <p className="text-text-primary text-xs md:text-sm leading-snug my-1.5 font-medium line-clamp-2">
      "{t.text}"
    </p>

    {/* Bottom Bar: Author Profile */}
    <div className="flex items-center justify-between pt-2 border-t border-light-bg mt-auto">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-full bg-corporate-blue/10 flex items-center justify-center text-corporate-blue font-bold text-xs shrink-0 border border-corporate-blue/20">
          {t.author.charAt(0)}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-corporate-blue text-xs truncate leading-tight">{t.author}</h4>
          <p className="text-[10px] text-text-secondary uppercase tracking-wider truncate leading-tight">{t.role}</p>
        </div>
      </div>
      <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 group-hover/card:bg-brand-orange transition-colors">
        <ChevronRight className="w-3 h-3 text-brand-orange group-hover/card:text-white transition-colors" />
      </div>
    </div>
  </div>
);

const Home = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [homeForm, setHomeForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceRequired: '',
    message: ''
  });
  const [isSubmittingHome, setIsSubmittingHome] = useState(false);
  const [homeSubmitted, setHomeSubmitted] = useState(false);
  const [liveProjects, setLiveProjects] = useState(featuredProjects);
  const [openFaq, setOpenFaq] = useState(0);

  const localFaqs = [
    {
      q: "What turnkey engineering services does Jayarams Bharat provide in Vijayawada and Eluru?",
      a: "Jayarams Bharat (jayarams-bharat) delivers end-to-end Commercial & Industrial Solar EPC, High-Speed DC EV Charging Plazas, Wastewater Treatment (STP/ETP/ZLD), Municipal Landfill Bio-mining, Enterprise Optical Fiber Integration, AI CCTV Surveillance, and GeM Government Procurement across Vijayawada, Eluru, Rajahmundry, Guntur, and Andhra Pradesh."
    },
    {
      q: "What is Jayarams Bharat's local response time and service radius?",
      a: "Our regional engineering hubs in the Vijayawada – Eluru corridor provide guaranteed on-site technical inspection, detailed site audits, and project feasibility surveys within an immediate 1km to 50km radius across Krishna, NTR, West Godavari, and Guntur districts."
    },
    {
      q: "Do you handle DISCOM net-metering approvals for commercial solar projects in Andhra Pradesh?",
      a: "Yes. Our Renewable Energies division manages the full statutory compliance lifecycle including APEPDCL/APCPDCL net-metering approvals, CEIG electrical safety clearances, dedicated transformer commissioning, and real-time SCADA telemetry for industrial and commercial solar installations."
    },
    {
      q: "Is Jayarams Bharat authorized for government tenders and institutional GeM procurement?",
      a: "Absolutely. Jayarams Bharat is fully credentialed on the Government e-Marketplace (GeM) and executes institutional tenders, municipal civil machinery procurement, disaster rapid response equipment, and state-level infrastructure contracts."
    },
    {
      q: "How can businesses in Vijayawada or Eluru schedule an on-site feasibility survey?",
      a: "You can request an immediate on-site survey by filling out our project inquiry form below or calling our direct operations desk at +91 98765 43210. Our regional field engineers respond within 24 hours."
    }
  ];

  useEffect(() => {
    const unsubscribe = subscribeToProjects((projects) => {
      if (projects && projects.length > 0) {
        const mapped = projects.slice(0, 6).map(p => ({
          img: p.imageUrl || p.img || '/sustainability-infra.webp',
          title: p.title,
          desc: p.summary || p.description || p.desc || ''
        }));
        setLiveProjects(mapped);
      }
    }, featuredProjects);
    return () => unsubscribe();
  }, []);

  const handleHomeSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingHome(true);
    try {
      await submitInquiry({
        fullName: homeForm.fullName,
        phone: homeForm.phone,
        email: homeForm.email,
        serviceRequired: homeForm.serviceRequired || 'General Consultation',
        divisionName: homeForm.serviceRequired || 'Engineering & Infrastructure',
        message: homeForm.message,
        source: 'Homepage Inquiry Form'
      });
      setHomeSubmitted(true);
    } catch (err) {
      console.error('Home inquiry submit error:', err);
      setHomeSubmitted(true);
    } finally {
      setIsSubmittingHome(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    if (liveProjects.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % liveProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [liveProjects.length]);

  return (
    <div className="w-full">
      <SEO 
        title="Jayarams Bharat (jayarams-bharat) | Premier Solar EPC &amp; Engineering Conglomerate | Vijayawada &amp; Eluru"
        description="Jayarams Bharat (jayarams-bharat) is Andhra Pradesh's premier engineering enterprise delivering Turnkey Commercial Solar EPC, EV Charging Plazas, Wastewater Treatment (ETP/STP), AI CCTV Surveillance, and Government Supplies across Vijayawada, Eluru, and Andhra Pradesh."
        keywords="jayarams-bharat, jayarams bharat, jayarams, jayarams-bharat vijayawada, jayarams-bharat eluru, Solar EPC Vijayawada, Solar EPC Eluru, Commercial rooftop solar Andhra Pradesh, CCTV surveillance Vijayawada, Wastewater treatment plant contractor Eluru, Turnkey EPC contractor near me, Solar power plant Andhra Pradesh"
      />
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex items-center bg-white pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0B2E73 1px, transparent 1px), linear-gradient(90deg, #0B2E73 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl order-2 lg:order-1">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-4">
                <motion.span variants={itemVariants} className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-light-bg text-corporate-blue text-xs font-bold tracking-widest uppercase mb-4 border border-border-gray">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                  Jayarams Bharat (jayarams-bharat) • Andhra Pradesh Engineering Conglomerate
                </motion.span>
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-corporate-blue leading-[1.2] mb-6 tracking-tight"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.span variants={itemVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-corporate-blue to-navy-blue pb-2">Jayarams Bharat</motion.span>
                <motion.span variants={itemVariants} className="block text-2xl md:text-3xl lg:text-4xl text-text-primary font-bold">Building India's Future Through Engineering Excellence</motion.span>
              </motion.h1>

              <motion.p 
                variants={itemVariants} 
                initial="hidden"
                animate="visible"
                className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-xl"
              >
                Premier turnkey engineering and EPC conglomerate delivering commercial <strong>Solar EPC</strong>, <strong>EV Infrastructure</strong>, <strong>Wastewater Reclamation (ETP/STP)</strong>, and <strong>AI CCTV Surveillance</strong> with active operational hubs across <strong>Vijayawada</strong>, <strong>Eluru</strong>, <strong>Rajahmundry</strong>, and surrounding corridors.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.4 }
                  }
                }}
              >
                <motion.a 
                  href="#divisions" 
                  variants={itemVariants}
                  className="group relative overflow-hidden px-8 py-3.5 bg-brand-orange text-white text-sm font-semibold rounded-full text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Divisions
                    <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.a>
                <motion.div variants={itemVariants}>
                  <a 
                    href="#contact" 
                    className="block px-8 py-3.5 bg-white border-2 border-border-gray text-text-primary text-sm font-semibold rounded-full hover:border-corporate-blue hover:text-corporate-blue transition-all duration-300 text-center active:scale-[0.98]"
                  >
                    Contact Us
                  </a>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="relative justify-center lg:justify-end order-1 lg:order-2 hidden lg:flex"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: easePremium }}
            >
              {/*
                Container sizing:
                - Desktop: 520×600px  (taller because India is tall)
                - Tablet:  420×480px
                - Mobile:  320×380px
                background: transparent — the site background shows through
              */}
              <div
                className="w-full max-w-[280px] h-[340px] sm:max-w-[420px] sm:h-[480px] lg:max-w-[520px] lg:h-[600px] mx-auto"
                style={{ position: 'relative', background: 'transparent' }}
              >
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border-4 border-corporate-blue/30 border-t-brand-orange animate-spin" />
                  </div>
                }>
                  <India3DMap />
                </Suspense>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. About Us */}
      <section id="about" className="py-24 bg-light-bg">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="max-w-3xl">
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-corporate-blue mb-4 tracking-tight">About Us</motion.h2>
              <motion.div variants={itemVariants} className="w-16 h-1 bg-brand-orange mb-6"></motion.div>
              <motion.p variants={itemVariants} className="text-sm md:text-base text-text-secondary leading-relaxed">
                Specialized engineering and business divisions executing large-scale national projects with precision, compliance, and technological superiority. Our multidisciplinary expertise drives India's infrastructure forward.
              </motion.p>
            </div>
          </motion.div>

          <motion.div 
            id="divisions"
            className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] scroll-mt-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {[
              { name: "Sustainability & Environmental Infrastructure", icon: Leaf, link: "/sustainability-environmental-infrastructure", desc: "Water treatment, waste recovery & climate-resilient green engineering.", img: "/sustainability-infra.webp", span: "md:col-span-7" },
              { name: "Renewable Energies", icon: Zap, link: "/renewable-energies", desc: "End-to-end Solar EPC and nationwide EV charging networks.", img: "/renewable-energies.webp", span: "md:col-span-5" },
              { name: "Government Supplies", icon: Landmark, link: "/government-supplies", desc: "Institutional procurement and mission-critical tender execution.", img: "/government-supplies.webp", span: "md:col-span-4" },
              { name: "Network Integration", icon: Network, link: "/network-integration", desc: "Enterprise networking, smart AI surveillance & command centers.", img: "/network-integration.webp", span: "md:col-span-4" },
              { name: "Consultancy Services", icon: Briefcase, link: "/consultancy-services", desc: "Technical feasibility, regulatory compliance & project advisory.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop", span: "md:col-span-4" }
            ].map((division, idx) => (
              <motion.div key={idx} variants={itemVariants} className={`relative overflow-hidden rounded-xl group ${division.span} shadow-md`}>
                <Link to={division.link} className="block w-full h-full relative">
                  <img src={division.img} alt={division.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  {/* Made gradient lighter to show off the images more */}
                  <div className="absolute inset-0 bg-gradient-to-t from-corporate-blue/90 via-transparent to-transparent transition-opacity duration-300 group-hover:from-corporate-blue/95"></div>
                  
                  {/* Top Right Animated Logo Frame */}
                  <div className="absolute top-6 right-6 z-20 w-14 h-14 rounded-full flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                    <motion.div 
                      className="absolute inset-0 rounded-full border border-dashed border-white/50 group-hover:border-brand-orange"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <img src="/logo.webp" className="w-10 h-10 object-contain" alt="Jayarams" />
                    </div>
                  </div>

                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/30 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-orange group-hover:border-brand-orange">
                      <division.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 tracking-tight drop-shadow-md">{division.name}</h3>
                    <div className="flex items-center text-brand-orange font-bold text-xs uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                      Explore Division <ArrowRight size={14} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Featured Projects (3D Carousel) */}
      <section id="projects" className="py-24 bg-white overflow-hidden perspective-[1200px]">
        <div className="container mx-auto px-6 md:px-12 mb-16">
          <motion.div 
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold text-corporate-blue mb-6 tracking-tight">Featured Projects</motion.h2>
            <motion.div variants={itemVariants} className="w-16 h-1 bg-brand-orange"></motion.div>
          </motion.div>
        </div>
        
        <div className="relative h-[300px] md:h-[500px] w-full flex justify-center items-center mt-8">
          {liveProjects.map((project, index) => {
            const offset = (index - activeIndex + liveProjects.length) % liveProjects.length;
            const isCenter = offset === 0;
            const isLeft = offset === liveProjects.length - 1;
            const isRight = offset === 1;
            const isHidden = !isCenter && !isLeft && !isRight;

            // Values for desktop (md+)
            let x = 0;
            let z = 0;
            let rotateY = 0;
            let opacity = 1;

            if (isLeft) {
              x = windowWidth < 768 ? -70 : -350;
              z = -200;
              rotateY = 35;
              opacity = 0.5;
            } else if (isRight) {
              x = windowWidth < 768 ? 70 : 350;
              z = -200;
              rotateY = -35;
              opacity = 0.5;
            } else if (isHidden) {
              opacity = 0;
              z = -400;
            }

            return (
              <motion.div
                key={index}
                className="absolute w-[240px] h-[280px] sm:w-[260px] sm:h-[300px] md:w-[650px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer transform-style-3d"
                initial={false}
                animate={{
                  x,
                  z,
                  rotateY,
                  opacity,
                  scale: isCenter ? 1 : 0.8
                }}
                transition={{ duration: 0.7, ease: easePremium }}
                onClick={() => setActiveIndex(index)}
                style={{ zIndex: isCenter ? 50 : 40 }}
              >
                <div className="absolute inset-0 bg-corporate-blue/30 mix-blend-overlay z-10 pointer-events-none transition-opacity duration-700" style={{ opacity: isCenter ? 0 : 1 }}></div>
                <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-8 z-20">
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1.5">{project.title}</h3>
                    <p className="text-white/85 text-xs md:text-sm">{project.desc}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. Animated Testimonials Marquee */}
      <section id="testimonials" className="py-24 bg-light-bg overflow-hidden border-t border-b border-border-gray">
        <div className="container mx-auto px-6 md:px-12 mb-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={itemVariants} className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-brand-orange text-xs font-bold uppercase tracking-widest mb-6">Social Proof</motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold text-corporate-blue tracking-tight">
              Trusted by <span className="text-brand-orange">Thousands</span> of Partners
            </motion.h2>
          </motion.div>
        </div>
        
        {/* Dual Marquee Rows */}
        <div className="relative w-full overflow-hidden flex flex-col gap-4 py-4">
          {/* Left & Right Edge Gradient Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-light-bg to-transparent z-20"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-light-bg to-transparent z-20"></div>

          {/* Row 1: Left to Right */}
          <div className="flex overflow-hidden w-full">
            <motion.div 
              className="flex whitespace-nowrap gap-5 px-2 items-center"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            >
              {[...testimonialsRow1, ...testimonialsRow1].map((t, idx) => (
                <ReviewCard key={`row1-${idx}`} t={t} />
              ))}
            </motion.div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="flex overflow-hidden w-full">
            <motion.div 
              className="flex whitespace-nowrap gap-5 px-2 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            >
              {[...testimonialsRow2, ...testimonialsRow2].map((t, idx) => (
                <ReviewCard key={`row2-${idx}`} t={t} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5.5 Regional Engineering Presence & Local Corridors (SEO & Local Dominance) */}
      <section className="py-20 bg-gradient-to-b from-light-bg via-white to-light-bg border-y border-border-gray/60">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold tracking-widest uppercase mb-4">
              <MapPin size={14} className="text-brand-orange" />
              Regional Service Corridors • Immediate 1km – 50km Local Deployment
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-corporate-blue mb-4 tracking-tight">
              Engineering Hubs in Vijayawada, Eluru &amp; Andhra Pradesh
            </motion.h2>
            <motion.div variants={itemVariants} className="w-20 h-1 bg-brand-orange mx-auto mb-6"></motion.div>
            <motion.p variants={itemVariants} className="text-sm md:text-base text-text-secondary leading-relaxed">
              <strong className="text-corporate-blue">Jayarams Bharat (jayarams-bharat)</strong> maintains active on-site engineering desks across Andhra Pradesh. We guarantee rapid technical inspection, feasibility studies, and direct turnkey project execution across municipal and industrial corridors within a 1km to 50km radius.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                city: "Vijayawada Operations Hub",
                tag: "Rapid 1km – 25km Radius",
                services: [
                  "Commercial & Industrial Solar EPC",
                  "Municipal AI CCTV Surveillance Networks",
                  "Fiber Optic Enterprise Integration",
                  "Industrial STP & ETP Wastewater Plants"
                ]
              },
              {
                city: "Eluru Engineering Center",
                tag: "Rapid 1km – 30km Radius",
                services: [
                  "Commercial Solar Rooftop Arrays",
                  "High-Power DC EV Charging Plazas",
                  "GeM Government Supplies & Tenders",
                  "Heavy Equipment & Civil Infrastructure"
                ]
              },
              {
                city: "Rajahmundry & Godavari Belt",
                tag: "Active Project Corridors",
                services: [
                  "Legacy Waste Bio-mining & Landfills",
                  "Zero Liquid Discharge (ZLD) Systems",
                  "Smart City Command Centers (ICCC)",
                  "Infrastructure DPR & Feasibility"
                ]
              },
              {
                city: "Guntur & Amaravati Capital Region",
                tag: "Capital Infrastructure Belt",
                services: [
                  "Highway EV Charging Networks",
                  "City-wide Security Infrastructure",
                  "Large-Scale Public Works Execution",
                  "Comprehensive PMO & EPC Advisory"
                ]
              }
            ].map((hub, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border-gray/80 hover:border-brand-orange/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full uppercase tracking-wider">{hub.tag}</span>
                    <MapPin size={16} className="text-corporate-blue group-hover:text-brand-orange transition-colors" />
                  </div>
                  <h3 className="font-bold text-base text-corporate-blue mb-4 group-hover:text-brand-orange transition-colors">{hub.city}</h3>
                  <ul className="space-y-2.5 text-xs text-text-secondary">
                    {hub.services.map((svc, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                        <span>{svc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-corporate-blue font-semibold">
                  <span>Fast On-Site Deployment</span>
                  <ChevronRight size={14} className="text-brand-orange group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.8 Frequently Asked Questions (Hyper-Local FAQ for SERP Dominance) */}
      <section className="py-20 bg-white border-b border-border-gray/60">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-bg border border-border-gray text-corporate-blue text-xs font-bold tracking-widest uppercase mb-4">
              <HelpCircle size={14} className="text-brand-orange" />
              Frequently Asked Questions
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-corporate-blue mb-4 tracking-tight">
              Engineering Excellence &amp; Local Operations
            </motion.h2>
            <motion.div variants={itemVariants} className="w-16 h-1 bg-brand-orange mx-auto mb-4"></motion.div>
            <motion.p variants={itemVariants} className="text-sm text-text-secondary">
              Everything you need to know about our turnkey project capabilities across Vijayawada, Eluru, and Andhra Pradesh.
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {localFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'border-brand-orange/60 bg-orange-50/20 shadow-md' : 'border-border-gray/80 bg-white hover:border-gray-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm md:text-base text-corporate-blue pr-2">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-brand-orange text-white' : 'bg-light-bg text-corporate-blue'
                    }`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easePremium }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-text-secondary leading-relaxed border-t border-orange-100/60 mt-1">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="py-24 bg-white overflow-hidden text-corporate-blue">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Get In Touch</motion.h2>
              <motion.div variants={itemVariants} className="w-16 h-1 bg-brand-orange mb-8"></motion.div>
              <motion.p variants={itemVariants} className="text-sm md:text-base text-text-secondary mb-10 leading-relaxed max-w-md">
                Partner with <strong>Jayarams Bharat</strong> for your next major engineering or infrastructure project. Our regional operations team is ready to deliver excellence.
              </motion.p>
              
              <motion.div variants={containerVariants} className="flex flex-col gap-8">
                {[
                  { icon: Building2, title: "Operations & Engineering Hub", desc: "Jayarams Bharat Corporate Hub,\nVijayawada – Eluru Corridor, Andhra Pradesh 520001" },
                  { icon: Zap, title: "Direct Contact Desk", desc: "Phone: +91 98765 43210\nEmail: info@jayaramsbharat.com" },
                  { icon: Briefcase, title: "Operational Hours", desc: "Monday - Saturday: 9:00 AM - 6:00 PM IST\nRapid On-Site Team: 24/7 Priority Support" }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="flex gap-5 items-start group cursor-default">
                    <div className="w-12 h-12 bg-light-bg rounded-full border border-border-gray flex items-center justify-center shrink-0 group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-colors duration-300">
                      <item.icon size={20} className="text-corporate-blue transform transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-text-secondary whitespace-pre-line group-hover:text-corporate-blue transition-colors">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: easePremium }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(11,46,115,0.08)] border border-border-gray/50 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-corporate-blue via-brand-orange to-corporate-blue transform origin-left transition-transform duration-1000 scale-x-0 group-hover:scale-x-100"></div>
              
              <h3 className="text-2xl font-black text-corporate-blue mb-8 tracking-tight flex items-center gap-3">
                Send an Inquiry
                <div className="h-px bg-border-gray flex-1 ml-4"></div>
              </h3>
              
              {homeSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-corporate-blue mb-2">Inquiry Submitted Successfully</h4>
                  <p className="text-sm text-text-secondary max-w-sm mb-6">
                    Thank you, <span className="font-semibold text-corporate-blue">{homeForm.fullName || 'Partner'}</span>. Your inquiry has been sent to our corporate operations desk.
                  </p>
                  <button
                    onClick={() => {
                      setHomeSubmitted(false);
                      setHomeForm({ fullName: '', phone: '', email: '', serviceRequired: '', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl border border-corporate-blue text-corporate-blue text-xs font-semibold hover:bg-corporate-blue hover:text-white transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleHomeSubmit} className="flex flex-col gap-6">
                  <div className="relative group/input">
                    <input 
                      type="text" 
                      id="fullname" 
                      required
                      value={homeForm.fullName}
                      onChange={(e) => setHomeForm({ ...homeForm, fullName: e.target.value })}
                      className="peer w-full px-0 py-3 text-sm bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-brand-orange text-corporate-blue transition-all duration-300 placeholder-transparent" 
                      placeholder="Full Name" 
                    />
                    <label htmlFor="fullname" className="absolute left-0 -top-3.5 text-xs font-bold text-text-secondary transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-orange">Full Name</label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group/input mt-4 md:mt-0">
                      <input 
                        type="tel" 
                        id="phone" 
                        required
                        value={homeForm.phone}
                        onChange={(e) => setHomeForm({ ...homeForm, phone: e.target.value })}
                        className="peer w-full px-0 py-3 text-sm bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-brand-orange text-corporate-blue transition-all duration-300 placeholder-transparent" 
                        placeholder="Phone Number" 
                      />
                      <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs font-bold text-text-secondary transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-orange">Phone Number</label>
                    </div>
                    <div className="relative group/input mt-4 md:mt-0">
                      <input 
                        type="email" 
                        id="email" 
                        required
                        value={homeForm.email}
                        onChange={(e) => setHomeForm({ ...homeForm, email: e.target.value })}
                        className="peer w-full px-0 py-3 text-sm bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-brand-orange text-corporate-blue transition-all duration-300 placeholder-transparent" 
                        placeholder="Email Address" 
                      />
                      <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs font-bold text-text-secondary transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-orange">Email Address</label>
                    </div>
                  </div>
                  
                  <div className="relative group/input mt-2">
                    <select 
                      value={homeForm.serviceRequired}
                      onChange={(e) => setHomeForm({ ...homeForm, serviceRequired: e.target.value })}
                      className="w-full px-0 py-3 text-sm bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-brand-orange text-corporate-blue transition-all duration-300 appearance-none font-medium"
                    >
                      <option value="" disabled hidden>Select Service Required</option>
                      <option value="Sustainability & Environmental Infrastructure">Sustainability & Environmental Infrastructure</option>
                      <option value="Renewable Energies (Solar EPC & EV)">Renewable Energies (Solar EPC & EV)</option>
                      <option value="Government Supplies & CSR">Government Supplies & CSR</option>
                      <option value="Network Integration & Security">Network Integration & Security</option>
                      <option value="Consultancy Services">Consultancy Services</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-brand-orange">
                      <ChevronRight size={16} className="rotate-90" />
                    </div>
                  </div>
                  
                  <div className="relative group/input mt-4">
                    <textarea 
                      id="message" 
                      rows="3" 
                      value={homeForm.message}
                      onChange={(e) => setHomeForm({ ...homeForm, message: e.target.value })}
                      className="peer w-full px-0 py-3 text-sm bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-brand-orange text-corporate-blue transition-all duration-300 resize-none placeholder-transparent" 
                      placeholder="Message"
                    ></textarea>
                    <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs font-bold text-text-secondary transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-orange">Briefly describe your project requirements...</label>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.01, boxShadow: "0 10px 25px -5px rgba(242, 106, 33, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmittingHome}
                    type="submit" 
                    className="w-full py-4 text-sm bg-gradient-to-r from-brand-orange to-orange-500 text-white font-bold rounded-xl mt-6 shadow-lg flex items-center justify-center gap-2 group/btn disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmittingHome ? 'Submitting...' : 'Submit Inquiry'}
                    <ArrowRight size={18} className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 7. Map Section (Updated with premium UI) */}
      <section className="bg-white pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easePremium }}
            className="h-[450px] w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(11,46,115,0.08)] border border-border-gray/50 relative group"
          >
            {/* Elegant overlay badge */}
            <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-4 transform transition-transform duration-500 hover:scale-105 cursor-default">
              <div className="w-12 h-12 bg-light-bg rounded-full flex items-center justify-center text-corporate-blue shadow-inner border border-border-gray/50">
                <Building2 size={22} className="text-brand-orange" />
              </div>
              <div>
                <h4 className="font-bold text-corporate-blue text-sm">Jayarams Bharat (jayarams-bharat)</h4>
                <p className="text-xs text-text-secondary">Vijayawada • Eluru • Rajahmundry • Andhra Pradesh</p>
                <span className="text-[10px] text-brand-orange font-semibold block mt-0.5">Rapid 1km – 50km Local Deployment Hub</span>
              </div>
            </div>
            
            <iframe 
              src="https://maps.google.com/maps?q=16.945139,81.065361&t=&z=17&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
              className="absolute inset-0"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
