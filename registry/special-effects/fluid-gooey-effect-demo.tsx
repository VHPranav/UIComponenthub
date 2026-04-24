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
    </div>
  );
};

export default FluidGooeyEffectDemo;
