import React from 'react';
import { OrganicCard } from './ui/Card';

export const SynapticAnalytics: React.FC = () => {
  return (
    <div className="h-full p-8 flex flex-col gap-6">
       <header>
        <h1 className="text-4xl font-light text-bio-primary mb-2">Synaptic Activity</h1>
        <p className="text-bio-text/60">Neural density and firing rates.</p>
      </header>

      <div className="flex-1 grid grid-cols-3 gap-6">
         {/* Large Chart Area */}
         <OrganicCard className="col-span-2 p-6 flex items-end relative overflow-hidden">
             {/* Fake Bar Chart using fluid heights */}
             <div className="w-full flex justify-between items-end h-full gap-2 opacity-80">
                {[40, 65, 30, 80, 50, 90, 45, 70, 60, 85].map((h, i) => (
                    <div 
                        key={i} 
                        className="w-full bg-gradient-to-t from-bio-primary/20 to-bio-primary rounded-t-lg transition-all duration-1000 ease-in-out"
                        style={{ height: `${h}%` }} 
                    />
                ))}
             </div>
         </OrganicCard>

         {/* Side Metrics */}
         <div className="flex flex-col gap-6">
            <OrganicCard className="flex-1 p-6 flex flex-col justify-center items-center">
                 <div className="w-32 h-32 rounded-full border-4 border-bio-surface border-t-bio-primary animate-spin-slow flex items-center justify-center relative">
                    <span className="text-3xl font-light">98%</span>
                 </div>
                 <span className="mt-4 text-sm uppercase tracking-widest text-bio-secondary">Cognitive Load</span>
            </OrganicCard>
            
            <OrganicCard className="flex-1 p-6 flex flex-col justify-center">
                <div className="text-sm uppercase tracking-widest mb-2 opacity-60">Firing Rate</div>
                <div className="text-4xl text-bio-primary font-light">420 Hz</div>
            </OrganicCard>
         </div>
      </div>
    </div>
  );
};