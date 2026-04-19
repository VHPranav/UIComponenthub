"use client"

import React from "react"
import { MagicRings } from "./magic-rings"
import { Rocket } from "lucide-react"

export const MagicRingsParallax = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-950 group">
      <div className="absolute inset-0 z-0">
          <MagicRings 
              color="#facc15" 
              colorTwo="#e11d48" 
              speed={1.5} 
              followMouse={true} 
              parallax={0.15}
              ringCount={10}
              noiseAmount={0.3}
              opacity={0.8}
          />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8 text-center pointer-events-none">
          <Rocket className="h-12 w-12 text-white mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
          <h3 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-md">Parallax Depth</h3>
          <p className="text-zinc-200 mt-2 max-w-[300px] drop-shadow-md font-medium">
              High noise levels with intense mouse parallax creating an illusion of deep 3D space.
          </p>
      </div>
    </div>
  )
}

export default MagicRingsParallax
