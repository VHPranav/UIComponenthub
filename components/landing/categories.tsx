"use client"

import { motion } from "framer-motion"
import { Box, Layers, MousePointer2, Type } from "lucide-react"

const categories = [
  {
    name: "Cards",
    description: "Multi-layered container components.",
    icon: Box,
  },
  {
    name: "Buttons",
    description: "Highly customizable interaction triggers.",
    icon: MousePointer2,
  },
  {
    name: "Animations",
    description: "Pre-built transition and motion presets.",
    icon: Layers,
  },
  {
    name: "Text",
    description: "Dynamic typography and text reveal effects.",
    icon: Type,
  },
]

export function Categories() {
  return (
    <section className="container mx-auto py-24 bg-muted/30 rounded-3xl mb-24">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Explore by category
        </h2>
        <p className="text-muted-foreground text-lg max-w-[42rem]">
          Jump straight into the components you need for your next project.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer rounded-2xl border border-transparent bg-background p-6 transition-all hover:border-border hover:shadow-lg"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <cat.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold">{cat.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{cat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
