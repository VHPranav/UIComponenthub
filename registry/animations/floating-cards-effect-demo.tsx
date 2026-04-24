'use client';

import React from 'react';
import FloatingCardsEffect from './floating-cards-effect';

export const FloatingCardsEffectDemo = () => {
  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50">
      <FloatingCardsEffect
        count={70}
        spacing={0.5}
        cardWidth={2.0}
        cardHeight={2.8}
        colors={[
          0x3B82F6, // Blue
          0xEF4444, // Red
          0x10B981, // Emerald
          0x8B5CF6, // Violet
          0xF59E0B, // Amber
        ]}
        bgColor={0xf9fafb} // zinc-50 hex equivalent
        showBackgroundLines={true}
        lineColor="#94A3B8" // slate-400
      />
    </div>
  );
};

export default FloatingCardsEffectDemo;
