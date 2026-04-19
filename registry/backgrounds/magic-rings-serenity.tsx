"use client"

import React from "react"
import { MagicRings } from "./magic-rings"
import { Shield } from "lucide-react"

export const MagicRingsSerenity = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-950 group">
      <div className="absolute inset-0 z-0">
          <MagicRings 
              color="#e0f2fe" 
              colorTwo="#0ea5e9" 
              speed={0.3} 
              followMouse={false} 
              ringCount={4}
              baseRadius={0.4}
              radiusStep={0.15}
              lineThickness={4}
              blur={2}
          />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8 text-center pointer-events-none">
          <Shield className="h-12 w-12 text-white mb-4 drop-shadow-[0_0_15px_rgba(14,165,233,0.8)]" />
          <h3 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-md">Serenity</h3>
          <p className="text-zinc-200 mt-2 max-w-[300px] drop-shadow-md font-medium">
              Softly blurred, slow rotation. Perfect for subtle, non-distracting backgrounds.
          </p>
      </div>
    </div>
  )
}

export default MagicRingsSerenity
