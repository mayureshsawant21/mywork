/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  Layers, 
  MapPin, 
  CheckCircle,
  TrendingUp, 
  Plus, 
  X,
  Sparkles,
  ArrowUpRight,
  Filter
} from "lucide-react";
import { CASE_STUDIES } from "../data";
import { CaseStudy } from "../types";
import SocialGrowth from "./SocialGrowth";

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Performance" | "Social" | "International" | "Healthcare">("All");
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  // Filter study records matching category selection
  const filteredStudies = CASE_STUDIES.filter(study => {
    if (selectedCategory === "All") return true;
    return study.category === selectedCategory;
  });

  return (
    <div className="space-y-16" id="case-studies-page-wrapper">
      {/* Paradigm Social Growth Case Study at the absolute top of the Case Studies */}
      <div className="border-b border-slate-800 pb-4" id="top-social-growth">
        <SocialGrowth />
      </div>

      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12" id="case-studies-root">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-teal-400 text-xs font-bold tracking-widest uppercase">
            <Briefcase className="h-4 w-4 text-teal-400 animate-pulse" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight sm:text-4xl">
            In-Depth Performance Case Studies
          </h2>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base">
            Detailed breakdown of advertising spends, operational funnels, and programmatic achievements managed for major Indian and Gulf developers.
          </p>
        </div>

        {/* Filter Badges selection */}
        <div className="flex flex-wrap gap-2 items-center text-xs select-none" id="case-studies-filters">
          <span className="text-slate-400 flex items-center space-x-1 mr-2 bg-slate-900/60 p-2 border border-slate-800 rounded-lg">
            <Filter className="h-3.5 w-3.5 text-teal-400 animate-pulse" />
            <span>Filter sector:</span>
          </span>
          {[
            { id: "All", label: "All Works" },
            { id: "Performance", label: "Performance Ads" },
            { id: "Social", label: "Social Overhaul" },
            { id: "International", label: "Global / NRI" },
            { id: "Healthcare", label: "Healthcare" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold border transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "border-teal-500 bg-teal-950/40 text-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.15)]"
                  : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-teal-500/40 hover:text-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Work Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="case-studies-grid">
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={study.id}
              onClick={() => setSelectedStudy(study)}
              className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md flex flex-col justify-between cursor-pointer hover:border-teal-500/50 hover:bg-slate-900/60 transition-all flex-shrink-0"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-teal-400 tracking-wider bg-teal-950/40 border border-teal-500/20 px-2.5 py-0.5 rounded-md uppercase">
                    {study.category} Sector
                  </span>
                  <div className="h-8 w-8 rounded-full bg-slate-950 flex items-center justify-center text-slate-400 group-hover:bg-teal-400 group-hover:text-slate-950 transition-colors">
                    <ArrowUpRight className="h-4.5 w-4.5" />
                  </div>
                </div>

                {/* Cover Unsplash Image */}
                <div className="h-40 rounded-xl overflow-hidden relative border border-slate-800/40">
                  <img 
                    src={study.image} 
                    alt={study.client} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h4 className="text-xs font-bold text-teal-400 uppercase tracking-widest">{study.client}</h4>
                    <h3 className="text-base font-bold text-slate-100 mt-0.5">{study.title}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {study.description}
                </p>

                {/* Compact Highlights Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {study.channels.slice(0, 2).map((ch, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-950/65 border border-slate-850 px-2 py-0.5 rounded text-slate-400 font-mono">
                      {ch}
                    </span>
                  ))}
                  {study.channels.length > 2 && (
                    <span className="text-[10px] bg-teal-950/30 border border-teal-500/20 px-2 py-0.5 rounded text-teal-450 text-teal-400 font-black font-mono">
                      +{study.channels.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Metrics foot panel */}
              <div className="grid grid-cols-2 gap-2 border-t border-slate-800 mt-6 pt-4 text-xs font-mono">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Spends Alloc.</p>
                  <p className="font-extrabold text-slate-200 mt-0.5 ">{study.metrics.spends}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Avg CPL</p>
                  <p className="font-extrabold text-emerald-400 mt-0.5">{study.metrics.cpl}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Strategy Detail Modal Overlay */}
      <AnimatePresence>
        {selectedStudy && (
          <div 
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            id="case-study-modal-container"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-[#0F172A] p-6 sm:p-8 shadow-[0_0_50px_rgba(45,212,191,0.15)] space-y-6 max-h-[90vh] overflow-y-auto"
              id="case-study-modal-card"
            >
              {/* Close Button absolute */}
              <button
                onClick={() => setSelectedStudy(null)}
                className="absolute top-4 right-4 rounded-xl p-2 bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800 transition-colors pointer-events-auto cursor-pointer"
                id="close-modal-btn"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Top Meta Details */}
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-mono font-bold text-teal-400 tracking-widest uppercase">
                  ACTIVE STRATEGY DEBRiEF -- {selectedStudy.category} SECTION
                </span>
                <h3 className="text-2xl font-black text-white">{selectedStudy.client}</h3>
                <p className="text-base font-bold text-slate-300">{selectedStudy.title}</p>
              </div>

              {/* Unsplash Large Cover photo representing brand */}
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden relative border border-slate-800">
                <img 
                  src={selectedStudy.image} 
                  alt={selectedStudy.client} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Absolute overlay tag for validated leads */}
                <div className="absolute bottom-4 left-4 inline-flex items-center space-x-2 rounded-full bg-[#132A26]/90 border border-teal-500/25 px-4 py-1 text-xs text-teal-300 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-teal-400 animate-spin [animation-duration:10s]" />
                  <span>Verified with Client CRM dashboards</span>
                </div>
              </div>

              {/* Grid of full statistical outputs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" id="modal-project-stats">
                {[
                  { label: "Budget Spent", val: selectedStudy.metrics.spends, color: "text-slate-200" },
                  { label: "Leads Harvested", val: selectedStudy.metrics.leads || "N/A", color: "text-teal-400" },
                  { label: "Average CPL", val: selectedStudy.metrics.cpl, color: "text-emerald-400" },
                  { label: "Resulting CTR", val: selectedStudy.metrics.ctr, color: "text-teal-300" },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-slate-950/60 p-4 border border-slate-850">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-2">{item.label}</p>
                    <p className={`text-base font-black ${item.color}`}>{item.val}</p>
                  </div>
                ))}
              </div>

              {/* Media channels details list */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Performance Distribution Channels:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudy.channels.map((ch, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300">
                      • {ch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sub-panels detailing Tactics & Case study narrative */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Performance Highlights Column */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-200 flex items-center space-x-2 border-b border-slate-800 pb-2">
                    <CheckCircle className="h-4 w-4 text-teal-400" />
                    <span>Creative Elements Built</span>
                  </h4>
                  <ul className="space-y-3">
                    {selectedStudy.highlights.map((hlt, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start space-x-1.5 leading-relaxed">
                        <span className="text-teal-400 text-lg mt-[-6px]">•</span>
                        <span>{hlt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* In-depth strategy Column */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-200 flex items-center space-x-2 border-b border-slate-800 pb-2">
                    <TrendingUp className="h-4 w-4 text-emerald-450 text-emerald-450 text-emerald-400" />
                    <span>Media Strategy Operational Details</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    How Mayuresh and his media planning team optimized spends and controlled quality:
                  </p>
                  <ul className="space-y-3">
                    {selectedStudy.details.map((dtl, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start space-x-1.5 leading-relaxed">
                        <span className="text-emerald-400 text-lg mt-[-6px]">•</span>
                        <span>{dtl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Quick closing notification box */}
              <div className="rounded-xl bg-teal-950/15 border border-teal-500/20 p-4 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-teal-300 block mb-1">Key Takeaway</span>
                "Maintaining an average click-through-rate exceeding 12% on high-ticket luxury real estate villas ensures continuous lead flow without running up expensive CPM fees."
              </div>

              {/* Close Button bottom */}
              <div className="flex justify-end pt-4 border-t border-slate-850">
                <button
                  onClick={() => setSelectedStudy(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-semibold cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  </div>
  );
}
