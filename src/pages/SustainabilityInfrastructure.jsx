import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Leaf, Droplets, Recycle, Trees } from 'lucide-react';
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

const SustainabilityInfrastructure = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full pt-20">
      <SEO 
        title="Wastewater Treatment (STP/ETP/ZLD) & Bio-Mining | Vijayawada & Eluru"
        description="Turnkey industrial effluent treatment plants (ETP), sewage treatment plants (STP), zero liquid discharge (ZLD), and municipal legacy landfill bio-mining across Vijayawada, Eluru, and Andhra Pradesh."
        keywords="Wastewater treatment plant contractor Vijayawada, STP ETP plant installation Eluru, Legacy waste bio-mining Andhra Pradesh, Zero Liquid Discharge ZLD contractor, Jayarams Bharat environmental infrastructure"
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
            src="/sustainability-infra.webp" 
            alt="Sustainability and Environmental Infrastructure" 
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
              <Leaf size={14} className="text-green-400" />
              Green Civil & Ecological Engineering
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg tracking-tight">
              Sustainability & <br className="hidden sm:block"/>Environmental Infrastructure
            </motion.h1>
            <motion.div variants={itemVariants} className="w-24 h-1.5 bg-brand-orange mb-6 shadow-[0_0_15px_rgba(255,102,0,0.5)]"></motion.div>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md leading-relaxed">
              Engineering sustainable futures across Vijayawada, Eluru, and Andhra Pradesh through turnkey <strong>ETP/STP Wastewater Reclamation</strong>, <strong>Zero Liquid Discharge (ZLD)</strong>, and <strong>Municipal Landfill Bio-mining</strong>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Premium Stats Bar */}
      <section className="bg-corporate-blue border-t-4 border-brand-orange py-12 relative z-20 shadow-2xl">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/10">
            {[
              { label: "Water Treated & Recycled", value: "100+ MLD" },
              { label: "Green Projects Delivered", value: "80+" },
              { label: "Waste Diverted from Landfill", value: "120K Tons" },
              { label: "CPCB / SPCB Norms", value: "100% Compliant" },
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

      {/* Overview & Key Pillars */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <span className="text-xs uppercase font-extrabold tracking-widest text-brand-orange mb-2 block">Ecological Engineering</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-corporate-blue mb-4">Building Climate-Resilient Infrastructure</h2>
              <div className="w-16 h-1 bg-brand-orange mb-6"></div>
              <p className="text-text-secondary leading-relaxed mb-6">
                Rapid urbanization and industrialization demand forward-thinking environmental solutions. Our Sustainability and Environmental Infrastructure division builds closed-loop, sustainable ecosystems that conserve water, process waste responsibly, and adhere to the highest national environmental benchmarks.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                From municipal-scale water reclamation plants to corporate net-zero masterplans, we provide turnkey civil engineering, technological integration, and environmental compliance support.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  'Sewage & Effluent Treatment (STP/ETP)',
                  'Zero Liquid Discharge (ZLD) Systems',
                  'Scientific Solid Waste Processing',
                  'Rainwater Harvesting & Ground Recharge',
                  'Biomethanation & Waste-to-Energy',
                  'Urban Micro-Forests & Ecological Parks'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-text-primary text-sm font-medium">
                    <CheckCircle2 className="text-brand-orange w-4 h-4 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a href="#division-enquiry" className="inline-flex items-center gap-2 px-6 py-3 bg-corporate-blue text-white font-medium rounded hover:bg-navy-blue transition-colors shadow-md">
                Request Environmental Audit <ArrowRight size={16} />
              </a>
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
                src="/sustainability-infra.webp" 
                alt="Environmental Hub" 
                className="w-full h-72 object-cover rounded-xl shadow-lg border border-border-gray/50" 
              />
              <motion.img 
                variants={itemVariants}
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop" 
                alt="Green Water Conservation Project" 
                className="w-full h-72 object-cover rounded-xl shadow-lg border border-border-gray/50 mt-8" 
              />
            </motion.div>
          </div>

          {/* 4 Core Practice Areas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: Droplets,
                title: "Water & Effluent Stewardship",
                desc: "High-recovery STP, ETP, and ultrafiltration plants ensuring that 100% of wastewater is reclaimed for reuse, protecting local water tables."
              },
              {
                icon: Recycle,
                title: "Circular Waste Management",
                desc: "Material recovery facilities, aerobic composting, and decentralized biomethanation plants transforming municipal organic waste into bio-gas and organic fertilizer."
              },
              {
                icon: Trees,
                title: "Green Infrastructure & Bio-Works",
                desc: "Bio-swales, green buffer zones, storm-water catchment basins, and sustainable construction techniques that mitigate urban heat islands."
              }
            ].map((pillar, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-light-bg border border-border-gray hover:border-brand-orange/40 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-corporate-blue text-white flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors">
                  <pillar.icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-corporate-blue mb-3">{pillar.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable Execution Protocol */}
      <section className="py-24 bg-light-bg border-t border-border-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-corporate-blue mb-4">Our Environmental Protocol</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="text-text-secondary">Science-backed methodology ensuring flawless compliance and measurable ecological impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "EIA & Baseline Audit", desc: "Water quality analysis, carbon mapping, and comprehensive environmental impact assessment." },
              { step: "02", title: "Ecological Engineering", desc: "Closed-loop system architecture designed for minimum energy use and maximum resource recovery." },
              { step: "03", title: "Civil & Plant EPC", desc: "Rigorous execution with certified non-toxic materials, robust civil construction, and sensor instrumentation." },
              { step: "04", title: "Continuous Monitoring", desc: "IoT environmental sensors, automated water testing, and compliance documentation for regulatory agencies." }
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
        divisionName="Sustainability & Environmental Infrastructure"
        badge="Ecological & Water Infrastructure Desk"
        subtitle="Connect directly with our environmental engineers for turnkey water stewardship, effluent treatment, waste-to-resource recovery, and green civil works."
        divisionEmail="sustainability@jayaramsbharat.com"
        divisionPhone="+91 98765 43210"
        scaleFieldLabel="Target Capacity / Area (e.g. 5 MLD, 40 Acres)"
        slaText="Environmental baseline review & preliminary engineering scope within 24-48 hours."
        services={[
          'Sewage & Effluent Treatment (STP/ETP)',
          'Zero Liquid Discharge (ZLD) Systems',
          'Scientific Solid Waste Processing & MRF',
          'Industrial Rainwater Harvesting & Aquifer Recharge',
          'Biomethanation & Waste-to-Energy Plants',
          'Urban Micro-Forests & Ecological Civil Works'
        ]}
        highlights={[
          '100% CPCB / SPCB Regulatory Compliance',
          'Zero Liquid Discharge (ZLD) Engineering',
          'Turnkey Civil, Mechanical & Sensor Integration'
        ]}
      />
    </div>
  );
};

export default SustainabilityInfrastructure;
