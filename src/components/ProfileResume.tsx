/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  Award, 
  GraduationCap, 
  Sparkle,
  Linkedin,
  Cpu,
  Bookmark,
  CheckCircle2,
  Copy
} from "lucide-react";
import { PERSONAL_INFO, EXPERIENCES, ACHIEVEMENTS, SKILL_CATEGORIES, PERSONAL_PROJECTS } from "../data";

export default function ProfileResume() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [urgency, setUrgency] = useState("Immediate");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleLocalCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, role, urgency }),
      });
      if (res.ok) {
        setSubmitted(true);
        // Reset states
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setRole("");
        setUrgency("Immediate");
      } else {
        console.error("Failed to post lead data");
      }
    } catch (err) {
      console.error("Network error on lead submission:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12" id="profile-resume-root">
      
      {/* Contact Details Panel with copy button (Top of Resume Page) */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-2.5 items-center text-xs pb-6 border-b border-slate-900/40"
        id="resume-top-contacts-panel"
      >
        {/* LinkedIn Pill */}
        <div className="flex items-center space-x-2 bg-slate-950/45 border border-slate-900/90 px-3 py-1.5 rounded-xl hover:border-cyan-400/30 transition shadow-sm">
          <Linkedin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <a 
            href={PERSONAL_INFO.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-slate-300 hover:text-cyan-400 transition font-bold text-[11px]"
          >
            linkedin.com/in/mayureshsawant21
          </a>
          <div className="h-3 w-[1px] bg-slate-800" />
          <button 
            onClick={() => handleLocalCopy(PERSONAL_INFO.linkedin, "linkedin")}
            className="p-1 text-slate-500 hover:text-emerald-400 transition cursor-pointer"
            title="Copy LinkedIn URL"
          >
            {copiedField === "linkedin" ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Email Pill */}
        <div className="flex items-center space-x-2 bg-slate-950/45 border border-slate-900/90 px-3 py-1.5 rounded-xl hover:border-cyan-400/30 transition shadow-sm">
          <Mail className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className="font-mono text-slate-300 hover:text-cyan-400 transition font-bold text-[11px]"
          >
            {PERSONAL_INFO.email}
          </a>
          <div className="h-3 w-[1px] bg-slate-800" />
          <button 
            onClick={() => handleLocalCopy(PERSONAL_INFO.email, "email")}
            className="p-1 text-slate-500 hover:text-emerald-400 transition cursor-pointer"
            title="Copy Email Address"
          >
            {copiedField === "email" ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Phone Pill */}
        <div className="flex items-center space-x-2 bg-slate-950/45 border border-slate-900/90 px-3 py-1.5 rounded-xl hover:border-cyan-400/30 transition shadow-sm">
          <Phone className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <a 
            href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, "")}`}
            className="font-mono text-slate-300 hover:text-cyan-400 transition font-bold text-[11px]"
          >
            {PERSONAL_INFO.phone}
          </a>
          <div className="h-3 w-[1px] bg-slate-800" />
          <button 
            onClick={() => handleLocalCopy(PERSONAL_INFO.phone, "phone")}
            className="p-1 text-slate-500 hover:text-emerald-400 transition cursor-pointer"
            title="Copy Phone Number"
          >
            {copiedField === "phone" ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Narrative Section Header */}
      <div className="flex flex-col space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-teal-400 text-xs font-bold tracking-widest uppercase">
          <FileText className="h-4 w-4 text-teal-400" />
          <span>Professional Resume</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-100 tracking-tight sm:text-4xl">
          Career Summary & Technical Skills
        </h2>
        <p className="max-w-2xl text-slate-400 text-sm sm:text-base">
          A results-driven marketing background of 6+ years across Indian and global regions. Fully certified and skilled in modern performance optimization, AI engineering pipelines, and programmatic platforms.
        </p>
      </div>

      {/* Visual Technical Skills Grid */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 sm:p-8 backdrop-blur-md space-y-6" id="skills-grid-wrapper">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Cpu className="h-5 w-5 text-teal-400" />
          <h3 className="text-lg font-bold text-slate-200">Modern Digital Marketing Technology Stack</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="space-y-3 rounded-xl bg-slate-950/40 p-4 border border-slate-850">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">{cat.category}</h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-xs text-slate-300 font-semibold flex items-center space-x-1 hover:border-teal-500/20 transition-all"
                  >
                    <span className="h-1 w-1 bg-teal-400 rounded-full" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Experience & Academic split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Academics, Projects & Achievements */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Achievements block */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 space-y-5 backdrop-blur-md">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
              <Award className="h-5 w-5 text-teal-400" />
              <span>Key Achievements</span>
            </h3>
            
            <div className="space-y-4">
              {ACHIEVEMENTS.map((ach, idx) => (
                <div key={idx} className="border-l-2 border-teal-500/40 pl-3 py-1 space-y-1">
                  <h4 className="text-xs font-black text-teal-450 text-teal-400 uppercase font-mono tracking-wider">{ach.title}</h4>
                  <p className="text-xs font-bold text-slate-300">{ach.subtitle}</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Personal projects list */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 space-y-4 backdrop-blur-md">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
              <Bookmark className="h-5 w-5 text-emerald-400" />
              <span>Independent Case Audits</span>
            </h3>

            <div className="grid grid-cols-1 gap-2.5" id="personal-projects-scroller">
              {PERSONAL_PROJECTS.map((proj, idx) => (
                <div key={idx} className="bg-slate-950/55 p-3 rounded-xl border border-slate-850/65 flex flex-col justify-center">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">{proj.client}</span>
                  <span className="text-xs font-bold text-slate-300 mt-0.5">{proj.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Timeline */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 space-y-5 backdrop-blur-md">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-teal-400" />
              <span>Academic Credentials</span>
            </h3>

            <div className="space-y-4">
              <div className="border-l-2 border-teal-500/35 pl-3 py-1 space-y-1">
                <span className="text-[10px] font-mono text-teal-400 font-bold block">2020</span>
                <h4 className="text-xs font-black text-slate-200">Certified Digital Marketer</h4>
                <p className="text-xs font-semibold text-slate-400">Indian Institute of Digital Education (IIDE)</p>
                <p className="text-[10px] text-slate-500">Focus: SMM, SEO/SEM, Web Analytics, ORM</p>
              </div>

              <div className="border-l-2 border-teal-500/35 pl-3 py-1 space-y-1">
                <span className="text-[10px] font-mono text-teal-400 font-bold block">2016 - 2019</span>
                <h4 className="text-xs font-black text-slate-200">Bachelors in Management Studies</h4>
                <p className="text-xs font-semibold text-slate-400">R.D. National College, Mumbai</p>
              </div>

              <div className="border-l-2 border-teal-500/35 pl-3 py-1 space-y-1">
                <h4 className="text-xs font-black text-slate-200">Online MBA & Analytics</h4>
                <p className="text-xs font-semibold text-slate-400">Independent ongoing training modules</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Work History Timeline */}
        <div className="lg:col-span-8 space-y-6" id="career-experience-timeline">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 sm:p-8 space-y-8 backdrop-blur-md">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Briefcase className="h-5 w-5 text-teal-400" />
              <span>Professional Practice timeline</span>
            </h3>

            {/* Vertical timeline cards */}
            <div className="relative border-l border-slate-800 ml-4 space-y-8" id="timeline-list">
              {EXPERIENCES.map((job, idx) => (
                <div key={idx} className="relative pl-6">
                  {/* Glowing Node Dot in timeline */}
                  <span className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full border border-teal-400 bg-slate-950 shadow-[0_0_8px_rgba(45,212,191,0.5)] active:scale-110 transition-transform" />
                  
                  {/* Job Metadata details */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-black text-white">{job.role}</h4>
                      <p className="text-xs font-bold text-teal-400 mt-0.5">{job.company}</p>
                    </div>
                    <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-slate-400 bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-full w-fit">
                      <Calendar className="h-3 w-3 text-slate-500" />
                      <span>{job.period}</span>
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 mt-4">
                    {job.highlights.map((hlt, hIdx) => (
                      <li key={hIdx} className="text-xs text-slate-300 flex items-start space-x-2 leading-relaxed">
                        <span className="text-teal-400 font-bold">✓</span>
                        <span>{hlt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Quick Contact Form */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 backdrop-blur-md" id="resume-contact-card">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Contact Copy details */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Need to build an elite marketing funnel?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have an upcoming product launch in real estate, SaaS or healthcare? Drop a message directly to Mayuresh's communication terminals to organize client acquisitions, media buy planning, and custom AI reporting strategies.
            </p>
            <div className="space-y-2.5 pt-2 text-xs font-mono">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center space-x-2 text-slate-300 hover:text-teal-400 transition-colors">
                <Mail className="h-4 w-4 text-teal-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center space-x-2 text-slate-300 hover:text-teal-400 transition-colors">
                <Phone className="h-4 w-4 text-teal-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="h-4 w-4 text-teal-400" />
                <span>{PERSONAL_INFO.location} & Willing to Relocate</span>
              </div>
            </div>
          </div>

          {/* Quick interactive Form submission simulator */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit} 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/40 p-5 rounded-xl border border-slate-850"
                  id="career-leads-contact-form"
                >
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs focus:border-teal-500 focus:outline-none text-slate-100 placeholder-slate-650"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+91 99999 99999" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs focus:border-teal-500 focus:outline-none text-slate-100 placeholder-slate-650"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="jane@company.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs focus:border-teal-500 focus:outline-none text-slate-100 placeholder-slate-655"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Company Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Acme Corp" 
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs focus:border-teal-500 focus:outline-none text-slate-100 placeholder-slate-655"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Your Role / Title</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Hiring Manager / Director" 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs focus:border-teal-500 focus:outline-none text-slate-100 placeholder-slate-655"
                    />
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">How immediate you want</label>
                    <select 
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="rounded-lg bg-slate-900 border border-slate-800 p-2 text-xs focus:border-teal-500 focus:outline-none text-slate-100 select-hide-arrow font-sans cursor-pointer"
                    >
                      <option value="Immediate" className="bg-slate-950 text-slate-100">Immediate (notice left: 45 days)</option>
                      <option value="Within 15 Days" className="bg-slate-950 text-slate-100">Within 15 Days</option>
                      <option value="Within 30 Days" className="bg-slate-950 text-slate-100">Within 30 Days</option>
                      <option value="40-45 Days" className="bg-slate-950 text-slate-100">40-45 Days</option>
                      <option value="Casual / Future Resource" className="bg-slate-950 text-slate-100">Casual / Future Pipeline</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2.5 px-4 text-xs tracking-wider uppercase transition-all cursor-pointer shadow-md hover:shadow-teal-400/25 disabled:bg-slate-800 disabled:text-slate-500"
                      id="submit-contact-form"
                    >
                      {loading ? "Submitting Inquiry..." : "Submit Inquiry Details"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="submit-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-teal-950/30 border border-teal-500/35 rounded-xl p-6 flex flex-col items-center text-center space-y-3"
                  id="contact-success-panel"
                >
                  <CheckCircle2 className="h-10 w-10 text-teal-400 animate-bounce" />
                  <div>
                    <h4 className="text-base font-bold text-slate-100 font-mono uppercase tracking-wide">Inquiry Locked In!</h4>
                    <p className="text-xs text-slate-450 text-slate-400 mt-2 max-w-sm leading-relaxed">
                      Your business profile and requirements have been logged securely. Mayuresh Sawant has been notified on <strong className="text-teal-400">sawantmayuresh3@gmail.com</strong> and will follow up with you.
                    </p>
                  </div>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-teal-300 hover:text-teal-350 hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

    </section>
  );
}
