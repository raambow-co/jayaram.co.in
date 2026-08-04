import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const easePremium = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
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

const SolarEPC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center bg-navy-blue overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-navy-blue/80 mix-blend-multiply z-10"></div>
          <motion.img 
            src="/solar-jairam.jpeg" 
            alt="Solar EPC Solutions" 
            className="w-full h-full object-cover"
            animate={prefersReducedMotion ? {} : { y: ["0%", "-1%", "0%"] }}
            transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
        {/* Top Right Animated Logo */}
        <div className="absolute top-12 right-6 md:right-12 z-30 group cursor-pointer">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-dashed border-white/60 group-hover:border-brand-orange"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <img src="/logo.png" className="w-16 h-16 object-contain" alt="Jayarams" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <motion.div 
            className="max-w-3xl pt-16 md:pt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-lg tracking-tight">
              Solar EPC <br/>Solutions
            </motion.h1>
            <motion.div variants={itemVariants} className="w-24 h-1.5 bg-brand-orange mb-6 shadow-[0_0_15px_rgba(255,102,0,0.5)]"></motion.div>
            <motion.p variants={itemVariants} className="text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md">
              End-to-end solar power plant design, procurement, and construction for commercial, industrial, and government sectors.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Premium Stats Bar */}
      <section className="bg-corporate-blue border-t-4 border-brand-orange py-12 relative z-20 shadow-2xl">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/10">
            {[
              { label: "Projects Completed", value: "200+" },
              { label: "Tons of CO2 Reduced", value: "50,000+" },
              { label: "Happy Customers", value: "600+" },
              { label: "National Presence", value: "Pan-India" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-orange mb-2 drop-shadow-[0_0_15px_rgba(255,102,0,0.3)]">{stat.value}</div>
                <div className="text-white/80 text-xs md:text-sm uppercase tracking-widest font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview & Services */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-bold text-corporate-blue mb-4">Empowering India with Clean Energy</motion.h2>
              <motion.div variants={itemVariants} className="w-16 h-1 bg-brand-orange mb-6"></motion.div>
              <motion.p variants={itemVariants} className="text-text-secondary leading-relaxed mb-6">
                Our Solar EPC division specializes in the complete lifecycle of solar energy projects. We provide turnkey solutions that ensure maximum efficiency, optimal energy generation, and long-term reliability. From initial site assessment to final commissioning, our engineering excellence guarantees a seamless transition to renewable energy.
              </motion.p>
              <motion.ul variants={containerVariants} className="flex flex-col gap-3 mb-8">
                {['On-Grid & Off-Grid Systems', 'Hybrid Solar Solutions', 'Rooftop & Ground Mounted Projects', 'Solar Water Heaters & Pumps', 'Solar Street Lighting Infrastructure'].map((item, i) => (
                  <motion.li key={i} variants={itemVariants} className="flex items-center gap-3 text-text-primary font-medium">
                    <CheckCircle2 className="text-brand-orange w-5 h-5" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={itemVariants}>
                <Link to="/contact" className="group inline-flex items-center gap-2 px-6 py-3 bg-corporate-blue text-white font-medium rounded hover:bg-navy-blue transition-colors duration-300 shadow-md hover:shadow-lg active:scale-[0.98]">
                  Request a Consultation <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.img 
                variants={itemVariants}
                src="https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=500&auto=format&fit=crop" 
                alt="Solar Panels" 
                className="w-full h-64 object-cover rounded-sm shadow-md" 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: easePremium }}
              />
              <motion.img 
                variants={itemVariants}
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=500&auto=format&fit=crop" 
                alt="Solar Installation" 
                className="w-full h-64 object-cover rounded-sm shadow-md mt-8" 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: easePremium }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-light-bg">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-corporate-blue mb-4">Our EPC Process</motion.h2>
            <motion.div variants={itemVariants} className="w-24 h-1 bg-brand-orange mx-auto mb-6"></motion.div>
            <motion.p variants={itemVariants} className="text-text-secondary max-w-2xl mx-auto">A systematic, engineering-first approach to delivering high-performance solar assets.</motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { step: "01", title: "Engineering & Design", desc: "Site survey, feasibility analysis, and optimal system design." },
              { step: "02", title: "Procurement", desc: "Sourcing Tier-1 panels, inverters, and BOS components." },
              { step: "03", title: "Construction", desc: "Expert installation following strict safety and quality standards." },
              { step: "04", title: "O&M", desc: "Commissioning, monitoring, and ongoing maintenance." }
            ].map((process, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
                className="bg-white p-8 border border-border-gray relative rounded-sm group transition-shadow duration-300 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-1 bg-brand-orange transition-all duration-300 group-hover:w-full"></div>
                <span className="absolute -top-5 left-8 text-5xl font-bold text-light-bg transition-colors duration-300 group-hover:text-light-bg/80" style={{ WebkitTextStroke: '1px #E5E7EB' }}>{process.step}</span>
                <h3 className="text-xl font-bold text-corporate-blue mb-3 relative z-10 transform transition-transform duration-300 group-hover:-translate-y-0.5">{process.title}</h3>
                <p className="text-text-secondary relative z-10">{process.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SolarEPC;
