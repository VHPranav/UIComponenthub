"use client"

import { DM_Sans } from "next/font/google"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
})

const images = {
  dev: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  aiml: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
  devops: "https://images.unsplash.com/photo-1618401471353-b98aadebc25a?q=80&w=800&auto=format&fit=crop",
  chatbot: "https://images.unsplash.com/photo-1531746790731-6c087fdec0ed?q=80&w=800&auto=format&fit=crop",
  ai_integration: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
  llm: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=800&auto=format&fit=crop",
  gen_ai: "https://images.unsplash.com/photo-1686191128892-3b17ac999e44?q=80&w=800&auto=format&fit=crop",
  automation: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
}

interface NavbarProps {
  usePortal?: boolean
  containerRef?: React.RefObject<HTMLDivElement>
  className?: string
}

export default function Navbar({ usePortal = false, containerRef, className }: NavbarProps) {
  const [mounted, setMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const scrollContainer = containerRef?.current || window
    const handleScroll = () => {
      const currentScrollY = containerRef?.current ? containerRef.current.scrollTop : window.scrollY
      setIsScrolled(currentScrollY > 20)
    }
    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [containerRef])

  const menuItems = [
    {
      name: "Services",
      hasDropdown: true,
      dropdownItems: [
        { name: "DevOps", href: "#", description: "Cloud & Automation", image: images.devops },
        { name: "Agentic AI", href: "#", description: "Smart Automation", image: images.aiml },
        { name: "App Dev", href: "#", description: "Modern Apps", image: images.dev },
      ],
    },
    {
      name: "Products",
      hasDropdown: true,
      categories: [
        { label: "AI", items: [{ name: "Alpha", description: "AI Interface" }] },
        { label: "Cloud", items: [{ name: "HashInfra", description: "Cloud Infrastructure" }] },
      ],
    },
    { name: "Company", hasDropdown: true, dropdownItems: [{ name: "About", description: "Our Story" }, { name: "Blog", description: "Insights" }] },
  ]

  const renderDropdownContent = (item: any) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 text-white min-w-[500px]",
          usePortal ? "fixed left-1/2 -translate-x-1/2 mt-4" : "absolute top-full left-1/2 -translate-x-1/2 mt-4",
          dmSans.className
        )}
        style={{ top: usePortal ? "80px" : undefined }}
      >
        {item.name === "Services" && (
           <div className="grid grid-cols-3 gap-4">
           {item.dropdownItems.map((si: any) => (
             <div key={si.name} className="group cursor-pointer">
               <div className="aspect-video relative rounded-lg overflow-hidden mb-2">
                 <img src={si.image} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-black/40" />
               </div>
               <div className="text-sm font-bold text-[#fad32e]">{si.name}</div>
               <div className="text-[10px] text-white/50">{si.description}</div>
             </div>
           ))}
         </div>
        )}
        {item.name === "Products" && (
          <div className="grid grid-cols-2 gap-8">
            {item.categories.map((cat: any) => (
              <div key={cat.label}>
                <div className="text-[10px] font-bold text-[#fad32e] uppercase tracking-widest mb-3">{cat.label}</div>
                {cat.items.map((it: any) => (
                  <div key={it.name} className="mb-2">
                    <div className="text-sm font-medium">{it.name}</div>
                    <div className="text-[10px] text-white/50">{it.description}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {item.name === "Company" && (
          <div className="grid grid-cols-2 gap-4">
             {item.dropdownItems.map((si: any) => (
              <div key={si.name} className="hover:bg-white/5 p-3 rounded-lg transition-colors">
                <div className="text-sm font-bold">{si.name}</div>
                <div className="text-[10px] text-white/50">{si.description}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <nav className={cn(
      "w-full flex justify-center transition-all duration-500 z-[100]",
      containerRef?.current ? "absolute top-8" : "fixed top-8",
      className
    )}>
      <motion.div 
        layout
        className={cn(
          "flex items-center gap-2 md:gap-6 px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/10 shadow-2xl backdrop-blur-md transition-all duration-500",
          isScrolled ? "bg-black/60 scale-95" : "bg-black/40 scale-100"
        )}
      >
        <Link href="/" className="text-white font-bold text-lg mr-2 hover:text-[#fad32e] transition-colors">
            Logo
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <div 
              key={item.name} 
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white/70 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
                {item.name}
                {item.hasDropdown && <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
              </button>

              <AnimatePresence>
                {activeDropdown === item.name && (
                  usePortal && mounted 
                    ? createPortal(renderDropdownContent(item), containerRef?.current || document.body)
                    : renderDropdownContent(item)
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="h-4 w-px bg-white/10 mx-2" />

        <button className="bg-[#fad32e] text-black text-[10px] md:text-xs font-bold px-4 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-white transition-all transform active:scale-95">
          Get Started
        </button>
      </motion.div>
    </nav>
  )
}
