"use client"

import React from "react"
import { cn } from "@/lib/utils"

export const GlassButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "relative px-6 py-2 rounded-full font-medium text-white transition-all duration-300",
        "bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
        "hover:bg-white/20 hover:border-white/40 hover:scale-105 active:scale-95",
        "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
GlassButton.displayName = "GlassButton"
