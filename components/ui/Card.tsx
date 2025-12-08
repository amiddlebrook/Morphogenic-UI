import React from 'react';
import { motion } from 'framer-motion';

interface OrganicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const OrganicCard: React.FC<OrganicCardProps> = ({ children, className = '', delay = 0 }) => {
  const MotionDiv = motion.div as any;

  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      // Fluid border radius morphing slightly
      className={`
        relative backdrop-blur-xl bg-bio-glass border border-bio-border
        shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        rounded-[20px]
        overflow-hidden
        ${className}
      `}
      whileHover={{ 
        boxShadow: "0 0 25px rgba(158, 255, 197, 0.15)",
        borderColor: "rgba(158, 255, 197, 0.4)"
      }}
    >
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Inner Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </MotionDiv>
  );
};