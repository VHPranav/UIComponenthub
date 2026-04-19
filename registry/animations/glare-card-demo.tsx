"use client"

import React from "react"
import { GlareCard } from "./glare-card"
import { Sparkles, Zap, Shield, Rocket } from "lucide-react"

export const GlareCardDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4">
      {/* Example 1: Standard Beam Glare */}
      <GlareCard className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-zinc-950">
        <Sparkles className="h-12 w-12 text-zinc-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Standard Beam</h3>
        <p className="text-zinc-500 max-w-[200px]">
          Smooth linear light beam that reacts to your movement.
        </p>
      </GlareCard>

      {/* Example 2: Spotlight Mode */}
      <GlareCard 
        spotlight 
        glareColor="rgba(56, 189, 248, 0.2)"
        glareSize={200}
        className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-zinc-950"
      >
        <Zap className="h-12 w-12 text-sky-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Spotlight Mode</h3>
        <p className="text-zinc-500 max-w-[200px]">
          Dynamic radial light that follows the cursor precisely.
        </p>
      </GlareCard>

      {/* Example 3: High Intensity Colored Glare */}
      <GlareCard 
        glareColor="rgba(192, 38, 211, 0.4)" 
        glareAngle={135}
        tiltMax={25}
        className="flex flex-col items-center justify-center h-[350px] p-8 text-center bg-zinc-950"
      >
        <Shield className="h-12 w-12 text-fuchsia-500 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Reactive Surface</h3>
        <p className="text-zinc-500 max-w-[200px]">
          Increased tilt and custom angle for high interaction.
        </p>
      </GlareCard>

      {/* Example 4: Dark Premium Glare */}
      <GlareCard 
        glareOpacity={0.3}
        className="relative flex flex-col items-start justify-end h-[350px] p-8 bg-zinc-950 group"
      >
        <div className="absolute top-8 right-8">
            <Rocket className="h-8 w-8 text-zinc-700 group-hover:text-white transition-colors duration-500" />
        </div>
        <div className="space-y-2">
            <div className="px-3 py-1 text-xs font-medium border border-zinc-700 rounded-full w-fit text-zinc-400">
                Premium Feature
            </div>
            <h3 className="text-2xl font-bold text-white">Dynamic Content</h3>
            <p className="text-zinc-500">
                Wraps any content with a premium holographic feel.
            </p>
        </div>
      </GlareCard>
    </div>
  )
}

export default GlareCardDemo
