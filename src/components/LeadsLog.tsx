/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, Clipboard, RefreshCw, KeyRound, ShieldAlert, Award, FileSpreadsheet, Sparkles, LogOut, Phone, Mail, Clock } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  role: string;
  urgency: string;
  createdAt: string;
}

export default function LeadsLog() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Authenticate & Load leads
  const fetchLeads = async (pass: string) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`/api/leads?password=${pass}`);
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
        setIsAuthorized(true);
        // Save authorization to session storage
        sessionStorage.setItem("leads_auth_key", pass);
      } else {
        setErrorMsg("Failed to authenticate with security gate.");
      }
    } catch (err) {
      setErrorMsg("Incorrect passcode. Secure access restricted.");
      sessionStorage.removeItem("leads_auth_key");
    } finally {
      setIsLoading(false);
    }
  };

  // Try checking storage on first load
  useEffect(() => {
    const cachedPass = sessionStorage.getItem("leads_auth_key");
    if (cachedPass) {
      setPassword(cachedPass);
      fetchLeads(cachedPass);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg("Passcode field is required");
      return;
    }
    fetchLeads(password);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("leads_auth_key");
    setPassword("");
    setLeads([]);
    setIsAuthorized(false);
  };

  // Format datestring
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateStr;
    }
  };

  if (!isAuthorized) {
    return (
      <div className="py-24 px-4 max-w-md mx-auto space-y-8" id="leads-gate">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-rose-500/30 bg-slate-900/30 p-8 backdrop-blur-md shadow-[0_0_50px_rgba(239,68,68,0.05)] text-center space-y-6"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-slate-950 shadow-lg">
            <KeyRound className="h-6 w-6 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase font-mono">Lead Operations Guard</h2>
            <p className="text-xs text-slate-400">
              This terminal is password restricted. Enter lead verification code to audit organic visitor queries.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Secured Passcode</label>
              <input 
                required
                type="password" 
                placeholder="******" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-center tracking-widest text-lg rounded-xl bg-slate-950 border border-slate-800 p-3 focus:border-rose-500 focus:outline-none text-slate-100 placeholder-slate-700"
              />
            </div>

            {errorMsg && (
              <div className="flex items-center space-x-1.5 justify-center text-xs text-rose-400 bg-rose-950/10 border border-rose-500/10 py-2 rounded-lg font-semibold">
                <ShieldAlert className="h-4 w-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-bold py-3 px-4 text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Unlocking vault..." : "Unlock Terminal Leads"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8" id="leads-panel">
      
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-1">
            <Award className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>Operational Admin Dashboard</span>
          </div>
          <h2 className="text-2xl font-black text-slate-105 text-white tracking-tight sm:text-3xl uppercase font-mono">
            Organic Lead Inquiries Log
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time pipeline containing corporate roles, contact information, and desired employment notice urgency.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => fetchLeads(password)}
            className="flex items-center space-x-1 px-3 py-2 border border-slate-800 bg-slate-900/40 text-xs rounded-xl font-bold text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Sync Live</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-1 px-3 py-2 border border-rose-500/20 bg-rose-950/10 text-xs rounded-xl font-bold text-rose-400 hover:bg-rose-900/10 transition cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Lock Console</span>
          </button>
        </div>
      </div>

      {/* Aggregate counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="leads-aggregates">
        <div className="rounded-xl border border-slate-850 bg-slate-900/20 p-4">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Cumulative Queries</span>
          <span className="text-2xl font-black text-slate-205 text-white block mt-1">{leads.length}</span>
        </div>
        <div className="rounded-xl border border-slate-850 bg-slate-900/20 p-4">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block font-mono">Immediate Openings</span>
          <span className="text-2xl font-black text-emerald-400 block mt-1">
            {leads.filter(l => l.urgency === "Immediate").length}
          </span>
        </div>
        <div className="rounded-xl border border-slate-850 bg-slate-900/20 p-4">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Avg Engagement Rate</span>
          <span className="text-2xl font-black text-cyan-400 block mt-1">100% Organics</span>
        </div>
        <div className="rounded-xl border border-slate-850 bg-slate-900/20 p-4">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Terminal Security</span>
          <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block mt-3 font-mono">Authorized</span>
        </div>
      </div>

      {/* Lead Cards List */}
      <div className="space-y-4" id="leads-records-list">
        {leads.length === 0 ? (
          <div className="rounded-2xl border border-slate-900 bg-slate-950/40 p-12 text-center" id="empty-leads">
            <FileSpreadsheet className="h-10 w-10 text-slate-600 mx-auto animate-bounce mb-3" />
            <h4 className="text-sm font-bold text-slate-350 text-slate-300">Terminal Log Empty</h4>
            <p className="text-xs text-slate-550 text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
              No organic leads submitted yet. Run a simulated test on the Contact section inside the Resume page!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {leads.map((lead) => (
              <div 
                key={lead.id} 
                className="rounded-2xl border border-slate-850 bg-slate-900/20 p-5 hover:border-emerald-500/25 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-xl">
                  {/* Lead headers info */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-black text-white">{lead.name}</h3>
                    {lead.company && (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-950/60 border border-slate-850 px-2.5 py-0.5 rounded-md">
                        {lead.company}
                      </span>
                    )}
                    {lead.role && (
                      <span className="text-[10px] font-bold text-cyan-450 text-cyan-400 bg-cyan-950/20 border border-cyan-500/10 px-2.5 py-0.5 rounded-md">
                        {lead.role}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-300">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3.5 w-3.5 text-slate-500" />
                      <span>{lead.email}</span>
                      <button 
                        onClick={() => handleCopyText(lead.email, `${lead.id}-email`)} 
                        className="p-1 hover:text-emerald-400 transition"
                      >
                        {copiedId === `${lead.id}-email` ? <Check className="h-3 w-3 text-emerald-400" /> : <Clipboard className="h-3 w-3 text-slate-600" />}
                      </button>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3.5 w-3.5 text-slate-500" />
                        <span>{lead.phone}</span>
                        <button 
                          onClick={() => handleCopyText(lead.phone, `${lead.id}-phone`)} 
                          className="p-1 hover:text-emerald-400 transition"
                        >
                          {copiedId === `${lead.id}-phone` ? <Check className="h-3 w-3 text-emerald-400" /> : <Clipboard className="h-3 w-3 text-slate-600" />}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Submitted: {formatDate(lead.createdAt)}</span>
                  </div>
                </div>

                {/* Urgency Badge */}
                <div className="flex flex-col items-start md:items-end space-y-1 shrink-0">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Urgency Timeline</span>
                  <span className={`px-3.5 py-1.5 rounded-xl text-xs font-black tracking-wide uppercase font-mono ${
                    lead.urgency === "Immediate" 
                      ? "bg-rose-950 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                      : lead.urgency.includes("15")
                      ? "bg-amber-950 text-amber-400 border border-amber-500/20"
                      : "bg-slate-950 text-slate-400 border border-slate-850"
                  }`}>
                    {lead.urgency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
