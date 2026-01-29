import React, { useState, useEffect } from 'react';
import { LedMatrixBackground } from './components/LedMatrixBackground';
import { TiltCard } from './components/TiltCard';
import { Navbar } from './components/Navbar';
import { MouseState } from './types';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [mouseState, setMouseState] = useState<MouseState>({ x: 0, y: 0, isHovering: false });

  // Track global mouse movement for effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseState({
        x: e.clientX,
        y: e.clientY,
        isHovering: true
      });
    };

    const handleMouseLeave = () => {
       setMouseState(prev => ({ ...prev, isHovering: false }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-[#FF8500] selection:text-white overflow-hidden bg-[#020617]">
      
      {/* Dynamic Background */}
      <LedMatrixBackground mouseState={mouseState} />

      {/* Navigation */}
      <Navbar />

      {/* Main Hero Content */}
      <main className="relative z-10 pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center min-h-screen">
        
        {/* Text Column */}
        <div className="flex-1 text-center lg:text-left mb-16 lg:mb-0">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/30 border border-[#FF8500]/20 text-[#FF8500] text-[11px] font-bold tracking-widest uppercase mb-8 animate-fade-in-up shadow-[0_0_15px_-5px_#FF8500]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8500] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF8500]"></span>
            </span>
            Líderes en el Sur de Chile
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Pantallas LED
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF8500] via-orange-500 to-red-500">
              & Publicidad Exterior
            </span>
          </h1>

          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            Soluciones profesionales de publicidad digital y pantallas LED de alta calidad para tu negocio en el sur de Chile. Transformamos espacios en oportunidades de comunicación efectiva.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-14">
            <button className="group relative px-8 py-4 bg-[#FF8500] text-white rounded-lg font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,133,0,0.4)]">
               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               <span className="relative flex items-center gap-2">
                 Ver Catálogo
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </span>
            </button>
            <button className="px-8 py-4 bg-transparent border border-slate-700 text-slate-300 rounded-lg font-semibold hover:bg-slate-800/50 hover:border-[#FF8500]/50 hover:text-white transition-all">
              Contactar Experto
            </button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-slate-500 font-medium">
             <div className="flex items-center gap-2 group cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#FF8500] group-hover:scale-110 transition-transform" /> 
                <span className="group-hover:text-slate-300 transition-colors">Indoor / Outdoor</span>
             </div>
             <div className="flex items-center gap-2 group cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#FF8500] group-hover:scale-110 transition-transform" /> 
                <span className="group-hover:text-slate-300 transition-colors">Alta Resolución</span>
             </div>
             <div className="flex items-center gap-2 group cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#FF8500] group-hover:scale-110 transition-transform" /> 
                <span className="group-hover:text-slate-300 transition-colors">Soporte Técnico</span>
             </div>
          </div>
        </div>

        {/* Interactive Visual Column */}
        <div className="flex-1 w-full flex justify-center lg:justify-end perspective-container">
           <TiltCard mouseState={mouseState} />
        </div>
      </main>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-bounce cursor-pointer hover:text-[#FF8500] transition-colors">
         <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Descubre Más</span>
         <ChevronDown className="w-5 h-5 opacity-60" />
      </div>

    </div>
  );
};

export default App;