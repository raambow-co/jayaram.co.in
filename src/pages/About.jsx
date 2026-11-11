import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Leaf, 
  Zap, 
  Landmark, 
  Network, 
  Briefcase,
  Users,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const easePremium = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easePremium }
  }
};

const DIVISIONS = [
  {
    name: 'Sustainability & Environmental Infrastructure',
    icon: Leaf,
    image: '/sustainability-infra.webp',
    desc: 'Ecological bio-mining, effluent treatment, zero liquid discharge, and climate-resilient water infrastructure.',
    link: '/sustainability-environmental-infrastructure'
  },
  {
    name: 'Renewable Energies',
    icon: Zap,
    image: '/renewable-energies.webp',
    desc: 'Commercial & utility-scale Solar EPC, rooftop PV arrays, high-power DC EV charging plazas, and microgrid systems.',
    link: '/renewable-energies'
  },
  {
    name: 'Government Supplies & CSR',
    icon: Landmark,
    image: '/government-supplies.webp',
    desc: 'GeM verified institutional procurement, municipal civil machinery, disaster rapid response gear, and public works.',
    link: '/government-supplies'
  },
  {
    name: 'Network Integration',
    icon: Network,
    image: '/network-integration.webp',
    desc: 'Turnkey optical fiber backbones, AI CCTV surveillance, Smart City Command Centers (ICCC), and enterprise data links.',
    link: '/network-integration'
  },
  {
    name: 'Consultancy Services',
    icon: Briefcase,
    image: '/solar-jairam.webp',
    desc: 'Detailed Project Reports (DPR), EIA statutory clearances, techno-commercial feasibility, and project PMO.',
    link: '/consultancy-services'
  }
];

const About = () => {
  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="relative w-full py-24 bg-navy-blue text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              className="lg:col-span-7"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-orange text-xs font-bold tracking-widest uppercase mb-4">
                <Sparkles size={14} className="text-brand-orange" />
                Corporate Overview
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                Engineering India's <br className="hidden sm:block"/>Next-Generation Infrastructure
              </motion.h1>
              <motion.div variants={itemVariants} className="w-20 h-1.5 bg-brand-orange mb-6 shadow-[0_0_15px_rgba(255,102,0,0.5)]"></motion.div>
              <motion.p variants={itemVariants} className="text-base md:text-lg text-blue-100/90 leading-relaxed max-w-2xl mb-8">
                Jayarams Bharat Private Limited is a multidisciplinary engineering and turnkey infrastructure conglomerate delivering high-impact projects across renewable energies, ecological civil engineering, institutional public supplies, and intelligent telecom surveillance.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to="/projects" className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold rounded-xl shadow-md transition-all inline-flex items-center gap-2">
                  <span>Explore Executed Projects</span>
                  <ArrowRight size={14} />
                </Link>
                <Link to="/contact" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all">
                  Contact Corporate HQ
                </Link>
              </motion.div>
            </motion.div>

            {/* Official Logo Lockup Showcase */}
            <motion.div 
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: easePremium }}
            >
              <div className="relative p-8 bg-white/95 rounded-3xl border border-white/30 shadow-2xl flex flex-col items-center text-center max-w-md w-full">
                <div className="w-32 h-32 flex items-center justify-center p-2 rounded-2xl bg-slate-50 border border-border-gray mb-4">
                  <img src="/jayarams-logo-lockup.webp" alt="Jayarams Bharat" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-bold text-corporate-blue">Jayarams Bharat Private Limited</h3>
                <p className="text-xs text-brand-orange font-semibold tracking-wider uppercase mt-1">
                  Building India's Future Through Engineering Excellence
                </p>
                <div className="mt-4 pt-4 border-t border-border-gray/70 w-full flex items-center justify-around text-xs text-text-muted">
                  <span className="flex items-center gap-1 font-semibold text-text-primary">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    GeM &amp; ISO Compliant
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-text-primary">
                    <MapPin size={14} className="text-brand-orange" />
                    Hyderabad HQ
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Pillars */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-corporate-blue tracking-tight mb-4">
              Our Vision, Mission &amp; Guiding Values
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              Founded on the bedrock of uncompromising engineering precision, institutional compliance, and sustainable national progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-light-bg border border-border-gray space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-corporate-blue flex items-center justify-center">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-corporate-blue">Our Vision</h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                To stand as India's premier engineering partner for complex civil, clean energy, and smart surveillance infrastructure, setting global benchmarks in turnaround speed, quality, and statutory compliance.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-light-bg border border-border-gray space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-corporate-blue">Our Mission</h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                To empower government bodies, municipal corporations, and industrial enterprises by delivering turnkey EPC execution, transparent supply chain procurement, and sustainable ecological infrastructure.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-light-bg border border-border-gray space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-corporate-blue">Core Values</h3>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                Uncompromising integrity, environmental stewardship, safety-first operational culture, and technological innovation converge across every project we undertake.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Divisions Overview */}
      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-corporate-blue tracking-tight mb-4">
              Five Specialized Engineering Divisions
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed">
              Unified cross-division expertise that allows Jayarams Bharat to deliver complex multidisciplinary projects under single-window accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DIVISIONS.map((div, i) => {
              const Icon = div.icon;
              return (
                <div key={i} className="bg-white rounded-3xl border border-border-gray overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="h-48 w-full relative overflow-hidden">
                    <img src={div.image} alt={div.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-corporate-blue shadow-md">
                      <Icon size={20} />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-corporate-blue mb-2 group-hover:text-brand-orange transition-colors">
                        {div.name}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {div.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-gray/70">
                      <Link to={div.link} className="text-xs font-bold text-corporate-blue group-hover:text-brand-orange inline-flex items-center gap-1 transition-colors">
                        <span>Explore Division</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
