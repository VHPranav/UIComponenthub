"use client"

import React from "react"
import { cn } from "@/lib/utils"

export const RetroButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative rounded-xl bg-primary px-8 py-3 font-bold text-white transition-all",
        "shadow-[0_8px_0_0_#1a1a1a,0_15px_20px_rgba(0,0,0,.35)]",
        "active:translate-y-[4px] active:shadow-[0_4px_0_0_#1a1a1a,0_5px_10px_rgba(0,0,0,.35)]",
        "hover:bg-primary/90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
RetroButton.displayName = "RetroButton"
