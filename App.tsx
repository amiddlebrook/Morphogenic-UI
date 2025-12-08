import React, { useState } from 'react';
import { ViewState } from './types';
import { VertebralSpine } from './components/SolarNavigation';
import { CellularDashboard } from './components/Dashboard';
import { GeneSequencer } from './components/DataGrid';
import { MyceliumNetwork } from './components/ProcessFlow';
import { SynapticAnalytics } from './components/ControlPanel';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(ViewState.CELLULAR);

  return (
    <div className="h-screen w-screen bg-bio-bg text-bio-text relative overflow-hidden">
      {/* Background Layers */}
      <div className="turing-pattern" />
      <div className="noise-overlay" />
      
      {/* Ambient Glows */}
      <div className="fixed -top-1/2 -left-1/2 w-[100vw] h-[100vw] bg-bio-primary opacity-[0.03] blur-[150px] rounded-full animate-breathe" />
      <div className="fixed -bottom-1/2 -right-1/2 w-[100vw] h-[100vw] bg-bio-secondary opacity-[0.03] blur-[150px] rounded-full animate-breathe" style={{ animationDelay: '4s' }} />

      {/* Main Layout */}
      <div className="relative z-10 flex h-full">
        {/* Navigation */}
        <div className="w-24 flex-shrink-0">
          <VertebralSpine activeView={activeView} onNavigate={setActiveView} />
        </div>

        {/* Content Area */}
        <main className="flex-1 h-full p-6 pl-12">
           <div className="h-full w-full max-w-7xl mx-auto">
             {activeView === ViewState.CELLULAR && <CellularDashboard />}
             {activeView === ViewState.GENETIC && <GeneSequencer />}
             {activeView === ViewState.MYCELIAL && <MyceliumNetwork />}
             {activeView === ViewState.SYNAPTIC && <SynapticAnalytics />}
           </div>
        </main>
      </div>
    </div>
  );
};

export default App;