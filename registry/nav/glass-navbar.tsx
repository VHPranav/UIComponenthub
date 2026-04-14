"use client"

import React from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"

export const GlassNavbar = ({ 
  className,
  logo = "UIHub",
  links = ["Home", "Components", "Showcase", "Docs"]
}: { 
  className?: string
  logo?: string
  links?: string[]
}) => {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = React.useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-4 inset-x-0 mx-auto max-w-2xl px-6 py-3 rounded-full z-50",
        "bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg",
        "flex items-center justify-between",
        className
      )}
    >
      <div className="text-white font-bold text-xl tracking-tighter">{logo}</div>
      <div className="hidden md:flex items-center gap-6">
        {links.map(link => (
          <a key={link} href="#" className="text-white/70 hover:text-white text-sm transition-colors">
            {link}
          </a>
        ))}
      </div>
      <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors">
        Get Started
      </button>
    </motion.nav>
  )
}
