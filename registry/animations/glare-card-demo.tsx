"use client"

import React from "react"
import { GlareCard } from "./glare-card"
import { Lightbulb, MousePointer2, Sparkles, Wand2 } from "lucide-react"

export const GlareCardDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      {/* 1. Static Sweep */}
      <GlareCard 
        interactive={false} 
        animateOnHover={true}
        className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-gradient-to-br from-indigo-900 via-zinc-900 to-indigo-900 border-indigo-500/20"
      >
        <Lightbulb className="w-12 h-12 text-indigo-400 mb-4" />
        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Static Sweep</h3>
      </GlareCard>

      {/* 2. Standard Interactive Beam */}
      <GlareCard 
        className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-gradient-to-br from-emerald-900 via-zinc-900 to-emerald-900 border-emerald-500/20"
      >
        <MousePointer2 className="w-12 h-12 text-emerald-400 mb-4" />
        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Interactive</h3>
      </GlareCard>

      {/* 3. Holographic Rainbow */}
      <GlareCard 
        rainbow
        glareOpacity={0.8}
        className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-900 border-zinc-700/30"
      >
        <Sparkles className="w-12 h-12 text-sky-400 mb-4" />
        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Holographic</h3>
      </GlareCard>

      {/* 4. Interactive Spotlight */}
      <GlareCard 
        spotlight 
        glareColor="rgba(244, 63, 94, 0.2)"
        glareSize={250}
        className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-gradient-to-br from-rose-900 via-zinc-900 to-rose-900 border-rose-500/20"
      >
        <Wand2 className="w-12 h-12 text-rose-400 mb-4" />
        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Spotlight</h3>
      </GlareCard>
    </div>
  )
}

export default GlareCardDemo
