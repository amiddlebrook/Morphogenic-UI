import React from 'react';
import { motion } from 'framer-motion';

export const MyceliumNetwork: React.FC = () => {
  const MotionDiv = motion.div as any;

  // A simple tree structure for visualization
  const nodes = [
    { x: 50, y: 10, label: "Seed" },
    { x: 30, y: 40, label: "Hyphae A" },
    { x: 70, y: 40, label: "Hyphae B" },
    { x: 20, y: 70, label: "Spore 1" },
    { x: 40, y: 70, label: "Spore 2" },
    { x: 60, y: 70, label: "Spore 3" },
    { x: 80, y: 70, label: "Spore 4" },
  ];

  return (
    <div className="h-full p-8 relative flex items-center justify-center">
      <div className="absolute top-8 left-8">
        <h1 className="text-4xl font-light text-bio-primary mb-2">Mycelium Network</h1>
        <p className="text-bio-text/60">Root-level process distribution.</p>
      </div>

      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M 50% 10% L 30% 40%" stroke="rgba(158, 255, 197, 0.2)" strokeWidth="1" />
        <path d="M 50% 10% L 70% 40%" stroke="rgba(158, 255, 197, 0.2)" strokeWidth="1" />
        <path d="M 30% 40% L 20% 70%" stroke="rgba(158, 255, 197, 0.2)" strokeWidth="1" />
        <path d="M 30% 40% L 40% 70%" stroke="rgba(158, 255, 197, 0.2)" strokeWidth="1" />
        <path d="M 70% 40% L 60% 70%" stroke="rgba(158, 255, 197, 0.2)" strokeWidth="1" />
        <path d="M 70% 40% L 80% 70%" stroke="rgba(158, 255, 197, 0.2)" strokeWidth="1" />
        
        {/* Animated Pulses */}
        <circle r="3" fill="#9EFFC5">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 50% 10% L 30% 40% L 20% 70%" />
        </circle>
        <circle r="3" fill="#FF9EAE">
          <animateMotion dur="4s" repeatCount="indefinite" path="M 50% 10% L 70% 40% L 80% 70%" />
        </circle>
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <MotionDiv
          key={i}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.2 }}
        >
          <div className="relative group cursor-pointer">
             <div className="w-4 h-4 rounded-full bg-bio-surface border border-bio-primary group-hover:scale-150 transition-transform duration-300" />
             <div className="absolute w-24 left-6 top-1/2 -translate-y-1/2 text-xs text-bio-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {node.label}
             </div>
             {/* Glow effect */}
             <div className="absolute inset-0 bg-bio-primary blur-md opacity-20 group-hover:opacity-60 transition-opacity" />
          </div>
        </MotionDiv>
      ))}
    </div>
  );
};