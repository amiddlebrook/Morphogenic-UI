import React from 'react';
import { motion } from 'framer-motion';
import { ViewState } from '../types';

interface SpineProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const VertebralSpine: React.FC<SpineProps> = ({ activeView, onNavigate }) => {
  const MotionButton = motion.button as any;

  const items = [
    { id: ViewState.CELLULAR, label: 'CELLULAR', icon: '●' },
    { id: ViewState.GENETIC, label: 'GENETIC', icon: '☰' },
    { id: ViewState.MYCELIAL, label: 'MYCELIAL', icon: '☊' },
    { id: ViewState.SYNAPTIC, label: 'SYNAPTIC', icon: '⚡' },
  ];

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8 items-center">
      {/* The Spine Line */}
      <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-bio-primary/30 to-transparent left-1/2 -translate-x-1/2 -z-10" />

      {items.map((item, i) => {
        const isActive = activeView === item.id;
        return (
          <MotionButton
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="relative group"
            whileHover={{ scale: 1.2 }}
            animate={{ scale: isActive ? 1.2 : 1 }}
          >
            {/* The Vertebra Node */}
            <div className={`
              w-12 h-12 flex items-center justify-center
              rounded-full border transition-all duration-500
              ${isActive 
                ? 'bg-bio-primary text-black border-bio-primary shadow-[0_0_20px_rgba(158,255,197,0.4)]' 
                : 'bg-bio-surface text-bio-primary border-bio-border hover:border-bio-primary'
              }
            `}>
              <span className="text-xl">{item.icon}</span>
            </div>

            {/* Label (Shows on Hover) */}
            <div className={`
              absolute left-16 top-1/2 -translate-y-1/2
              px-3 py-1 rounded-full bg-bio-surface border border-bio-border
              text-xs tracking-widest text-bio-primary
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
              whitespace-nowrap pointer-events-none
            `}>
              {item.label}
            </div>
          </MotionButton>
        );
      })}
    </nav>
  );
};