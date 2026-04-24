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
    >
      <ThreeConfetti key={key} />
    </div>
  );
};

export default ThreeConfettiDemo;
