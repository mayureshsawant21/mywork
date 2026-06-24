/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#0A0A0B] text-slate-100">
      {/* Precision Digital Radial Grid Overlay from Professional Polish */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#2DD4BF 0.5px, transparent 0.5px)", 
          backgroundSize: "24px 24px" 
        }}
        id="bg-grid-overlay"
      />

      {/* Futuristic Glowing Ambient Orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-[#2DD4BF]/10 rounded-full blur-[120px]"
        id="ambient-orb-teal-top"
      />

      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[10%] -left-[10%] h-[400px] w-[400px] rounded-full bg-teal-500/5 blur-[130px]"
        id="ambient-orb-teal-bottom"
      />

      {/* Subtle digital particle overlay */}
      <div className="absolute inset-0 bg-transparent opacity-20 pointer-events-none">
        <div className="absolute top-24 left-1/4 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping [animation-duration:4s]" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-teal-400 rounded-full animate-ping [animation-duration:5s]" />
      </div>
    </div>
  );
}
