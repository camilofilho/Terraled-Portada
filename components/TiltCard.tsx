import React, { useRef, useState, useEffect } from 'react';
import { MouseState } from '../types';
import { Monitor, Activity } from 'lucide-react';

interface TiltCardProps {
  mouseState: MouseState;
}

export const TiltCard: React.FC<TiltCardProps> = ({ mouseState }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!cardRef.current) return;

    const { innerWidth, innerHeight } = window;
    
    // Calculate rotation based on mouse position
    const x = (mouseState.y - innerHeight / 2) / (innerHeight / 2) * -10; 
    const y = (mouseState.x - innerWidth / 2) / (innerWidth / 2) * 10;

    setRotation({ x, y });

  }, [mouseState]);

  return (
    <div 
      className="perspective-1000 w-full max-w-md mx-auto lg:mx-0"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transition-transform duration-100 ease-out group"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 rounded-2xl z-0 pointer-events-none"></div>
        
        {/* Content Layer */}
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2 text-[#FF8500]">
                <Activity size={20} className="animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase">En Vivo</span>
             </div>
             <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8500] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF8500]"></span>
             </div>
          </div>

          <div className="aspect-video bg-black rounded-lg border border-slate-800 overflow-hidden relative mb-6 shadow-inner group-hover:shadow-[#FF8500]/20 transition-all duration-500">
             {/* Simulated Screen Content */}
             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black">
                <Monitor size={48} className="text-white/20 group-hover:text-[#FF8500] transition-colors duration-300" />
                
                {/* Simulated content bar */}
                <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF8500] w-2/3 animate-[shimmer_2s_infinite]"></div>
                </div>
             </div>
             
             {/* Glitch Effect Overlay */}
             <div className="absolute inset-0 bg-[#FF8500]/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="space-y-3">
             <div className="h-2 bg-slate-800 rounded w-3/4"></div>
             <div className="h-2 bg-slate-800 rounded w-1/2"></div>
             <div className="h-2 bg-slate-800 rounded w-5/6"></div>
          </div>
          
          <div className="mt-6 flex gap-3">
             <div className="px-3 py-1 bg-slate-800/50 rounded text-xs text-slate-400 border border-slate-700/50 group-hover:border-[#FF8500]/30 transition-colors">P1.5</div>
             <div className="px-3 py-1 bg-slate-800/50 rounded text-xs text-slate-400 border border-slate-700/50 group-hover:border-[#FF8500]/30 transition-colors">P2.5</div>
             <div className="px-3 py-1 bg-slate-800/50 rounded text-xs text-slate-400 border border-slate-700/50 group-hover:border-[#FF8500]/30 transition-colors">P3.9</div>
          </div>
        </div>

        {/* Back glow */}
        <div 
            className="absolute -inset-4 bg-[#FF8500]/10 rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
            style={{ transform: 'translateZ(-10px)' }}
        ></div>
      </div>
    </div>
  );
};