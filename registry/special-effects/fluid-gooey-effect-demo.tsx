'use client';

import React from 'react';
import FluidGooeyEffect from './fluid-gooey-effect';

export const FluidGooeyEffectDemo = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
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
