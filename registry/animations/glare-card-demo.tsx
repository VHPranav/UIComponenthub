"use client"

import React from "react"
import { GlareCard } from "./glare-card"

export const GlareCardDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      {/* 1. Static Sweep (Doesn't follow cursor) */}
      <GlareCard 
        interactive={false} 
        animateOnHover={true}
        className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-gradient-to-br from-indigo-900 via-zinc-900 to-indigo-900 border-indigo-500/20"
      >
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Static Sweep</h3>
            <p className="text-zinc-400 text-sm max-w-[200px]">
                A predictable light beam that sweeps across on hover, ignoring cursor position.
            </p>
        </div>
      </GlareCard>

      {/* 2. Standard Interactive Beam */}
      <GlareCard 
        className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-gradient-to-br from-emerald-900 via-zinc-900 to-emerald-900 border-emerald-500/20"
      >
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Interactive</h3>
            <p className="text-zinc-400 text-sm max-w-[200px]">
                The classic experience. Light follows your movement with precision.
            </p>
        </div>
      </GlareCard>

      {/* 3. Holographic Rainbow */}
      <GlareCard 
        rainbow
        glareOpacity={0.8}
        className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-900 border-zinc-700/30"
      >
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Holographic</h3>
            <p className="text-zinc-400 text-sm max-w-[200px]">
                A prismatic, multi-color glare that shifts and shimmers based on movement.
            </p>
        </div>
      </GlareCard>

      {/* 4. Interactive Spotlight */}
      <GlareCard 
        spotlight 
        glareColor="rgba(244, 63, 94, 0.2)"
        glareSize={250}
        className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-gradient-to-br from-rose-900 via-zinc-900 to-rose-900 border-rose-500/20"
      >
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Spotlight</h3>
            <p className="text-zinc-400 text-sm max-w-[200px]">
                A soft radial light that brings a focused glow to the surface beneath the cursor.
            </p>
        </div>
      </GlareCard>
    </div>
  )
}

export default GlareCardDemo
