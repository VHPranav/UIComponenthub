'use client';

import * as React from 'react';
import { GravityStarsBackground } from '@/components/backgrounds/gravity-stars';

export default function GravityStarsDemo() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <GravityStarsBackground
        starsCount={120}
        starsSize={2.5}
        starsOpacity={0.8}
        glowIntensity={25}
        movementSpeed={0.6}
        mouseInfluence={200}
        connectionLines={true}
        connectionDistance={120}
        colors={['#00d2ff', '#3a7bd5', '#7f00ff', '#ff00c1', '#ffffff']}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Gravity Stars
          </h2>
          <p className="text-zinc-400 text-lg font-medium">
            Interact with the cosmos
          </p>
        </div>
      </div>
    </div>
  );

}
