"use client"

import { useRef } from "react"
import { TextReveal } from "./text-reveal"

export default function TextRevealDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div 
        ref={containerRef}
        className="h-[400px] w-full overflow-y-auto rounded-xl border bg-background"
      >
        <div className="flex flex-col items-center">
          <div className="flex h-40 w-full items-center justify-center text-sm text-muted-foreground italic">
            Scroll down to reveal
          </div>
          <TextReveal containerRef={containerRef}>
            UI Component Hub: The ultimate collection of premium UI components for your next project.
          </TextReveal>
          <div className="h-40 w-full" />
        </div>
      </div>
    </div>
  )
}
