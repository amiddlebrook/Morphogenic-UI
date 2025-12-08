import React from 'react';
import { OrganicCard } from './ui/Card';
import { motion } from 'framer-motion';

export const CellularDashboard: React.FC = () => {
  const MotionDiv = motion.div as any;
  
  // Simulated organic data
  const cells = [
    { title: "Metabolism", val: "94%", status: "Optimal" },
    { title: "Respiration", val: "120bpm", status: "High" },
    { title: "Signal", val: "-40dB", status: "Stable" },
    { title: "Membrane", val: "Intact", status: "Secure" },
  ];

  return (
    <div className="h-full p-8 overflow-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-light text-bio-primary mb-2">Cellular Overview</h1>
        <p className="text-bio-text/60">System homeostasis is stable. Mitosis active.</p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cells.map((cell, i) => (
          <OrganicCard key={i} delay={i * 0.1} className="h-48 p-6 flex flex-col justify-between group hover:bg-bio-primary/5 transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-sm uppercase tracking-widest opacity-60">{cell.title}</span>
              <div className="w-2 h-2 rounded-full bg-bio-primary animate-pulse-slow" />
            </div>
            
            <div className="text-5xl font-light text-bio-text group-hover:text-bio-primary transition-colors">
              {cell.val}
            </div>

            <div className="text-xs text-bio-secondary">{cell.status}</div>
            
            {/* Organic blob decoration */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-bio-primary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
          </OrganicCard>
        ))}
      </div>

      {/* Living Graph Placeholder */}
      <OrganicCard className="h-64 p-8 flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
           {/* Simple Sine Wave SVG */}
           <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none">
             <path d="M0 100 Q 250 50 500 100 T 1000 100" fill="none" stroke="#9EFFC5" strokeWidth="2" />
             <path d="M0 100 Q 250 150 500 100 T 1000 100" fill="none" stroke="#FF9EAE" strokeWidth="2" />
           </svg>
        </div>
        <div className="text-center z-10">
          <h3 className="text-2xl font-light mb-2">Homeostasis Graph</h3>
          <p className="text-sm opacity-50">Real-time biological rhythm monitoring</p>
        </div>
      </OrganicCard>
    </div>
  );
};