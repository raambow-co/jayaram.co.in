import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Sparkles, Building2, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const easePremium = [0.16, 1, 0.3, 1];

const TESTIMONIALS = [
  {
    text: "Jayarams Bharat executed our 5MW commercial solar & EV charging infrastructure hub with exceptional engineering precision. Their turnkey delivery met every timeline and grid sync guideline flawlessly.",
    author: "Rajesh Kumar",
    role: "Director of Infrastructure",
    organization: "Commercial TechPark Solutions",
    division: "Renewable Energies",
    divisionColor: "#F26A21"
  },
  {
    text: "The industrial effluent treatment and water recycling facility achieved 100% Zero Liquid Discharge (ZLD) compliance effortlessly. Superior civil engineering and biological MBBR execution.",
    author: "Anjali Desai",
    role: "VP Operations",
    organization: "EcoTransit Industrial Park",
    division: "Sustainability & Environmental Infrastructure",
    divisionColor: "#059669"
  },
  {
    text: "Unmatched expertise in government tender compliance and GeM execution. The team delivered our mission-critical institutional supplies ahead of schedule with immaculate quality certification.",
    author: "Vikram Singh",
    role: "Chief Engineer",
    organization: "State Public Works & Infrastructure Cell",
    division: "Government Supplies",
    divisionColor: "#0B2E73"
  },
  {
    text: "Their Network Integration team completely modernized our enterprise infrastructure with armored fiber backbones and intelligent AI-powered CCTV surveillance feeds.",
    author: "Priya Sharma",
    role: "Head of Digital Infrastructure",
    organization: "Nexus Corporate Systems",
    division: "Network Integration",
    divisionColor: "#4F46E5"
  },
  {
    text: "Strategic engineering consultancy that navigated multifaceted environmental clearances, statutory EIA audits, and DPR techno-commercial modeling smoothly.",
    author: "Amit Patel",
    role: "Managing Partner",
    organization: "BuildRight Project Concessionaires",
    division: "Consultancy Services",
    divisionColor: "#0891B2"
  },
  {
    text: "High-power DC EV fast chargers deployed across highway amenity plazas with outstanding 99.9% operational uptime and automated cloud telemetry.",
    author: "Arvind Menon",
    role: "Fleet Operations Director",
    organization: "TransLogix Logistics Hub",
    division: "Renewable Energies",
    divisionColor: "#F26A21"
  }
];

const Testimonials = () => {
  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="relative w-full py-20 bg-gradient-to-br from-corporate-blue via-navy-blue to-corporate-blue text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-orange text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles size={14} className="text-brand-orange" />
              Verified Accreditations
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Stakeholder Testimonials &amp; <br className="hidden sm:block"/>Client Accreditations
            </h1>
            <div className="w-20 h-1.5 bg-brand-orange mb-6 shadow-[0_0_15px_rgba(255,102,0,0.5)]"></div>
            <p className="text-base md:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
              Endorsements from municipal commissioners, state enterprise directors, and industrial park operators across India partnering with Jayarams Bharat Private Limited.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-3xl border border-border-gray shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} className="fill-brand-orange text-brand-orange" />
                      ))}
                    </div>
                    <span 
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: t.divisionColor }}
                    >
                      {t.division}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-xs md:text-sm text-text-primary leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-border-gray/70 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-corporate-blue/10 text-corporate-blue font-bold text-sm flex items-center justify-center shrink-0 border border-corporate-blue/20">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-corporate-blue">{t.author}</h4>
                    <p className="text-[11px] text-text-muted">{t.role}</p>
                    <p className="text-[10px] font-semibold text-text-secondary">{t.organization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-white rounded-3xl border border-border-gray p-8 md:p-12 text-center max-w-4xl mx-auto shadow-xs">
            <h3 className="text-2xl md:text-3xl font-bold text-corporate-blue mb-3">
              Ready to Partner With Jayarams Bharat?
            </h3>
            <p className="text-xs md:text-sm text-text-secondary max-w-xl mx-auto leading-relaxed mb-6">
              Our engineering directors and division desks are available to discuss your specifications, tender criteria, or site surveys.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold rounded-full shadow-md transition-all active:scale-95"
            >
              <span>Initiate Direct Consultation</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
