'use client';

import React, { useState } from 'react';
import ThreeConfetti from './three-confetti';

export const ThreeConfettiDemo = () => {
  const [key, setKey] = useState(0);

  const triggerConfetti = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div
      onClick={triggerConfetti}
      className="relative w-full h-[400px] flex items-center justify-center cursor-pointer group rounded-xl border border-dashed border-zinc-700 hover:border-yellow-500/50 transition-colors"
      title="Click anywhere for full-screen confetti"
    >
      <ThreeConfetti key={key} />

      <div className="flex flex-col items-center gap-2 pointer-events-none">
        <p className="text-zinc-500 text-sm font-medium group-hover:text-zinc-300 transition-colors">
          Click to explode
        </p>
      </div>
    </div>
  );
};

export default ThreeConfettiDemo;
