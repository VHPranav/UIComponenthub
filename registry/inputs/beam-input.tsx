"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

export const BeamInput = ({ 
  className,
  label = "Email Address",
  placeholder = "Enter your email..."
}: { 
  className?: string
  label?: string
  placeholder?: string
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={cn("relative group w-full max-w-sm pt-4", className)}>
      <label className={cn(
        "absolute left-3 transition-all duration-200 pointer-events-none",
        isFocused || placeholder ? "-top-2 text-xs text-primary font-bold" : "top-7 text-zinc-500"
      )}>
        {label}
      </label>
      <div className="relative rounded-xl overflow-hidden p-[2px]">
        {/* The Beam Animation */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent -translate-x-full transition-transform duration-1000 ease-out",
          isFocused ? "translate-x-full" : ""
        )} />
        
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="relative w-full h-12 px-4 rounded-[10px] bg-zinc-950 text-white outline-none border border-white/5 focus:border-transparent transition-colors"
        />
      </div>
      <p className="mt-2 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold ml-2">
        Focus to activate border beam
      </p>
    </div>
  )
}
