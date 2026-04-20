'use client';

import React from 'react';
import FluidGooeyEffect from './fluid-gooey-effect';

export const FluidGooeyEffectDemo = () => {
  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
      <FluidGooeyEffect
        mainImage="/gooey-bg.png"
        revealImage="/gooey-reveal.png"
        showBackgroundLines={true}
        lineColor="#C4A484"
        trailCount={12}
        dropletCount={40}
      />
      
      {/* Overlay UI to make it look premium */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <h3 className="text-white text-3xl font-bold tracking-tight mb-2 drop-shadow-md">
          Liquid Reveal
        </h3>
        <p className="text-white/70 text-sm font-medium tracking-wide border-l-2 border-white/30 pl-4">
          HOVER TO EXPLORE THE FLUID TEXTURE
        </p>
      </div>

      <div className="absolute bottom-8 right-8 z-20 pointer-events-none">
        <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/80 text-[10px] font-mono tracking-widest uppercase">
            Interactive GSAP Engine
          </span>
        </div>
      </div>
    </div>
  );
};

export default FluidGooeyEffectDemo;
