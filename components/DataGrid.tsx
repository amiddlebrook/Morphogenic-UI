import React from 'react';
import { motion } from 'framer-motion';

export const GeneSequencer: React.FC = () => {
  const MotionDiv = motion.div as any;
  
  // Generate fake DNA sequence data
  const genes = Array.from({ length: 20 }).map((_, i) => ({
    id: `SEQ-${i}`,
    codons: Array.from({ length: 12 }).map(() => ['A', 'C', 'G', 'T'][Math.floor(Math.random() * 4)]),
    integrity: Math.floor(Math.random() * 30) + 70
  }));

  return (
    <div className="h-full p-8 overflow-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-light text-bio-primary mb-2">Gene Sequencer</h1>
        <p className="text-bio-text/60">Decoding systemic data strings.</p>
      </header>

      <div className="flex flex-col gap-4">
        {genes.map((gene, i) => (
          <MotionDiv 
            key={gene.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 group"
          >
            {/* ID Label */}
            <div className="w-20 text-xs font-mono opacity-50">{gene.id}</div>
            
            {/* Chromosome Bar */}
            <div className="flex-1 h-12 bg-bio-surface/50 rounded-full border border-bio-border flex items-center px-4 overflow-hidden relative backdrop-blur-sm group-hover:border-bio-primary/50 transition-colors">
               <div className="flex gap-1 w-full justify-between">
                 {gene.codons.map((codon, j) => (
                   <div 
                    key={j} 
                    className={`
                      w-full h-8 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity
                      ${codon === 'A' ? 'bg-bio-primary' : 
                        codon === 'C' ? 'bg-bio-secondary' : 
                        codon === 'G' ? 'bg-white' : 'bg-bio-surface border border-bio-border'}
                    `}
                   />
                 ))}
               </div>
            </div>

            {/* Integrity Score */}
            <div className="w-16 text-right font-mono text-bio-primary">
              {gene.integrity}%
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};