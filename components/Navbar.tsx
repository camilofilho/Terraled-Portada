import React from 'react';
import { Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between backdrop-blur-md bg-slate-950/70 border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-[#FF8500]/10 rounded-lg border border-[#FF8500]/20">
            <Zap className="text-[#FF8500] w-6 h-6" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">
          LUMINA<span className="text-[#FF8500]">LED</span>
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#soluciones" className="hover:text-white transition-colors">Soluciones</a>
        <a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a>
        <a href="#tecnologia" className="hover:text-white transition-colors">Tecnología</a>
        <button className="px-6 py-2.5 rounded-full bg-white text-slate-950 hover:bg-[#FF8500] hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-wide shadow-lg hover:shadow-[#FF8500]/25">
          Cotizar Ahora
        </button>
      </div>
      
      <button className="md:hidden text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};