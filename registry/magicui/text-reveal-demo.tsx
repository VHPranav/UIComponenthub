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
        <TextReveal containerRef={containerRef}>
          UI Component Hub: The ultimate collection of premium UI components for your next project.
        </TextReveal>
      </div>
    </div>
  )
}
