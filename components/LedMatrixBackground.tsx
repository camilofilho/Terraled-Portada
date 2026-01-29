import React, { useEffect, useRef } from 'react';
import { MouseState } from '../types';

interface LedMatrixBackgroundProps {
  mouseState: MouseState;
}

export const LedMatrixBackground: React.FC<LedMatrixBackgroundProps> = ({ mouseState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuration
    const gap = 30; // Distance between LEDs
    const baseRadius = 1.5;
    const activeRadius = 140; // Hover effect radius
    
    // Grid calculation
    let cols = Math.ceil(width / gap);
    let rows = Math.ceil(height / gap);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      cols = Math.ceil(width / gap);
      rows = Math.ceil(height / gap);
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Background tint
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap + gap / 2;
          const y = j * gap + gap / 2;

          // Calculate distance from mouse
          const dx = mouseState.x - x;
          const dy = mouseState.y - y;
          const distance = Math.hypot(dx, dy);

          let alpha = 0.1; // Base dim brightness
          let radius = baseRadius;
          
          // Default inactive color (slate-600)
          let colorString = '71, 85, 105'; 

          if (distance < activeRadius) {
            // Calculate intensity based on proximity
            const intensity = 1 - distance / activeRadius;
            alpha = 0.15 + intensity * 0.85;
            radius = baseRadius + intensity * 2.5;
            
            // Dynamic color shift: Orange (#FF8500) to Yellow/White center
            // R: 255
            // G: 133 (base) -> 200 (center/hotter)
            // B: 0
            const r = 255;
            const g = Math.floor(133 + (intensity * 80)); 
            const b = Math.floor(intensity * 50); // Slight white tint at center
            
            colorString = `${r}, ${g}, ${b}`;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colorString}, ${alpha})`;
          ctx.fill();
          
          // Add a glow effect for active LEDs
          if (alpha > 0.4) {
             ctx.shadowBlur = 15;
             ctx.shadowColor = `rgba(${colorString}, 0.6)`;
             ctx.fill();
             ctx.shadowBlur = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseState]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};