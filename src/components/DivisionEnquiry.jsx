import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Phone, Mail, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const easePremium = [0.16, 1, 0.3, 1];

const DivisionEnquiry = ({
  divisionName,
  subtitle,
  badge = "Division Enquiry Desk",
  services = [],
  scaleFieldLabel = "Project Scale / Estimated Capacity",
  divisionEmail = "info@jayaramsbharat.com",
  divisionPhone = "+91 98765 43210",
  slaText = "Technical review & preliminary proposal delivered within 24-48 hours.",
  highlights = []
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    serviceRequired: services[0] || '',
    scale: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      phone: '',
      serviceRequired: services[0] || '',
      scale: '',
      message: ''
    });
  };

  return (
    <section id="division-enquiry" className="py-24 bg-gradient-to-b from-white via-light-bg to-white scroll-mt-20 border-t border-border-gray/80 relative overflow-hidden">
      {/* Background Subtle Ambient Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-corporate-blue/5 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={14} className="text-brand-orange" />
              {badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-corporate-blue tracking-tight mb-4">
              Dedicated {divisionName} Inquiry
            </h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="text-text-secondary text-base leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info & Division Guarantees */}
            <motion.div 
              className="lg:col-span-5 flex flex-col gap-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easePremium }}
            >
              <div className="bg-white p-8 rounded-2xl border border-border-gray shadow-md">
                <h3 className="text-xl font-bold text-corporate-blue mb-4">Direct Division Desk</h3>
                <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                  Connect with specialized project managers and senior engineers assigned exclusively to {divisionName}.
                </p>

                <div className="flex flex-col gap-5 border-t border-border-gray/60 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-light-bg text-corporate-blue flex items-center justify-center shrink-0 border border-border-gray">
                      <Phone size={18} className="text-brand-orange" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary block">Direct Hotline</span>
                      <a href={`tel:${divisionPhone.replace(/\s+/g, '')}`} className="font-semibold text-corporate-blue hover:text-brand-orange transition-colors text-sm">
                        {divisionPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-light-bg text-corporate-blue flex items-center justify-center shrink-0 border border-border-gray">
                      <Mail size={18} className="text-brand-orange" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary block">Dedicated Division Email</span>
                      <a href={`mailto:${divisionEmail}`} className="font-semibold text-corporate-blue hover:text-brand-orange transition-colors text-sm break-all">
                        {divisionEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-light-bg text-corporate-blue flex items-center justify-center shrink-0 border border-border-gray">
                      <Clock size={18} className="text-brand-orange" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary block">Response SLA</span>
                      <p className="text-xs text-text-secondary leading-snug font-medium">
                        {slaText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights Box */}
              {highlights.length > 0 && (
                <div className="bg-corporate-blue text-white p-7 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest mb-3">
                    <ShieldCheck size={16} />
                    <span>Division Commitments</span>
                  </div>
                  <h4 className="text-lg font-bold mb-4">Engineering Standards</h4>
                  <ul className="flex flex-col gap-2.5 text-sm text-gray-200">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} className="text-brand-orange shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Right Column: Interactive Dedicated Form */}
            <motion.div 
              className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-border-gray/80 shadow-[0_15px_40px_rgba(11,46,115,0.06)] relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easePremium }}
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-corporate-blue via-brand-orange to-corporate-blue"></div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-500 text-green-600 flex items-center justify-center mb-6 shadow-md">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-corporate-blue mb-2">Inquiry Submitted Successfully!</h3>
                    <p className="text-text-secondary text-sm max-w-md mb-8 leading-relaxed">
                      Thank you, <span className="font-semibold text-corporate-blue">{formData.fullName || 'Partner'}</span>. Your technical requirements for <span className="font-semibold text-brand-orange">{divisionName}</span> have been routed to our lead engineering division. We will be in touch shortly.
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-corporate-blue text-white font-medium text-sm rounded-lg hover:bg-navy-blue transition-colors shadow-sm"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="border-b border-border-gray/80 pb-4 mb-2">
                      <h3 className="text-xl font-bold text-corporate-blue tracking-tight">
                        Request a Technical Consultation or RFP Proposal
                      </h3>
                      <p className="text-xs text-text-secondary mt-1">
                        Fill in your project specifics to receive a tailored engineering proposal.
                      </p>
                    </div>

                    {/* Row 1: Name & Org */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-corporate-blue uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full px-4 py-3 text-sm bg-light-bg/50 border border-border-gray rounded-xl focus:outline-none focus:border-brand-orange focus:bg-white text-corporate-blue transition-colors placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-corporate-blue uppercase tracking-wider mb-1.5">
                          Organization / Company *
                        </label>
                        <input
                          type="text"
                          name="organization"
                          required
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="e.g. Apex Infra Pvt Ltd"
                          className="w-full px-4 py-3 text-sm bg-light-bg/50 border border-border-gray rounded-xl focus:outline-none focus:border-brand-orange focus:bg-white text-corporate-blue transition-colors placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-corporate-blue uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. rajesh@company.com"
                          className="w-full px-4 py-3 text-sm bg-light-bg/50 border border-border-gray rounded-xl focus:outline-none focus:border-brand-orange focus:bg-white text-corporate-blue transition-colors placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-corporate-blue uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 text-sm bg-light-bg/50 border border-border-gray rounded-xl focus:outline-none focus:border-brand-orange focus:bg-white text-corporate-blue transition-colors placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    {/* Row 3: Specialized Service & Scale */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {services.length > 0 && (
                        <div>
                          <label className="block text-xs font-bold text-corporate-blue uppercase tracking-wider mb-1.5">
                            Specific Capability Needed *
                          </label>
                          <select
                            name="serviceRequired"
                            value={formData.serviceRequired}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm bg-light-bg/50 border border-border-gray rounded-xl focus:outline-none focus:border-brand-orange focus:bg-white text-corporate-blue transition-colors font-medium"
                          >
                            {services.map((svc, i) => (
                              <option key={i} value={svc}>{svc}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label className="block text-xs font-bold text-corporate-blue uppercase tracking-wider mb-1.5">
                          {scaleFieldLabel}
                        </label>
                        <input
                          type="text"
                          name="scale"
                          value={formData.scale}
                          onChange={handleChange}
                          placeholder="e.g. 5 MW / 10 MLD / 20 Sites"
                          className="w-full px-4 py-3 text-sm bg-light-bg/50 border border-border-gray rounded-xl focus:outline-none focus:border-brand-orange focus:bg-white text-corporate-blue transition-colors placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    {/* Row 4: Project Scope & Location */}
                    <div>
                      <label className="block text-xs font-bold text-corporate-blue uppercase tracking-wider mb-1.5">
                        Project Scope, Location & Timeline
                      </label>
                      <textarea
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Briefly describe your requirements, project site location, statutory requirements, and targeted completion date..."
                        className="w-full px-4 py-3 text-sm bg-light-bg/50 border border-border-gray rounded-xl focus:outline-none focus:border-brand-orange focus:bg-white text-corporate-blue transition-colors resize-none placeholder:text-gray-400"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-brand-orange to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.99] disabled:opacity-70 mt-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Submit {divisionName} Inquiry</span>
                          <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DivisionEnquiry;
