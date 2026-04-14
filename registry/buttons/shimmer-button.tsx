"use client"

import React from "react"
import { cn } from "@/lib/utils"

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group h-12 w-48 transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="relative h-full w-full rounded-xl bg-slate-950 p-[1px] overflow-hidden">
        <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#394484_50%,#E2E8F0_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-900">
          {children}
        </span>
      </div>
    </button>
  )
})
ShimmerButton.displayName = "ShimmerButton"
