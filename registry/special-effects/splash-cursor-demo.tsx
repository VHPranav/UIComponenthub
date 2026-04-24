"use client"

import React from "react"
import SplashCursor from "./splash-cursor"

export const SplashCursorDemo = () => {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center text-center rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden relative">
      <SplashCursor 
        RAINBOW_MODE={false}
        COLOR="#fdce3c"
        SPLAT_RADIUS={0.2}
      />
    </div>
  )
}

export default SplashCursorDemo
