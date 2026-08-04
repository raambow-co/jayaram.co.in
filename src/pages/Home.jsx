import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Zap, Building2, Landmark, ShieldCheck, Briefcase, Quote, Star, ChevronRight } from 'lucide-react';
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

const testimonials = [
  { text: "Jayarams Bharat executed our 5MW solar installation with exceptional precision. Their engineering team is top-tier.", author: "Rajesh Kumar", role: "Director, TechPark Solutions" },
  { text: "The EV infrastructure deployed by them across our fleet hubs has been flawless and highly reliable.", author: "Anjali Desai", role: "VP Operations, EcoTransit" },
  { text: "Unmatched expertise in government tenders. They delivered our command center project ahead of schedule.", author: "Vikram Singh", role: "Chief Engineer, State Infra" },
  { text: "Their CC Securities division completely overhauled our enterprise surveillance. Highly professional.", author: "Priya Sharma", role: "Head of Security, Nexus Corp" },
  { text: "Strategic consultancy that actually delivers. They navigated complex regulatory approvals effortlessly.", author: "Amit Patel", role: "Managing Partner, BuildRight" },
];

const featuredProjects = [
  "/solar-jairam.jpeg",
  "/cctv.jpeg",
  "/government-supplies.jpeg",
  "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
];

const Home = () => {
  const prefersReducedMotion = useReducedMotion();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

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
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex items-center bg-white pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0B2E73 1px, transparent 1px), linear-gradient(90deg, #0B2E73 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl order-2 lg:order-1">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-4">
                <motion.span variants={itemVariants} className="inline-block py-1 px-3 rounded-full bg-light-bg text-corporate-blue text-xs font-bold tracking-widest uppercase mb-4 border border-border-gray">
                  National Level Infrastructure
                </motion.span>
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-corporate-blue leading-[1.2] mb-10 tracking-tight"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.span variants={itemVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-corporate-blue to-navy-blue pb-2">Building India's Future</motion.span>
                <motion.span variants={itemVariants} className="block">Through Engineering Excellence</motion.span>
              </motion.h1>
              
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
                  <Link 
                    to="/contact" 
                    className="block px-8 py-3.5 bg-white border-2 border-border-gray text-text-primary text-sm font-semibold rounded-full hover:border-corporate-blue hover:text-corporate-blue transition-all duration-300 text-center active:scale-[0.98]"
                  >
                    Contact Us
                  </Link>
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
            className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {[
              { name: "Solar EPC", icon: Zap, link: "/solar-epc", desc: "End-to-end solar power plant design & construction.", img: "/solar-jairam.jpeg", span: "md:col-span-7" },
              { name: "EV Infrastructure", icon: Zap, link: "/ev-infrastructure", desc: "Nationwide electric vehicle charging networks.", img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop", span: "md:col-span-5" },
              { name: "Government Supplies", icon: Landmark, link: "/government-supplies", desc: "Institutional procurement and execution.", img: "/government-supplies.jpeg", span: "md:col-span-4" },
              { name: "CC Securities", icon: ShieldCheck, link: "/cc-securities", desc: "Enterprise-grade surveillance systems.", img: "/cctv.jpeg", span: "md:col-span-4" },
              { name: "Consultancy Services", icon: Briefcase, link: "/consultancy-services", desc: "Technical feasibility and project management.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop", span: "md:col-span-4" }
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
                      <img src="/logo.png" className="w-10 h-10 object-contain" alt="Jayarams" />
                    </div>
                  </div>

                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/30 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-orange group-hover:border-brand-orange">
                      <division.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight drop-shadow-md">{division.name}</h3>
                    <p className="text-white/90 text-sm max-w-sm mb-4 line-clamp-2 drop-shadow-sm">{division.desc}</p>
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
          {featuredProjects.map((img, index) => {
            const offset = (index - activeIndex + featuredProjects.length) % featuredProjects.length;
            const isCenter = offset === 0;
            const isLeft = offset === featuredProjects.length - 1;
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
                <img src={img} alt="Project" className="w-full h-full object-cover" />
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 z-20">
                    <h3 className="text-white text-2xl font-bold mb-2">Project {index + 1}</h3>
                    <p className="text-white/80 text-sm">Executing national infrastructure at scale.</p>
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
        
        <div className="relative flex overflow-x-hidden w-full group py-8">
          <motion.div 
            className="flex whitespace-nowrap gap-8 px-4 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {/* Double the array for seamless infinite scroll */}
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div key={idx} className="w-[300px] md:w-[350px] bg-white p-6 rounded-2xl border border-transparent hover:border-brand-orange/20 shrink-0 whitespace-normal flex flex-col relative overflow-hidden group/card shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transform hover:-translate-y-2 transition-all duration-500 cursor-default">
                
                {/* Huge Watermark Quote */}
                <Quote className="absolute -top-3 -left-3 w-20 h-20 text-light-bg -z-10 opacity-70 rotate-180 transform transition-transform duration-500 group-hover/card:scale-110" />

                {/* Top Bar: Stars & Badge */}
                <div className="flex justify-between items-start mb-4 z-10">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 bg-light-bg px-2.5 py-1 rounded-full border border-border-gray">
                    <span className="text-[9px] font-bold text-corporate-blue uppercase tracking-wider">Verified</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-text-primary text-sm leading-relaxed mb-6 flex-grow z-10 font-medium">"{t.text}"</p>
                
                {/* Bottom Bar: Author Profile */}
                <div className="flex items-center justify-between z-10 mt-auto pt-4 border-t border-light-bg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-light-bg rounded-full flex items-center justify-center text-corporate-blue font-bold text-lg shadow-sm border border-border-gray">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-corporate-blue text-xs md:text-sm">{t.author}</h4>
                      <p className="text-[10px] text-text-secondary uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-brand-orange/10 flex items-center justify-center group-hover/card:bg-brand-orange transition-colors duration-300">
                    <ChevronRight className="w-3 h-3 text-brand-orange group-hover/card:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
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
                Partner with us for your next major engineering or infrastructure project. Our team of experts is ready to deliver excellence.
              </motion.p>
              
              <motion.div variants={containerVariants} className="flex flex-col gap-8">
                {[
                  { icon: Building2, title: "Corporate Office", desc: "123 Corporate Tower, Financial District,\nHyderabad, Telangana 500032" },
                  { icon: Zap, title: "Contact Details", desc: "Phone: +91 98765 43210\nEmail: info@jayaramsbharat.com" },
                  { icon: Briefcase, title: "Working Hours", desc: "Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed" }
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
              
              <form className="flex flex-col gap-6">
                <div className="relative group/input">
                  <input type="text" id="fullname" className="peer w-full px-0 py-3 text-sm bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-brand-orange text-corporate-blue transition-all duration-300 placeholder-transparent" placeholder="Full Name" />
                  <label htmlFor="fullname" className="absolute left-0 -top-3.5 text-xs font-bold text-text-secondary transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-orange">Full Name</label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group/input mt-4 md:mt-0">
                    <input type="tel" id="phone" className="peer w-full px-0 py-3 text-sm bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-brand-orange text-corporate-blue transition-all duration-300 placeholder-transparent" placeholder="Phone Number" />
                    <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs font-bold text-text-secondary transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-orange">Phone Number</label>
                  </div>
                  <div className="relative group/input mt-4 md:mt-0">
                    <input type="email" id="email" className="peer w-full px-0 py-3 text-sm bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-brand-orange text-corporate-blue transition-all duration-300 placeholder-transparent" placeholder="Email Address" />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs font-bold text-text-secondary transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-orange">Email Address</label>
                  </div>
                </div>
                
                <div className="relative group/input mt-2">
                  <select className="w-full px-0 py-3 text-sm bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-brand-orange text-corporate-blue transition-all duration-300 appearance-none font-medium">
                    <option value="" disabled selected hidden>Select Service Required</option>
                    <option>Solar EPC Solutions</option>
                    <option>EV Infrastructure</option>
                    <option>Government Supplies & CSR</option>
                    <option>CC Securities</option>
                    <option>Consultancy Services</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-brand-orange">
                    <ChevronRight size={16} className="rotate-90" />
                  </div>
                </div>
                
                <div className="relative group/input mt-4">
                  <textarea id="message" rows="3" className="peer w-full px-0 py-3 text-sm bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-brand-orange text-corporate-blue transition-all duration-300 resize-none placeholder-transparent" placeholder="Message"></textarea>
                  <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs font-bold text-text-secondary transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-orange">Briefly describe your project requirements...</label>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.01, boxShadow: "0 10px 25px -5px rgba(242, 106, 33, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full py-4 text-sm bg-gradient-to-r from-brand-orange to-orange-500 text-white font-bold rounded-xl mt-6 shadow-lg flex items-center justify-center gap-2 group/btn"
                >
                  Submit Inquiry
                  <ArrowRight size={18} className="transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                </motion.button>
              </form>
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
            <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-white/60 flex items-center gap-4 transform transition-transform duration-500 hover:scale-105 cursor-default">
              <div className="w-12 h-12 bg-light-bg rounded-full flex items-center justify-center text-corporate-blue shadow-inner border border-border-gray/50">
                <Building2 size={22} />
              </div>
              <div>
                <h4 className="font-bold text-corporate-blue text-sm">Jayarams Corporate Office</h4>
                <p className="text-xs text-text-secondary">Rajahmundry, Andhra Pradesh</p>
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
