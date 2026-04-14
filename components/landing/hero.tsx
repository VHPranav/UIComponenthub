"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-24 md:py-32 lg:py-40 overflow-hidden">

      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-border/40 bg-muted/40 px-3 py-1 text-xs md:text-sm font-medium backdrop-blur-sm transition-colors hover:bg-muted/60 text-muted-foreground mb-8 cursor-default"
        >
          <span className="mr-2 text-xl leading-none">✨</span>
          New components added weekly
          <ChevronRight className="ml-1 h-3 w-3" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl p-2 bg-gradient-to-br from-foreground to-foreground/90 bg-clip-text text-transparent mb-6 font-display"
        >
          Build faster with <br className="hidden sm:block" />
          <span className="font-extralight italic">beautiful</span> UI components
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[42rem] mx-auto text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-10"
        >
          A carefully curated collection of open-source components and effects.
          Built with React, TypeScript, and Tailwind CSS. Modern, performant, and ready for production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center w-full justify-center"
        >
          <Link
            href="/components"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full w-full sm:w-auto font-medium h-12 px-8"
            )}
          >
            Browse Components
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="https://github.com/VHPranav/UIComponenthub"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full w-full sm:w-auto h-12 px-8 border-border"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            Contribute
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
