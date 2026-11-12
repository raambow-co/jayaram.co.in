import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sun, Zap, BatteryCharging } from 'lucide-react';
import DivisionEnquiry from '../components/DivisionEnquiry';
import SEO from '../components/SEO';

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

const RenewableEnergies = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('solar');

  return (
    <div className="w-full pt-20">
      <SEO 
        title="Commercial Solar EPC & EV Charging Hubs | Vijayawada & Eluru"
        description="Turnkey Commercial Solar EPC, rooftop solar panels, high-power DC EV charging plazas, and net metering approvals across Vijayawada, Eluru, and Andhra Pradesh."
        keywords="Solar EPC Vijayawada, Solar EPC Eluru, Solar panel installation near Vijayawada, Commercial rooftop solar Andhra Pradesh, EV charging station contractor Eluru Vijayawada, Jayarams Bharat Solar, turnkey solar power plant Andhra Pradesh"
      />
      {/* Hero Section */}
      <section className="relative w-full h-[65vh] min-h-[500px] flex items-center bg-navy-blue overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy-blue via-navy-blue/85 to-transparent z-10"></div>
          <motion.img 
            src="/renewable-energies.webp" 
            alt="Renewable Energies - Solar EPC and EV Charging Infrastructure" 
            className="w-full h-full object-cover"
            animate={prefersReducedMotion ? {} : { y: ["0%", "-1%", "0%"] }}
            transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>

        {/* Top Right Animated Logo */}
        <div className="absolute top-12 right-6 md:right-12 z-30 group cursor-pointer hidden sm:block">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-dashed border-white/60 group-hover:border-brand-orange"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <img src="/logo.webp" className="w-16 h-16 object-contain" alt="Jayarams" />
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
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-orange text-xs font-bold tracking-widest uppercase mb-4">
              <Zap size={14} className="text-brand-orange animate-pulse" />
              Unified Clean Energy Solutions
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-lg tracking-tight">
              Renewable <br className="hidden sm:block"/>Energies
            </motion.h1>
            <motion.div variants={itemVariants} className="w-24 h-1.5 bg-brand-orange mb-6 shadow-[0_0_15px_rgba(255,102,0,0.5)]"></motion.div>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md leading-relaxed">
              Accelerating Andhra Pradesh's clean energy transition by delivering high-efficiency <strong>Commercial Solar EPC</strong> and <strong>DC Fast EV Charging Hubs</strong> across Vijayawada, Eluru, Rajahmundry, and national highway corridors.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Premium Stats Bar */}
      <section className="bg-corporate-blue border-t-4 border-brand-orange py-12 relative z-20 shadow-2xl">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/10">
            {[
              { label: "Solar Capacity Installed", value: "250+ MW" },
              { label: "EV Hubs Deployed", value: "500+" },
              { label: "Tons CO2 Offset", value: "75,000+" },
              { label: "Pan-India Presence", value: "20+ States" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-orange mb-2 drop-shadow-[0_0_15px_rgba(255,102,0,0.3)]">{stat.value}</div>
                <div className="text-white/80 text-xs md:text-sm uppercase tracking-widest font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Core Pillars Section (Interactive Tabs) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-corporate-blue mb-4 tracking-tight">Two Pillars of Sustainable Power</h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="text-text-secondary leading-relaxed">
              We seamlessly integrate clean power generation with zero-emission mobility. Explore how our engineering divisions lead both frontiers.
            </p>

            {/* Pillar Selector Buttons */}
            <div className="inline-flex p-1.5 bg-light-bg rounded-xl border border-border-gray mt-8 shadow-inner">
              <button
                onClick={() => setActiveTab('solar')}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'solar'
                    ? 'bg-corporate-blue text-white shadow-md'
                    : 'text-text-secondary hover:text-corporate-blue'
                }`}
              >
                <Sun size={18} className={activeTab === 'solar' ? 'text-brand-orange' : ''} />
                Solar EPC Solutions
              </button>
              <button
                onClick={() => setActiveTab('ev')}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'ev'
                    ? 'bg-corporate-blue text-white shadow-md'
                    : 'text-text-secondary hover:text-corporate-blue'
                }`}
              >
                <BatteryCharging size={18} className={activeTab === 'ev' ? 'text-brand-orange' : ''} />
                EV Charging Infrastructure
              </button>
            </div>
          </div>

          {/* Tab 1: Solar EPC Details */}
          {activeTab === 'solar' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easePremium }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-brand-orange mb-2 block">Pillar 01 — Generation</span>
                <h3 className="text-3xl font-bold text-corporate-blue mb-4">Commercial, Industrial & Utility Solar EPC</h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Our Solar EPC division specializes in the complete lifecycle of solar power plants. From precision geotechnical surveys and high-yield system designs to Tier-1 procurement and synchronized grid commissioning, we maximize efficiency and deliver high-yield energy assets.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'On-Grid & Utility-Scale Ground Arrays',
                    'Commercial & Industrial Rooftop Solar',
                    'Battery Energy Storage Systems (BESS)',
                    'Solar Microgrids & Rural Electrification',
                    'Solar Powered Agricultural Pumps',
                    'SCADA & Preventive Telemetry O&M'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-text-primary text-sm font-medium">
                      <CheckCircle2 className="text-brand-orange w-4 h-4 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <a href="#division-enquiry" className="inline-flex items-center gap-2 px-6 py-3 bg-corporate-blue text-white font-medium rounded hover:bg-navy-blue transition-colors shadow-md">
                  Request Solar Site Survey <ArrowRight size={16} />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/solar-jairam.webp" 
                  alt="Solar EPC Installation" 
                  className="w-full h-72 object-cover rounded-xl shadow-lg border border-border-gray/50" 
                />
                <img 
                  src="/renewable-energies.webp" 
                  alt="Utility Scale Solar & Clean Power" 
                  className="w-full h-72 object-cover rounded-xl shadow-lg border border-border-gray/50 mt-8" 
                />
              </div>
            </motion.div>
          )}

          {/* Tab 2: EV Infrastructure Details */}
          {activeTab === 'ev' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easePremium }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-brand-orange mb-2 block">Pillar 02 — Mobility</span>
                <h3 className="text-3xl font-bold text-corporate-blue mb-4">Electric Vehicle Charging Infrastructure</h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  We engineer high-capacity charging ecosystems that empower commercial fleets, transit corridors, and corporate parks. Combining smart grid load-balancing with ultra-fast DC chargers, our solutions offer maximum vehicle uptime and cloud-managed operations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'DC High-Power Fast Charging (60kW - 360kW)',
                    'Fleet Depot Smart Charging Architecture',
                    'National Highway Corridor Stations',
                    'Solar-Powered Carport EV Stations',
                    'OCPP-Compliant Cloud Management Software',
                    'Grid Transformer & Power Substation Setup'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-text-primary text-sm font-medium">
                      <CheckCircle2 className="text-brand-orange w-4 h-4 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <a href="#division-enquiry" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-medium rounded hover:bg-orange-600 transition-colors shadow-md">
                  Deploy EV Fleet Charging <ArrowRight size={16} />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000&auto=format&fit=crop" 
                  alt="EV Fast Charging Station" 
                  className="w-full h-72 object-cover rounded-xl shadow-lg border border-border-gray/50" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1558441719-74e54823a078?w=600&auto=format&fit=crop" 
                  alt="Electric Vehicle Integration" 
                  className="w-full h-72 object-cover rounded-xl shadow-lg border border-border-gray/50 mt-8" 
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Synergistic Energy Process */}
      <section className="py-24 bg-light-bg border-t border-border-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-corporate-blue mb-4">Integrated Execution Process</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="text-text-secondary">From feasibility modeling to full-scale operations and digital telemetry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Assessment & Feasibility", desc: "Solar irradiance modeling, EV grid power load analysis, and regulatory clearances." },
              { step: "02", title: "Engineering & Architecture", desc: "BOS design, single-line diagrams, civil foundation, and optimal equipment sizing." },
              { step: "03", title: "EPC Construction", desc: "Turnkey installation, structural engineering, grid synchronization, and safety testing." },
              { step: "04", title: "O&M & Telemetry", desc: "24/7 cloud SCADA monitoring, preventive upkeep, and performance ratio optimization." }
            ].map((process, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
                className="bg-white p-8 border border-border-gray relative rounded-xl group transition-shadow duration-300 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-1 bg-brand-orange transition-all duration-300 group-hover:w-full"></div>
                <span className="absolute -top-5 left-8 text-5xl font-bold text-light-bg transition-colors duration-300 group-hover:text-light-bg/80" style={{ WebkitTextStroke: '1px #E5E7EB' }}>{process.step}</span>
                <h3 className="text-xl font-bold text-corporate-blue mb-3 relative z-10 transform transition-transform duration-300 group-hover:-translate-y-0.5">{process.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed relative z-10">{process.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Division Enquiry Section */}
      <DivisionEnquiry
        divisionName="Renewable Energies"
        badge="Solar EPC & EV Infrastructure Desk"
        subtitle="Accelerate your transition to clean power. Inquire for turnkey Solar EPC power plants, commercial rooftop arrays, and ultra-fast EV fleet charging networks."
        divisionEmail="renewables@jayaramsbharat.com"
        divisionPhone="+91 98765 43210"
        scaleFieldLabel="Target Capacity (e.g. 100 kW, 5 MW, 10 EV Chargers)"
        slaText="Solar irradiance modeling, load feasibility study & quotation within 24-48 hours."
        services={[
          'Commercial & Industrial Rooftop Solar',
          'Utility-Scale Ground Mount Solar EPC',
          'Battery Energy Storage Systems (BESS)',
          'DC Fast Charging Hubs (Fleet & Depot)',
          'National Highway EV Corridors',
          'Solar Powered Agricultural Pumps & Microgrids'
        ]}
        highlights={[
          'Tier-1 Photovoltaic Modules & Smart Inverters',
          'Substation Setup & Grid Synchronization',
          '24/7 Cloud SCADA Telemetry & 25-Year Performance Warranty'
        ]}
      />
    </div>
  );
};

export default RenewableEnergies;
