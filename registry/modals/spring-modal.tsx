"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export const SpringModal = ({ 
  isOpen, 
  setIsOpen,
  title = "Spring Modal",
  description = "A smooth spring-animated modal with backdrop blur.",
  children
}: { 
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-zinc-400 mb-6">{description}</p>
            {children}
            <div className="flex gap-2 justify-end mt-6">
               <button 
                onClick={() => setIsOpen(false)}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
               >
                 Cancel
               </button>
               <button 
                onClick={() => setIsOpen(false)}
                className="bg-white hover:bg-white/90 text-black px-4 py-2 rounded-lg font-bold transition-colors"
               >
                 Acknowledge
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
