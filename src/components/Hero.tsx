/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  Target, 
  MessageSquare, 
  Layers, 
  Sparkle, 
  ArrowRight,
  Mail,
  Linkedin,
  Phone,
  Copy,
  Check
} from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleLocalCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  // Mouse move handler for premium 3D parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates from -1 to 1 around the center of the element
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 }); // reset rot/depth
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // 3D Rotations (limit angles)
  const rotateX = coords.y * -25; // tilt forward/back
  const rotateY = coords.x * 25;  // tilt left/right

  return (
    <section 
      className="relative flex min-h-[90vh] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-12 overflow-hidden"
      id="hero-section"
    >
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        
        {/* Left Column - Headline & Pitch */}
        <div className="flex flex-col space-y-6 lg:col-span-7 select-none">
          
          {/* Top of the Home Page Contact Details (with copy buttons beside values) */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2.5 items-center text-xs"
            id="hero-top-contacts-panel"
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
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
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
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
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
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* AI Role/Title badge (Above) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex self-start items-center space-x-2 rounded-full border border-teal-500/30 bg-teal-950/40 px-4 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur-md"
            id="badge-banner"
          >
            <Sparkle className="h-3.5 w-3.5 text-teal-400 animate-spin [animation-duration:6s]" />
            <span>AI Powered Digital Marketing Manager | Marketing Automations | Marketing Consultant</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            id="heading-hero"
          >
            <span className="block text-slate-100 font-sans">Mayuresh Sawant</span>
            <span 
              className="relative mt-2 block bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent transform hover:scale-[1.01] transition-transform duration-300"
              style={{ textShadow: "0 0 35px rgba(45, 212, 191, 0.15)" }}
            >
              Top Digital Marketing Manager in Mumbai
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl text-base text-slate-300 md:text-lg leading-relaxed"
            id="paragraph-hero"
          >
            Driving exponential ROI across competitive real estate & healthcare sectors. 
            Scaling platforms to **₹3 Crore+ ad spends** resulting in **40,000+ top-tier customer acquisitions**.
            Combining algorithmic media planning with AI strategy automation pipelines.
          </motion.p>

          {/* Quick Metrics Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 border-y border-slate-800/80 py-4 max-w-lg"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-black text-teal-400">₹3Cr+</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-mono">Budgets Managed</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">40K+</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-mono">Premium Leads</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-teal-300 font-sans" style={{ WebkitTextStroke: "1px rgba(45, 212, 191, 0.5)" }}>5K+</p>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-mono">Growth (90 Days)</p>
            </div>
          </motion.div>

          {/* Quick Actions & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 items-center"
            id="hero-actions"
          >
            <button
              onClick={() => onNavigate("case_studies")}
              className="group inline-flex items-center space-x-2 rounded-xl bg-teal-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-teal-300 hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] cursor-pointer"
              id="cta-case-studies"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate("performance")}
              className="inline-flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-teal-500/50 hover:bg-slate-800/80 cursor-pointer"
              id="cta-performance"
            >
              <span>View Analytics</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column - Mouse Reactive 3D Marketing Elements */}
        <div 
          className="flex items-center justify-center lg:col-span-5 h-[350px] sm:h-[450px]"
          id="hero-3d-wrapper"
        >
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative h-full w-full max-w-[400px] cursor-grab active:cursor-grabbing [perspective:1000px] flex items-center justify-center select-none"
            id="dynamic-3d-scene"
          >
            {/* The Outer Perspective Card Box */}
            <motion.div
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX: isHovered ? rotateX : [0, 8, -8, 0],
                rotateY: isHovered ? rotateY : [0, -12, 12, 0],
                y: isHovered ? 0 : [0, -15, 15, 0],
              }}
              transition={
                isHovered 
                  ? { type: "spring", stiffness: 150, damping: 15, mass: 0.8 } 
                  : { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative w-80 h-96 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-930 to-[#0F172A]/95 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl flex flex-col justify-between overflow-visible font-sans"
              id="the-3d-base-card"
            >
              {/* Highlight Neon Glow Border inside */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/15 via-transparent to-emerald-500/10 pointer-events-none opacity-80" />

              {/* Depth Level 1: Subtle Background holographic network layout */}
              <div 
                className="absolute inset-4 rounded-xl border border-slate-850 bg-[radial-gradient(#2DD4BF_0.5px,transparent_0.5px)] bg-[size:16px_16px] pointer-events-none opacity-10 transition-transform duration-300"
                style={{ transform: "translateZ(10px)" }}
              />

              {/* Card Header Content */}
              <div 
                style={{ transform: "translateZ(30px)" }}
                className="flex items-start justify-between border-b border-slate-800 pb-4 transition-transform duration-300"
              >
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-slate-450 text-slate-450 text-slate-400 uppercase font-mono">Interactive Engine</h3>
                  <p className="text-[10px] text-teal-400 font-mono mt-0.5">STATUS ACTIVE :: 2026</p>
                </div>
                <div className="rounded-lg bg-teal-950/60 p-2 border border-teal-500/30">
                  <Layers className="h-4 w-4 text-teal-400" />
                </div>
              </div>

              {/* Depth Level 2: Main Floating Holographic Core (Performance Sphere & Target Icon) */}
              <div className="relative flex-1 flex items-center justify-center py-6">
                
                {/* Orbital Rings representing concentric ad targeting */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  style={{ transform: "translateZ(40px)" }}
                  className="absolute w-36 h-36 rounded-full border-2 border-dashed border-teal-500/20 flex items-center justify-center transition-transform duration-300"
                />

                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  style={{ transform: "translateZ(60px)" }}
                  className="absolute w-28 h-28 rounded-full border border-emerald-500/40 flex items-center justify-center transition-transform duration-300"
                />

                {/* Floating Core Sphere Icon */}
                <motion.div
                  style={{ transform: "translateZ(80px)" }}
                  whileHover={{ scale: 1.1 }}
                  className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.5)] border border-white/20 transition-transform duration-300 pointer-events-auto"
                >
                  <Target className="h-8 w-8 text-white animate-pulse" />
                </motion.div>

                {/* Depth Level 3: Auxiliary nodes floating around card boundaries with custom perspective heights */}
                
                {/* Node A: Google Ads Performance Node */}
                <div 
                  className="absolute top-2 left-2 rounded-lg bg-slate-900/95 border border-slate-800 p-2 shadow-md flex items-center space-x-1.5 transition-transform duration-300"
                  style={{ transform: "translateZ(90px) translateX(-45px) translateY(-25px)" }}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-ping" />
                  <span className="text-[9px] font-bold text-slate-200 uppercase tracking-widest font-mono">GOOGLE ADS</span>
                </div>

                {/* Node B: Meta Ads ROI node */}
                <div 
                  className="absolute bottom-4 right-1 rounded-lg bg-slate-900/95 border border-slate-800 p-2 shadow-md flex items-center space-x-1.5 transition-transform duration-300"
                  style={{ transform: "translateZ(105px) translateX(45px) translateY(15px)" }}
                >
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400 font-bold" />
                  <span className="text-[9px] font-bold text-slate-200 uppercase tracking-widest font-mono">META ROI: 25X</span>
                </div>

                {/* Node C: AI Automation automation badge */}
                <div 
                  className="absolute top-1/2 right-0 rounded-full bg-teal-950/90 border border-teal-500/40 px-2 py-1 shadow-md flex items-center space-x-1 transition-transform duration-300"
                  style={{ transform: "translateZ(120px) translateX(65px)" }}
                >
                  <Sparkle className="h-2.5 w-2.5 text-teal-350 text-teal-400" />
                  <span className="text-[8px] font-black text-teal-300">AI AGENT ACTIVE</span>
                </div>

                {/* Node D: CTR high benchmark badge */}
                <div 
                  className="absolute bottom-6 left-1 rounded-lg bg-slate-900/95 border border-slate-800 p-2 shadow-md flex flex-col justify-center transition-transform duration-300"
                  style={{ transform: "translateZ(110px) translateX(-55px) translateY(35px)" }}
                >
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono">AVG CTR</span>
                  <span className="text-[10px] font-extrabold text-emerald-400">15.0% ACHIEVED</span>
                </div>

              </div>

              {/* Card Footer Metrics info */}
              <div 
                style={{ transform: "translateZ(50px)" }}
                className="flex items-center justify-between border-t border-slate-800 pt-4 transition-transform duration-300"
              >
                <div>
                  <p className="text-[8px] font-mono text-slate-450 text-slate-400">DEMO INSTRUCTION</p>
                  <p className="text-[10px] text-slate-350 text-slate-300 font-medium">MOVE MOUSE OVER CARD FOR 3D DEPTH</p>
                </div>
                <div className="flex space-x-1 text-slate-650 text-slate-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-450 bg-teal-400 animate-pulse" />
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-450 bg-emerald-400 animate-pulse" />
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse" />
                </div>
              </div>

            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
