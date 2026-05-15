"use client"

import { useRef } from "react"
import { TextReveal } from "./text-reveal"

export default function TextRevealDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div 
      ref={containerRef}
      className="h-[400px] w-full overflow-y-auto rounded-xl border bg-white dark:bg-black scrollbar-hide"
    >
      <TextReveal containerRef={containerRef}>
        Magic UI will make your landing page look 10x better.
      </TextReveal>
    </div>
  )
}
