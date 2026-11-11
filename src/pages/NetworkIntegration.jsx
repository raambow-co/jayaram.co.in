import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Network, Server, Eye } from 'lucide-react';
import DivisionEnquiry from '../components/DivisionEnquiry';

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

const NetworkIntegration = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full pt-20">
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
            src="/network-integration.webp" 
            alt="Network Integration and Intelligent Surveillance" 
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
              <Network size={14} className="text-brand-orange" />
              IT, Telecom & Smart Surveillance
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-lg tracking-tight">
              Network <br className="hidden sm:block"/>Integration
            </motion.h1>
            <motion.div variants={itemVariants} className="w-24 h-1.5 bg-brand-orange mb-6 shadow-[0_0_15px_rgba(255,102,0,0.5)]"></motion.div>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl drop-shadow-md leading-relaxed">
              Architecting secure digital backbones, AI-driven CCTV surveillance networks, command control centers, and high-performance telecom infrastructure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Premium Stats Bar */}
      <section className="bg-corporate-blue border-t-4 border-brand-orange py-12 relative z-20 shadow-2xl">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/10">
            {[
              { label: "Connected Network Nodes", value: "15,000+" },
              { label: "Command Centers (ICCC)", value: "50+" },
              { label: "Fiber Backbones Laid", value: "2,500+ KM" },
              { label: "Network Uptime SLA", value: "99.99%" },
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
              <span className="text-xs uppercase font-extrabold tracking-widest text-brand-orange mb-2 block">Converged Systems Architecture</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-corporate-blue mb-4">Enterprise Networking & Intelligent Security</h2>
              <div className="w-16 h-1 bg-brand-orange mb-6"></div>
              <p className="text-text-secondary leading-relaxed mb-6">
                Our Network Integration division engineers fail-safe communication arteries for smart cities, government establishments, critical infrastructure, and large industrial plants. We fuse gigabit optical networking with enterprise IP video surveillance, unified command centers, and multi-tier access control.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                From structured fiber cabling to edge AI video analytics, our end-to-end integration ensures zero latency, impenetrable cybersecurity, and uncompromised real-time visibility.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  'Optical Fiber & Structured Cabling',
                  'IP CCTV Surveillance & AI Analytics',
                  'Integrated Command Centers (ICCC/NOC)',
                  'Biometric & RFID Access Control',
                  'Core Switching, Routing & Firewalls',
                  'Data Center Racks & Smart PDUs'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-text-primary text-sm font-medium">
                    <CheckCircle2 className="text-brand-orange w-4 h-4 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a href="#division-enquiry" className="inline-flex items-center gap-2 px-6 py-3 bg-corporate-blue text-white font-medium rounded hover:bg-navy-blue transition-colors shadow-md">
                Request Network Architecture Audit <ArrowRight size={16} />
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
                src="/network-integration.webp" 
                alt="Command Center & Server Racks" 
                className="w-full h-72 object-cover rounded-xl shadow-lg border border-border-gray/50" 
              />
              <motion.img 
                variants={itemVariants}
                src="/cctv.webp" 
                alt="Intelligent CCTV & AI Surveillance" 
                className="w-full h-72 object-cover rounded-xl shadow-lg border border-border-gray/50 mt-8" 
              />
            </motion.div>
          </div>

          {/* 3 Core Focus Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: Network,
                title: "Optical & LAN Infrastructure",
                desc: "High-density structured cabling, single/multi-mode fiber backbones, industrial switches, and redundant network paths engineered for 99.99% availability."
              },
              {
                icon: Eye,
                title: "Smart AI-Powered Surveillance",
                desc: "4K ultra-low-light IP cameras, automated number plate recognition (ANPR), facial recognition, perimeter intrusion alerts, and cloud VMS integration."
              },
              {
                icon: Server,
                title: "Command & Control Centers (ICCC)",
                desc: "Turnkey video wall displays, operator console desks, environmental sensors, unified SCADA/surveillance feeds, and incident management dispatch systems."
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

      {/* Integration Protocol */}
      <section className="py-24 bg-light-bg border-t border-border-gray">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-corporate-blue mb-4">Our Integration Protocol</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="text-text-secondary">A fail-safe methodology for designing and commissioning mission-critical communications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Comprehensive Audit", desc: "Assessing data bandwidth, coverage blindspots, perimeter vulnerabilities, and physical cabling routes." },
              { step: "02", title: "Topology Architecture", desc: "Designing hierarchical network layers, VLANs, firewall zones, and video retention storage sizing." },
              { step: "03", title: "Precision Deployment", desc: "Fiber fusion splicing, cable tray installation, rack dressing, switch provisioning, and camera calibration." },
              { step: "04", title: "Testing & 24/7 SLA", desc: "OTDR fiber validation, packet loss stress testing, operator training, and continuous AMC maintenance." }
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
        divisionName="Network Integration"
        badge="Enterprise Network & Security Desk"
        subtitle="Engage our certified network architects for gigabit optical backbones, enterprise IP surveillance, command centers, and converged IT infrastructure."
        divisionEmail="networks@jayaramsbharat.com"
        divisionPhone="+91 98765 43210"
        scaleFieldLabel="Target Endpoints / Cameras / Square Footage"
        slaText="Topology draft, security survey & bill of materials (BoM) within 24-48 hours."
        services={[
          'Optical Fiber Backbone & Structured Cabling',
          'IP CCTV Surveillance & AI Analytics (ANPR/Face)',
          'Integrated Command & Control Centers (ICCC / NOC)',
          'Biometric & Multi-Tier Access Control Systems',
          'Data Center Server Racks, Smart PDU & Cooling',
          'Enterprise Core Switching, Routing & Firewalls'
        ]}
        highlights={[
          '99.99% Network Uptime Engineering',
          'Enterprise Tier-1 OEM Partnerships',
          '24/7 Monitoring & AMC Technical Support'
        ]}
      />
    </div>
  );
};

export default NetworkIntegration;
