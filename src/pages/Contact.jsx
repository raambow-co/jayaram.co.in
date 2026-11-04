import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Building2
} from 'lucide-react';

const easePremium = [0.16, 1, 0.3, 1];

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    division: 'General Executive Office',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="relative w-full py-20 bg-gradient-to-br from-corporate-blue via-navy-blue to-corporate-blue text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-orange text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles size={14} className="text-brand-orange" />
              Direct Engagement Desk
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Connect With <br className="hidden sm:block"/>Jayarams Bharat
            </h1>
            <div className="w-20 h-1.5 bg-brand-orange mb-6 shadow-[0_0_15px_rgba(255,102,0,0.5)]"></div>
            <p className="text-base md:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
              Initiate direct dialogue with our specialized engineering desks, request comprehensive project feasibility studies, or schedule an executive consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Coordinates */}
            <div className="lg:col-span-5 space-y-6">
              {/* Corporate Card */}
              <div className="bg-white p-8 rounded-3xl border border-border-gray shadow-xs space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border-gray">
                  <div className="w-16 h-16 p-2 rounded-2xl bg-slate-50 border border-border-gray flex items-center justify-center">
                    <img src="/jayarams-logo-lockup.png" alt="Jayarams Bharat" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-corporate-blue">Jayarams Bharat Private Limited</h3>
                    <p className="text-xs text-brand-orange font-semibold uppercase tracking-wider">Corporate Headquarters</p>
                  </div>
                </div>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted font-bold uppercase block">Registered Office</span>
                      <span className="text-text-primary font-medium leading-relaxed block mt-0.5">
                        123 Corporate Tower, Financial District, Hyderabad, India 500032
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-corporate-blue flex items-center justify-center shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted font-bold uppercase block">Telephone Desk</span>
                      <a href="tel:+919876543210" className="text-corporate-blue font-semibold hover:underline block mt-0.5">
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted font-bold uppercase block">Official Inquiries</span>
                      <a href="mailto:info@jayaramsbharat.com" className="text-corporate-blue font-semibold hover:underline block mt-0.5">
                        info@jayaramsbharat.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-text-muted flex items-center justify-center shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted font-bold uppercase block">Operating Hours</span>
                      <span className="text-text-primary font-medium block mt-0.5">
                        Mon – Fri: 09:00 AM – 06:00 PM IST
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Assurance Box */}
              <div className="p-6 rounded-3xl bg-corporate-blue text-white space-y-2">
                <div className="flex items-center gap-2 text-brand-orange font-bold text-sm">
                  <ShieldCheck size={18} />
                  <span>Institutional Procurement Assurance</span>
                </div>
                <p className="text-xs text-blue-100/90 leading-relaxed">
                  GeM-registered, ISO-standard quality processes, and statutory environmental clearance audit protocols applied to every client engagement.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-border-gray shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-corporate-blue">Inquiry Successfully Transmitted</h3>
                  <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Jayarams Bharat Private Limited. Our executive operations desk will review your submission and contact you within 24-48 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        organization: '',
                        email: '',
                        phone: '',
                        division: 'General Executive Office',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-corporate-blue text-white text-xs font-semibold rounded-xl hover:bg-navy-blue transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <div>
                    <h3 className="text-xl font-bold text-corporate-blue mb-1">Direct Inquiries Form</h3>
                    <p className="text-xs text-text-secondary">Please provide your project parameters for priority technical routing.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-text-primary mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Ramesh Chandra"
                        className="w-full px-3.5 py-2.5 bg-light-bg border border-border-gray rounded-xl focus:outline-none focus:border-corporate-blue font-medium text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-text-primary mb-1">
                        Organization / Authority <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Municipal Corp / Infra Ltd"
                        className="w-full px-3.5 py-2.5 bg-light-bg border border-border-gray rounded-xl focus:outline-none focus:border-corporate-blue font-medium text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-text-primary mb-1">
                        Official Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@organization.com"
                        className="w-full px-3.5 py-2.5 bg-light-bg border border-border-gray rounded-xl focus:outline-none focus:border-corporate-blue font-medium text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-text-primary mb-1">
                        Contact Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-light-bg border border-border-gray rounded-xl focus:outline-none focus:border-corporate-blue font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-text-primary mb-1">
                      Target Engineering Division <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-light-bg border border-border-gray rounded-xl focus:outline-none focus:border-corporate-blue font-semibold text-xs"
                    >
                      <option value="General Executive Office">General Executive Office</option>
                      <option value="Sustainability & Environmental Infrastructure">Sustainability &amp; Environmental Infrastructure</option>
                      <option value="Renewable Energies">Renewable Energies</option>
                      <option value="Government Supplies & CSR">Government Supplies &amp; CSR</option>
                      <option value="Network Integration & CCTV">Network Integration &amp; CCTV</option>
                      <option value="Consultancy Services">Consultancy Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-text-primary mb-1">
                      Subject / Project Scope <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Solar EPC Grid Consultation or ETP Setup"
                      className="w-full px-3.5 py-2.5 bg-light-bg border border-border-gray rounded-xl focus:outline-none focus:border-corporate-blue font-medium text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-text-primary mb-1">
                      Project Specifications &amp; Requirements <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Describe your capacity requirements, location, estimated schedule, or tender guidelines..."
                      className="w-full p-3 bg-light-bg border border-border-gray rounded-xl focus:outline-none focus:border-corporate-blue font-sans text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                        Transmitting Inquiry...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={15} />
                        Submit Formal Inquiry
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
