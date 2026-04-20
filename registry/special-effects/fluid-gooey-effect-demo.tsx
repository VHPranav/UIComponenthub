'use client';

import React from 'react';
import FluidGooeyEffect from './fluid-gooey-effect';

export const FluidGooeyEffectDemo = () => {
  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
      <FluidGooeyEffect
        mainImage="/gooey-bg.png"
        revealImage="/gooey-reveal.png"
        trailCount={12}
        dropletCount={40}
      />

      {/* Overlay UI to make it look premium - Increased Z-index to 50 */}
      <div className="absolute top-10 left-10 z-50 pointer-events-none select-none">
        <h3 className="text-white text-4xl font-bold tracking-tight mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          Liquid Reveal
        </h3>
        <p className="text-white/80 text-sm font-semibold tracking-[0.2em] border-l-4 border-blue-500 pl-6 drop-shadow-md">
          STRETCHING THE LIMITS OF REACT & GSAP
        </p>
      </div>

      <div className="absolute bottom-10 right-10 z-50 pointer-events-none select-none">
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 shadow-2xl transition-all duration-300">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_#60a5fa]" />
          <span className="text-white/90 text-[11px] font-bold tracking-widest uppercase">
            60FPS Fluid Simulation
          </span>
        </div>
      </div>
    </div>
  );
};

export default FluidGooeyEffectDemo;
