"use client"

import React from "react"
import { ScrollReveal } from "./scroll-reveal"

export function ScrollRevealDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-24 space-y-[40vh]">
      <div className="text-center space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Scroll Down
        </h3>
        <p className="text-zinc-400">
          The animations below will reveal as you scroll into their viewport.
        </p>
      </div>

      <ScrollReveal
        baseOpacity={0}
        baseRotation={5}
        blurStrength={10}
        containerClassName="max-w-2xl"
      >
        Experience a new dimension of typography. Our scroll-driven reveal effect
        brings your words to life with organic motion and cinematic depth.
      </ScrollReveal>

      <ScrollReveal
        baseOpacity={0.05}
        baseRotation={-3}
        enableBlur={false}
        textClassName="text-emerald-500"
      >
        Precision in every frame. We've optimized every transition to ensure a
        fluid, high-performance experience that captivates your audience.
      </ScrollReveal>

      <ScrollReveal
        baseOpacity={0.1}
        baseRotation={10}
        blurStrength={20}
        rotationEnd="bottom 50%"
        wordAnimationEnd="bottom 50%"
        textClassName="text-amber-500"
      >
        Crafted for the modern web. This component combines the power of GSAP
        with the elegance of modern typography to create truly memorable digital
        experiences.
      </ScrollReveal>

      <div className="h-[20vh]" />
    </div>
  )
}
