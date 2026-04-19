"use client"

import React from "react"
import { MagicRings } from "./magic-rings"
import { Sparkles } from "lucide-react"

export const MagicRingsCyberpunk = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-950 group">
      <div className="absolute inset-0 z-0">
          <MagicRings 
              color="#fc42ff" 
              colorTwo="#42fcff" 
              followMouse={true} 
              clickBurst={true}
              mouseInfluence={0.5}
              ringCount={8}
          />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8 text-center pointer-events-none">
          <Sparkles className="h-12 w-12 text-white mb-4 drop-shadow-[0_0_15px_rgba(252,66,255,0.8)]" />
          <h3 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-md">Cyberpunk</h3>
          <p className="text-zinc-300 mt-2 max-w-[300px] drop-shadow-md font-medium">
              Moves with your mouse. Click anywhere to trigger a burst expansion.
          </p>
      </div>
    </div>
  )
}

export default MagicRingsCyberpunk
