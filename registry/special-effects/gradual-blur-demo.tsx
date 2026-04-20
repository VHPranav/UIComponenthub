"use client"

import React from "react"
import { GradualBlur } from "./gradual-blur"
import { ArrowRight, Sparkles } from "lucide-react"

export const GradualBlurDemo = () => {
  return (
    <div className="w-full relative h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl flex flex-col font-sans">
      
      {/* Scrollable Content */}
      <div className="absolute inset-0 overflow-y-auto no-scrollbar">
        {/* Hero Abstract Image */}
        <div className="h-[350px] w-full relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>
        
        <div className="px-8 md:px-12 pb-48 -mt-20 relative z-0">
            <p className="text-xs font-semibold text-pink-500 tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> Component Architecture
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight">
                The Future of <span className="font-bold">Masking</span>
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed text-zinc-400 font-light max-w-2xl">
                <p>
                    Scroll down to witness how mathematically calculated fractional blur overlays 
                    can replace harsh linear gradients. As this text moves behind the top and bottom panels, 
                    it dissolves into frosted glass seamlessly.
                </p>
                <p>
                    Traditional CSS masking uses a flat transparency gradient. While this trick works perfectly for solid 
                    colors, it fails completely when placed over imagery or animated backgrounds since the <code className="bg-zinc-900 border border-zinc-800 text-pink-400 px-2 py-0.5 rounded text-sm mx-1">backdrop-filter</code> is globally applied.
                </p>
                
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-zinc-200 my-10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <p className="relative italic font-medium">
                        "By dividing the blur into granular exponential steps, we bridge the gap between CSS filters and alpha channels. This is the holy grail of frosted UI."
                    </p>
                </div>
                
                <p>
                    This technique stacks invisible division plates—each with a mathematically climbing blur strength. 
                    Then, it linearly masks each plate into the next, achieving a buttery-smooth gradient.
                </p>
                
                <div className="h-60" /> {/* Extra scroll padding to demonstrate fade */}
            </div>
        </div>
      </div>

      {/* Floating Header Blur */}
      <GradualBlur 
        preset="top" 
        height="8rem"
        className="z-10 pointer-events-none"
      >
         <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center text-white">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            </div>
            <div className="text-xs tracking-[0.2em] uppercase font-bold text-white/70">UI Hub</div>
         </div>
      </GradualBlur>

      {/* Floating Action Bar Bottom Blur */}
      <GradualBlur 
        preset="intense" 
        position="bottom" 
        height="12rem"
        className="z-10 pointer-events-none"
        exponential
      >
        <div className="absolute bottom-0 left-0 right-0 pb-8 pt-16 px-8 md:px-12 flex flex-row items-end justify-between bg-gradient-to-t from-black/40 to-transparent pointer-events-auto">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Frosted Vision</h3>
            <p className="text-zinc-300 text-sm mt-1 font-medium hidden md:block">Fluid. Mathematical. Seamless.</p>
          </div>
          <button className="flex items-center gap-3 px-8 py-3.5 bg-white hover:bg-zinc-200 active:scale-95 transition-all text-black rounded-full font-bold shadow-[0_0_40px_rgba(255,255,255,0.2)]">
             Install Now <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </GradualBlur>

    </div>
  )
}

export default GradualBlurDemo
