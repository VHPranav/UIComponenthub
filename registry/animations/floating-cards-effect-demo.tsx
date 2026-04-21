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
      
      {/* Overlay UI - Higher Z-index and visibility */}
      <div className="absolute top-10 left-10 z-50 pointer-events-none select-none">
        <h3 className="text-zinc-900 text-4xl font-black tracking-tight mb-3 drop-shadow-sm">
          Floating Stream
        </h3>
        <p className="text-zinc-600/80 text-sm font-bold tracking-[0.2em] border-l-4 border-blue-500 pl-6 uppercase">
          Interactive 3D Instancing
        </p>
      </div>

      <div className="absolute bottom-10 right-10 z-50 pointer-events-none">
        <div className="flex flex-col items-end gap-3 bg-white/60 backdrop-blur-xl px-6 py-4 rounded-3xl border border-zinc-200/50 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-zinc-800 text-[11px] font-bold tracking-widest uppercase">
              Mouse X/Y Control
            </span>
          </div>
          <p className="text-zinc-500 text-[9px] font-mono leading-none">
            60FPS WEBGL RENDERER
          </p>
        </div>
      </div>
    </div>
  );
};

export default FloatingCardsEffectDemo;
