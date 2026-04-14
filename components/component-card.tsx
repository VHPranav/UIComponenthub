"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ComponentMetadata } from "@/lib/types"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ComponentCardProps {
  component: ComponentMetadata
  index?: number
}

const CATEGORY_COLORS: Record<string, string> = {
  Buttons:         "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Cards:           "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  Inputs:          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Animations:      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  "Special Effects": "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
}

export function ComponentCard({ component, index = 0 }: ComponentCardProps) {
  const categoryColor = CATEGORY_COLORS[component.category] ?? "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/components/${component.id}`} className="group block h-full" tabIndex={-1}>
        <Card className="overflow-hidden h-full flex flex-col border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-300 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 group-hover:shadow-xl group-hover:shadow-black/5 dark:group-hover:shadow-black/40">

          {/* Preview area */}
          <div className="relative h-44 w-full bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
            {/* Dot grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* Glowing orb on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

            {/* Mock component preview */}
            <div className="z-10 flex flex-col items-center gap-3">
              <div className="flex gap-2">
                <div className="h-8 w-20 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300 border border-primary/20 flex items-center justify-center">
                  <div className="w-6 h-0.5 bg-primary/50 rounded-full" />
                </div>
                <div className="h-8 w-8 rounded-lg bg-zinc-300/50 dark:bg-zinc-700/50 border border-zinc-300 dark:border-zinc-700" />
              </div>
              <div className="flex gap-1.5">
                {[48, 64, 40].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" style={{ width: w }} />
                ))}
              </div>
            </div>

            {/* Category pill */}
            <div className="absolute top-3 left-3">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColor}`}>
                {component.category}
              </span>
            </div>

            {/* Arrow on hover */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
              <ArrowRight className="h-4 w-4 text-zinc-400" />
            </div>
          </div>

          {/* Content */}
          <CardHeader className="px-5 pt-4 pb-1">
            <CardTitle className="text-base font-semibold leading-tight tracking-tight group-hover:text-primary transition-colors duration-200">
              {component.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-5 py-0 flex-1">
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {component.description}
            </p>
          </CardContent>

          <CardFooter className="px-5 pt-3 pb-4 gap-1.5 flex-wrap">
            {component.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[11px] font-medium py-0.5 px-2 h-auto rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-0"
              >
                {tag}
              </Badge>
            ))}
            {component.tags.length > 3 && (
              <span className="text-[11px] text-muted-foreground">+{component.tags.length - 3}</span>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
