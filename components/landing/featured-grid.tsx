"use client"

import { motion } from "framer-motion"
import { Code, Layout, Sparkles, Zap } from "lucide-react"

const featuredComponents = [
  {
    title: "Animated Buttons",
    description: "Buttons with sleek hover effects and micro-interactions.",
    icon: Zap,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Layout Components",
    description: "Responsive containers and grid systems for any layout.",
    icon: Layout,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Special Effects",
    description: "Advanced shader and canvas-based visual effects.",
    icon: Sparkles,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Code Snippets",
    description: "Beautiful syntax highlighting for your snippets.",
    icon: Code,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
]

export function FeaturedGrid() {
  return (
    <section className="container mx-auto py-24 md:py-32">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
          Built for performance
        </h2>
        <p className="text-muted-foreground text-lg max-w-[42rem]">
          High-performance components designed to fit seamlessly into any project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredComponents.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 shadow-sm transition-all hover:border-border hover:shadow-md backdrop-blur-sm"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color} ${item.bg} mb-4 group-hover:scale-110 transition-transform`}>
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
            
            {/* Subtle bottom gradient on hover */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300 ${item.color.replace(' text-', ' bg-').split(' ')[0]}`} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
