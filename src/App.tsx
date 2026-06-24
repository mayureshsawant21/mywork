/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Linkedin, 
  Mail, 
  Phone, 
  Instagram, 
  Menu, 
  X,
  Sparkles,
  ArrowRight,
  MapPin,
  CirclePlay,
  Clipboard,
  Check
} from "lucide-react";
import BackgroundElements from "./components/BackgroundElements";
import Hero from "./components/Hero";
import PerformanceDashboard from "./components/PerformanceDashboard";
import CaseStudies from "./components/CaseStudies";
import ProfileResume from "./components/ProfileResume";
import LeadsLog from "./components/LeadsLog";
import { PERSONAL_INFO } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    const path = window.location.pathname;
    if (path === "/leads" || path.endsWith("/leads") || window.location.hash === "#leads") {
      return "leads";
    }
    return "dashboard";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, type: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 1500);
  };

  // Synchronize routing path changes or direct URLs
  React.useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      if (path === "/leads" || path.endsWith("/leads") || window.location.hash === "#leads") {
        setActiveTab("leads");
      } else if (activeTab === "leads") {
        setActiveTab("dashboard");
      }
    };
    window.addEventListener("popstate", handleLocation);
    window.addEventListener("hashchange", handleLocation);
    return () => {
      window.removeEventListener("popstate", handleLocation);
      window.removeEventListener("hashchange", handleLocation);
    };
  }, [activeTab]);

  // Helper to handle tab switching smoothly
  const handleTabChange = (tabId: string) => {
    if (tabId === "performance") {
      setActiveTab("dashboard");
      setMobileMenuOpen(false);
      setTimeout(() => {
        const el = document.getElementById("performance-dashboard-root");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return;
    }
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    
    // Update path securely during client tab mutations
    if (tabId === "leads") {
      window.history.pushState({}, "", "/leads");
    } else {
      window.history.pushState({}, "", "/");
    }
    
    // Scroll smoothly to top of the tabs section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "case_studies", label: "Case Studies" },
    { id: "resume", label: "Resume" }
  ];

  return (
    <div className="relative min-h-screen flex flex-col font-sans select-none text-slate-100 bg-slate-950/70" id="portfolio-app-shell">
      {/* Dynamic particles and gradients background */}
      <BackgroundElements />

      {/* Global Navigation Header / Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo & title brand markup */}
          <div 
            onClick={() => handleTabChange("dashboard")}
            className="flex items-center space-x-2.5 cursor-pointer group"
            id="brand-logo"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 font-extrabold text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform duration-200">
              M
            </div>
            <div>
              <span className="block text-sm font-black tracking-wider text-slate-100 uppercase font-mono">Mayuresh S.</span>
              <span className="block text-[10px] text-cyan-400 font-bold font-mono tracking-widest leading-none">PERFORMANCE EXP</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`relative px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-xl cursor-pointer ${
                  activeTab === item.id
                    ? "text-cyan-400 bg-slate-900/60 font-mono border border-cyan-500/10"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/20"
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 inset-x-4 h-[2px] bg-cyan-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Empty desktop-contacts to maintain layout grid space */}
          <div className="hidden md:block w-36" id="desktop-contacts-spacer" />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-xl border border-slate-800 bg-slate-900/40 p-2 text-slate-400 hover:text-slate-100 focus:outline-none pointer-events-auto cursor-pointer"
            aria-label="Responsive Menu toggle"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Responsive Navigation Draw overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-900 bg-slate-950/95 backdrop-blur-lg overflow-hidden absolute top-16 inset-x-0 z-30"
            id="mobile-navigation-panel"
          >
            <div className="space-y-1.5 px-4 pt-3 pb-5 text-sm select-none">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold font-mono tracking-wider uppercase transition-colors ${
                    activeTab === item.id
                      ? "bg-cyan-950/30 text-cyan-400 border border-cyan-500/10"
                      : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout Panels (Scrollable and dynamic) */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            id="panels-canvas"
          >
            {activeTab === "dashboard" && (
              <>
                {/* Hero Section Banner with mouse coordination */}
                <Hero onNavigate={handleTabChange} />

                {/* Performance Analytics Dashboard widgets */}
                <PerformanceDashboard />

                {/* Section Quick Divider Banner */}
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 select-none">
                  <div className="rounded-2xl border border-slate-900 bg-gradient-to-r from-cyan-950/10 via-slate-950/40 to-indigo-950/10 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6" id="dashboard-cta-divider">
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-cyan-400" />
                        <span>Exponential Social Media Reach</span>
                      </h4>
                      <p className="text-xs text-slate-400 max-w-xl">
                        Explore how Mayuresh established a viral social structure inside 90 days for major local real-estate giants.
                      </p>
                    </div>
                    <button
                      onClick={() => handleTabChange("case_studies")}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group"
                    >
                      <span>Explore Social Case Study</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "case_studies" && (
              <CaseStudies />
            )}

            {activeTab === "resume" && (
              <ProfileResume />
            )}

            {activeTab === "leads" && (
              <LeadsLog />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Foot / Footer copyright and meta facts info */}
      <footer className="border-t border-slate-900 bg-slate-950/50 py-10 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-slate-500 font-mono">
          <div className="flex flex-col space-y-1 text-left">
            <span className="font-bold text-slate-400">Mayuresh Sawant — Online Marketing Engineer Portfolio</span>
            <span className="text-slate-500">Targeting high-ticket luxury real estate, healthcare, and international programmatic leads.</span>
            <button 
              onClick={() => handleTabChange("leads")}
              className="text-left text-[10px] text-slate-600 hover:text-teal-500 transition-colors cursor-pointer mt-1 font-bold underline"
            >
              🔒 Administrative Lead Console Access
            </button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <span>Mumbai & Relocating</span>
            <span className="text-slate-700">|</span>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-400 transition-colors underline">{PERSONAL_INFO.email}</a>
            <span className="text-slate-700">|</span>
            <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-cyan-400 transition-colors">{PERSONAL_INFO.phone}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
