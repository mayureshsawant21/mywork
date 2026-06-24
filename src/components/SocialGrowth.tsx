/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Sparkles, 
  LineChart, 
  Play, 
  Smartphone,
  ChevronRight,
  TrendingUp,
  MessageCircle,
  Hash
} from "lucide-react";
import { PARADIGM_GROWTH_DATA, SOCIAL_TACTICS } from "../data";

export default function SocialGrowth() {
  const [activeTab, setActiveTab] = useState<"chart" | "tactics" | "grid">("chart");

  // Sum followers growth calculation
  const startFollowers = PARADIGM_GROWTH_DATA[0].instagram + PARADIGM_GROWTH_DATA[0].linkedin + PARADIGM_GROWTH_DATA[0].facebook;
  const peakFollowers = PARADIGM_GROWTH_DATA[11].instagram + PARADIGM_GROWTH_DATA[11].linkedin + PARADIGM_GROWTH_DATA[11].facebook;
  const netGrowth = peakFollowers - startFollowers;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12" id="social-growth-root">
      
      {/* Page Header */}
      <div className="flex flex-col space-y-3">
        <div className="inline-flex items-center space-x-1.5 text-teal-400 text-xs font-bold tracking-widest uppercase">
          <Instagram className="h-4 w-4 text-teal-400 animate-pulse" />
          <span>Social Media Case Study</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-100 tracking-tight sm:text-4xl">
          Paradigm Realty: Grew 5K+ Targeted Social Followers in 3 Months
        </h2>
        <p className="max-w-3xl text-slate-400 text-sm sm:text-base">
          Case study on how Mayuresh established a premium visual aesthetic and orchestrated direct-to-buyer lead-capture pipelines under 90 days. Gaining organic and targeted real estate followings without premium ad overhead.
        </p>
      </div>

      {/* Social Networks Quick Highlights Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="social-channels-banner">
        
        {/* Net growth badge summary */}
        <div className="rounded-2xl border border-dashed border-teal-500/30 bg-teal-950/20 p-5 flex flex-col justify-between">
          <div>
            <Sparkles className="h-6 w-6 text-teal-400 animate-bounce" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4 block">NET SOCIAL GROWTH</span>
            <h4 className="text-3xl font-black text-teal-400 mt-1">+{netGrowth.toLocaleString()}</h4>
          </div>
          <p className="text-xs text-slate-300 mt-4 leading-relaxed">
            Consistently targeted local Mumbai-based home buyers and international NRIs spanning Instagram, LinkedIn, and Facebook.
          </p>
        </div>

        {/* Facebook Page report card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-950 p-2.5 border border-blue-500/20 text-blue-400">
              <Facebook className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/20">
              +166% Growth
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Facebook Business Reach</p>
          <h4 className="text-2xl font-black text-slate-200 mt-0.5">4,000 Followers</h4>
          <p className="text-xs text-slate-400 mt-2">Driven by neighborhood spotlight discussions and community groups.</p>
        </div>

        {/* Instagram Page report card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-pink-950 p-2.5 border border-pink-500/20 text-pink-400">
              <Instagram className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/20">
              +530% Growth
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Instagram Profile Active</p>
          <h4 className="text-2xl font-black text-slate-200 mt-0.5">7,600 Followers</h4>
          <p className="text-xs text-slate-400 mt-2">Fueled by AI drone render reels & premium puzzle feeds.</p>
        </div>

        {/* LinkedIn Professional Page report card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-teal-950 p-2.5 border border-teal-500/20 text-teal-400">
              <Linkedin className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/20">
              +425% Growth
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">LinkedIn Corporate Feed</p>
          <h4 className="text-2xl font-black text-slate-200 mt-0.5">4,200 Followers</h4>
          <p className="text-xs text-slate-400 mt-2">Propelled by project delivery metrics & executive thought leadership.</p>
        </div>

      </div>

      {/* Main Switch Tabs Navigation */}
      <div className="flex border-b border-slate-800" id="social-nav-tabs">
        {[
          { id: "chart", label: "Weeks-over-Week Growth curve", icon: LineChart },
          { id: "tactics", label: "Growth Framework & Strategy", icon: Sparkles },
          { id: "grid", label: "Aesthetic Grid Concept", icon: Smartphone }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-6 py-4 border-b-2 text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-teal-500 text-teal-400 bg-teal-950/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/20"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels Contents */}
      <div className="min-h-[400px]">
        {activeTab === "chart" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            id="growth-chart-tab"
          >
            {/* Recharts Area Chart */}
            <div className="lg:col-span-8 h-[380px] rounded-2xl border border-slate-800 bg-slate-900/20 p-5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={PARADIGM_GROWTH_DATA}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLinkedin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #14b8a6", borderRadius: "12px", color: "#f8fafc" }}
                  />
                  <Legend iconType="circle" />
                  <Area type="monotone" dataKey="instagram" name="Instagram Followers" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorInstagram)" />
                  <Area type="monotone" dataKey="linkedin" name="LinkedIn Connections" stroke="#2dd4bf" strokeWidth={2} fillOpacity={1} fill="url(#colorLinkedin)" />
                  <Area type="monotone" dataKey="facebook" name="Facebook Followers" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorFacebook)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Growth Annotations & Commentary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">MILESTONE 1 -- WEEK 4</span>
                <h4 className="text-base font-bold text-white mt-1">AI Video Pipeline Rollout</h4>
                <p className="text-xs text-slate-450 text-slate-400 mt-2 leading-relaxed">
                  Began publishing Midjourney architecture mockups mapped with Runway AI drone panning shots on Instagram Reels. Organic Reach expanded overnight to 120,000+ views.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">MILESTONE 2 -- WEEK 8</span>
                <h4 className="text-base font-bold text-white mt-1">Mumbai Real-Estate Education Series</h4>
                <p className="text-xs text-slate-450 text-slate-400 mt-2 leading-relaxed">
                  Published structured reels explaining 'How to spot fraud RERA listings in Mumbai' and 'RERA registration checklist', resulting in +2.5K shares and exponential savings on outbound marketing.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">MILESTONE 3 -- WEEK 12</span>
                <h4 className="text-base font-bold text-white mt-1">Automated WhatsApp Stickers Trigger</h4>
                <p className="text-xs text-slate-450 text-slate-400 mt-2 leading-relaxed">
                  Combined comment triggers ('BROCHURE') to automatically dispatch complete high-res PDFs via custom-engineered CRM chatbot API, bringing 450+ lead signups organically.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "tactics" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            id="tactics-panel"
          >
            {SOCIAL_TACTICS.map((tact, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest bg-teal-950/50 border border-teal-500/25 px-3 py-1 rounded-full inline-block">
                    {tact.metric}
                  </span>
                  <h4 className="text-lg font-bold text-slate-100 tracking-tight mt-4">{tact.title}</h4>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                    {tact.descr}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors text-xs font-semibold cursor-pointer mt-6">
                  <span>View campaign assets</span>
                  <ChevronRight className="h-4.5 w-4.5" />
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "grid" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            id="grid-preview-panel"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-xl font-bold text-white">Visual Cohesion & Elite Layout Standards</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Most real-estate feeds are generic, random grids of pricing flyers. For **Paradigm Realty**, Mayuresh established a unified luxury visual canvas combining high-society photography with clean gold and graphite colors.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { tag: "Legacy", label: "40 Years of Excellence highlight reel" },
                  { tag: "Grateful", label: "Customer appreciation walk-throughs" },
                  { tag: "Unveiling", label: "Gated luxury smart homes launch" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                    <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono font-bold text-teal-400 uppercase">{item.tag}</span>
                    <span className="text-xs text-slate-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Mock Instagram Frame layout */}
            <div className="lg:col-span-8 flex justify-center">
              <div className="w-full max-w-[500px] rounded-3xl border-8 border-slate-900 bg-black p-4 shadow-2xl relative overflow-hidden">
                {/* Simulated Notch */}
                <div className="absolute top-0 inset-x-0 h-4 bg-slate-900 flex justify-center items-center">
                  <div className="w-20 h-2 bg-black rounded-b-md" />
                </div>

                {/* Simulated App Header */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-3 mt-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 p-0.5">
                      <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
                        <Instagram className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[11px] font-bold text-slate-200">paradigmrealty__official</h5>
                      <p className="text-[8px] text-slate-400">Mumbai, India</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 rotate-90" />
                </div>

                {/* Simulated Grid of Posts */}
                <div className="grid grid-cols-3 gap-2 pt-3" id="instagram-mock-grid">
                  {[
                    { img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=300", title: "Luxury Sky-Villa Launch" },
                    { img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=300", title: "Smart Gate Access" },
                    { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=300", title: "Ocean View Balcony" },
                    { img: "https://images.unsplash.com/photo-1626808642875-0aa545452faa?auto=format&fit=crop&q=80&w=300", title: "RERA Guidelines Vol 1" },
                    { img: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?auto=format&fit=crop&q=80&w=300", title: "Rustomjee Seasons BKC" },
                    { img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=300", title: "Infinite Pool Sunset" },
                  ].map((post, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-900 cursor-pointer">
                      <img 
                        src={post.img} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-center items-center p-2 text-center text-white">
                        <Play className="h-5 w-5 text-teal-400 mb-1" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">{post.title}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated interaction stats */}
                <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-200">19,742 Total Followers</span>
                  <span className="text-teal-400 font-bold">5.3K added in under 90 Days</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

    </section>
  );
}
