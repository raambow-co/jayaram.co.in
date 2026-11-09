import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToProjects } from '../services/projectService';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Leaf, 
  Zap, 
  Landmark, 
  Network, 
  Briefcase, 
  CheckCircle2, 
  Eye, 
  Layers,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const easePremium = [0.16, 1, 0.3, 1];

const ALL_PROJECTS = [
  {
    id: 'PRJ-SEI-01',
    title: 'Closed-Loop Wastewater Reclamation & Eco-Infrastructure',
    division: 'Sustainability & Environmental Infrastructure',
    divisionId: 'sustainability',
    category: 'Sustainability',
    imageUrl: '/sustainability-infra.jpg',
    location: 'Industrial & Municipal Corridors, India',
    scale: '100+ MLD Treatment & Reclamation',
    client: 'Municipal & Industrial Authorities',
    status: 'Delivered',
    summary: 'Turnkey ecological engineering featuring biological waste treatment, legacy landfill reclamation, effluent treatment plants (ETP/STP), and climate-resilient water stewardship systems.',
    specs: [
      'Zero Liquid Discharge (ZLD) Compliance',
      'Advanced MBBR & Biological Nutrient Removal',
      'Continuous Remote Effluent Telemetry',
      'Full CPCB / SPCB Mandate Adherence'
    ],
    themeColor: '#059669',
    bgColor: '#ECFDF5'
  },
  {
    id: 'PRJ-REN-01',
    title: 'Commercial & Utility Solar EPC Grid Systems',
    division: 'Renewable Energies',
    divisionId: 'renewable',
    category: 'Renewable',
    imageUrl: '/renewable-energies.jpg',
    location: 'National Highway & Commercial Corridors',
    scale: 'Multi-Megawatt Utility Array EPC',
    client: 'Clean Energy & Industrial Discoms',
    status: 'Delivered',
    summary: 'High-efficiency Solar EPC deployment utilizing tier-1 TOPCon bifacial modules, single-axis tracker synchronization, and dedicated high-voltage evacuation transformer substations.',
    specs: [
      'Tier-1 Bifacial PV Modules',
      'Central & String Inverter Station Architecture',
      'SCADA Cloud Telemetry with Real-Time Yield Monitoring',
      'Complete Discom Net-Metering Clearance'
    ],
    themeColor: '#F26A21',
    bgColor: '#FFF7ED'
  },
  {
    id: 'PRJ-REN-02',
    title: 'Commercial Solar Canopy & High-Power EV Charging Hub',
    division: 'Renewable Energies',
    divisionId: 'renewable',
    category: 'Renewable',
    imageUrl: '/solar-jairam.jpeg',
    location: 'Transit Corridors & Corporate Plazas',
    scale: 'Ultra-Fast Dual-Gun DC Plazas',
    client: 'Highway Amenities & Fleet Operators',
    status: 'Active Execution',
    summary: 'Dual-purpose solar carport arrays directly powering high-throughput Electric Vehicle (EV) fast-charging hubs with intelligent load balancing and grid peak-shaving.',
    specs: [
      '60kW - 360kW DC Ultra-Fast CCS-2 Guns',
      'Solar Canopy Integration with Microgrid Logic',
      'OCPP 2.0.1 Cloud CMS & Automated Billing',
      '24/7 Redundant Power Architecture'
    ],
    themeColor: '#F26A21',
    bgColor: '#FFF7ED'
  },
  {
    id: 'PRJ-GVS-01',
    title: 'Government Supplies, Emergency Gear & Heavy Machinery',
    division: 'Government Supplies',
    divisionId: 'government',
    category: 'Government',
    imageUrl: '/government-supplies.jpeg',
    location: 'State & Central Public Sector Bases',
    scale: 'Institutional Procurement Contracts',
    client: 'Central & State Government Entities',
    status: 'Delivered',
    summary: 'Mission-critical institutional procurement executed through the GeM portal, including municipal civil equipment, hydraulic disaster recovery machinery, and specialized defense logistics.',
    specs: [
      'GeM Direct Purchase & Custom Bid Compliance',
      'ISO 9001 Quality Assured Supply Chains',
      'Heavy Rescue & Hydraulic Intervention Gear',
      'Rigorous Factory Pre-Dispatch Inspection (PDI)'
    ],
    themeColor: '#0B2E73',
    bgColor: '#EFF6FF'
  },
  {
    id: 'PRJ-NET-01',
    title: 'Optical Fiber Backbone & Smart Command Hub (ICCC)',
    division: 'Network Integration',
    divisionId: 'network',
    category: 'Network',
    imageUrl: '/network-integration.jpg',
    location: 'Metropolitan & Enterprise Complexes',
    scale: 'Unified Command & High-Speed Backbone',
    client: 'Smart City SPVs & Enterprise Campuses',
    status: 'Delivered',
    summary: 'Enterprise network modernization featuring structured armored fiber trunks, redundant core data switching, and an integrated Command and Control Center with video wall visualization.',
    specs: [
      'Armored Single-Mode 96-Core Fiber Ring Architecture',
      'Tier-3 Data Center Edge Virtualization',
      '24/7 Operations Room & Operator Console Desks',
      'Sub-millisecond Industrial Failover Redundancy'
    ],
    themeColor: '#4F46E5',
    bgColor: '#EEF2FF'
  },
  {
    id: 'PRJ-NET-02',
    title: 'Intelligent AI-Driven CCTV Surveillance Grid',
    division: 'Network Integration',
    divisionId: 'network',
    category: 'Network',
    imageUrl: '/cctv.jpeg',
    location: 'Key Transit Nodes & Critical Perimeters',
    scale: 'High-Density AI Camera Network',
    client: 'Municipal Police & Transit Authorities',
    status: 'Active Execution',
    summary: 'Ultra-high-definition optical security network comprising PTZ and fixed ANPR cameras, AI-powered intrusion analytics, automated perimeter sentries, and encrypted telemetry.',
    specs: [
      '4K Starlight Ultra-Low-Light Optical Sensors',
      'Real-Time Automated Number Plate Recognition (ANPR)',
      'Perimeter Fence Radar & Optical Fiber Vibration Alerting',
      'Centralized Video Management System (VMS) Storage'
    ],
    themeColor: '#4F46E5',
    bgColor: '#EEF2FF'
  }
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [projectsList, setProjectsList] = useState(ALL_PROJECTS);

  useEffect(() => {
    const unsubscribe = subscribeToProjects((updated) => {
      if (updated && updated.length > 0) {
        setProjectsList(updated);
      }
    }, ALL_PROJECTS);
    return () => unsubscribe();
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects', count: projectsList.length },
    { id: 'sustainability', label: 'Sustainability & Infra', count: projectsList.filter(p => p.divisionId === 'sustainability').length },
    { id: 'renewable', label: 'Renewable Energies', count: projectsList.filter(p => p.divisionId === 'renewable').length },
    { id: 'government', label: 'Government Supplies', count: projectsList.filter(p => p.divisionId === 'government').length },
    { id: 'network', label: 'Network & CCTV Security', count: projectsList.filter(p => p.divisionId === 'network').length },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsList
    : projectsList.filter(p => p.divisionId === selectedCategory);

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="relative w-full py-20 bg-gradient-to-br from-corporate-blue via-navy-blue to-corporate-blue text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-orange text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles size={14} className="text-brand-orange" />
              Engineering Portfolio
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Executed Projects &amp; <br className="hidden sm:block"/>Infrastructure Showcases
            </h1>
            <div className="w-20 h-1.5 bg-brand-orange mb-6 shadow-[0_0_15px_rgba(255,102,0,0.5)]"></div>
            <p className="text-base md:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
              Explore authentic execution benchmarks delivered by Jayarams Bharat Private Limited across renewable energies, municipal environmental infrastructure, institutional supplies, and intelligent surveillance.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="bg-white border-b border-border-gray py-6 shadow-xs relative z-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-border-gray/60">
            <div className="text-center px-4">
              <span className="text-2xl md:text-3xl font-extrabold text-corporate-blue block">5</span>
              <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">Core Divisions</span>
            </div>
            <div className="text-center px-4">
              <span className="text-2xl md:text-3xl font-extrabold text-brand-orange block">100%</span>
              <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">CPCB / GeM Compliant</span>
            </div>
            <div className="text-center px-4">
              <span className="text-2xl md:text-3xl font-extrabold text-corporate-blue block">Turnkey</span>
              <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">EPC Execution</span>
            </div>
            <div className="text-center px-4">
              <span className="text-2xl md:text-3xl font-extrabold text-emerald-600 block">Nationwide</span>
              <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">Execution Footprint</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-6 md:px-12">
          {/* Category Tabs */}
          <div className="flex items-center justify-center mb-12">
            <div className="inline-flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-border-gray shadow-xs">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-corporate-blue text-white shadow-sm'
                        : 'text-text-secondary hover:text-text-primary hover:bg-light-bg'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-text-muted'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: easePremium }}
                  className="bg-white rounded-3xl border border-border-gray overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="h-64 w-full relative overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setActiveModalProject(project)}>
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span 
                        className="text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-md text-white"
                        style={{ backgroundColor: project.themeColor }}
                      >
                        {project.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        project.status === 'Delivered' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Bottom Scale Badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span className="font-mono font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        {project.scale}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-orange group-hover:scale-110 transition-all">
                        <Eye size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-text-muted mb-1">
                        {project.id}
                      </div>
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-corporate-blue transition-colors leading-snug mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 mb-4">
                        {project.summary}
                      </p>

                      {/* Specs List */}
                      <div className="space-y-1.5 pt-3 border-t border-border-gray/70">
                        {project.specs.slice(0, 2).map((sp, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-text-primary">
                            <CheckCircle2 size={13} className="text-brand-orange shrink-0" />
                            <span className="truncate">{sp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-border-gray flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <MapPin size={13} className="shrink-0 text-brand-orange" />
                        <span className="truncate max-w-[150px]">{project.location.split(',')[0]}</span>
                      </div>
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="text-corporate-blue hover:text-brand-orange font-bold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Specifications</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Lightbox Modal */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-blue/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black flex items-center justify-center">
              <img 
                src={activeModalProject.imageUrl} 
                alt={activeModalProject.title} 
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-4">
                <span 
                  className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-md"
                  style={{ backgroundColor: activeModalProject.themeColor }}
                >
                  {activeModalProject.division}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-text-muted font-mono mb-1">
                  <span>{activeModalProject.id}</span>
                  <span className="font-bold text-emerald-600">{activeModalProject.status}</span>
                </div>
                <h2 className="text-2xl font-bold text-corporate-blue">
                  {activeModalProject.title}
                </h2>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                  {activeModalProject.summary}
                </p>
              </div>

              {/* Key Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-light-bg border border-border-gray text-xs">
                <div>
                  <span className="text-text-muted block text-[10px] uppercase font-bold">Scope / Capacity</span>
                  <span className="font-bold text-corporate-blue text-sm mt-0.5 block">{activeModalProject.scale}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px] uppercase font-bold">Deployment Region</span>
                  <span className="font-semibold text-text-primary text-sm mt-0.5 block">{activeModalProject.location}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[10px] uppercase font-bold">Client Authority</span>
                  <span className="font-semibold text-text-primary text-sm mt-0.5 block">{activeModalProject.client}</span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <h4 className="font-bold text-sm text-corporate-blue mb-3">Key Technical Deliverables</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalProject.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-border-gray text-xs text-text-primary">
                      <CheckCircle2 size={16} className="text-brand-orange shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="pt-4 border-t border-border-gray flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-text-muted">
                  Looking to deploy a similar turnkey project for your organization?
                </div>
                <Link
                  to={`/${activeModalProject.divisionId === 'renewable' ? 'renewable-energies' : activeModalProject.divisionId === 'network' ? 'network-integration' : activeModalProject.divisionId === 'government' ? 'government-supplies' : 'sustainability-environmental-infrastructure'}#division-enquiry`}
                  onClick={() => setActiveModalProject(null)}
                  className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold rounded-xl shadow-md transition-all shrink-0 inline-flex items-center gap-2"
                >
                  <span>Connect with Division Desk</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
