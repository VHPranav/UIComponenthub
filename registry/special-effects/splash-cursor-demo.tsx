"use client"

import React from "react"
import SplashCursor from "./splash-cursor"
import { MousePointer2 } from "lucide-react"

export const SplashCursorDemo = () => {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center text-center rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden relative">
      
      {/* 
        This renders the full screen cursor effect!
        Because it is fixed top-0 left-0 w-screen h-screen, the fluid will escape 
        this bounding box and cover the entire webpage as requested.
      */}
      <SplashCursor 
        RAINBOW_MODE={false}
        COLOR="#fdce3c"
        SPLAT_RADIUS={0.2}
      />

      <div className="z-10 flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-2xl animate-bounce">
            <MousePointer2 className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-white tracking-tight mb-3">Fluid Active</h2>
        <p className="text-zinc-400 max-w-sm text-sm font-medium leading-relaxed">
            Move your cursor anywhere across the entire page. <br />
            The WebGL canvas has been mounted as a fixed full-screen overlay behind your content.
        </p>

        <p className="mt-8 text-xs uppercase tracking-widest text-pink-500 font-bold bg-pink-500/10 px-4 py-2 rounded-full">
            Full Screen Execution
        </p>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
    </div>
  )
}

export default SplashCursorDemo
