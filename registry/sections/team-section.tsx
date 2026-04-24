"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TeamMember {
  name: string
  role: string
  avatar: string
  rotation: string
  bgColor: string
}

export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [currentSet, setCurrentSet] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [teamSets, setTeamSets] = useState<TeamMember[][]>([])
  const [loading, setLoading] = useState(true)

  const bgColors = [
    "bg-[#fad32e]", "bg-[#4fc3f7]", "bg-[#ff5252]", "bg-[#a8e6a3]", "bg-[#ff9800]",
    "bg-[#9c27b0]", "bg-[#e91e63]", "bg-[#00bcd4]", "bg-[#8bc34a]", "bg-[#ff6f00]",
    "bg-[#673ab7]", "bg-[#795548]"
  ]

  const rotations = [
    "rotate-[2deg]", "-rotate-[2deg]", "rotate-[2deg]", "-rotate-[4deg]", "rotate-[2deg]",
    "rotate-0", "rotate-[3deg]", "-rotate-[1deg]", "rotate-[2deg]", "-rotate-[3deg]",
    "rotate-[1deg]", "-rotate-[2deg]"
  ]

  const MOCK_MEMBERS = [
    { name: "Alex Rivera", role: "Design Lead", id: "photo-1539571696357-5a69c17a67c6" },
    { name: "Sarah Chen", role: "Frontend", id: "photo-1494790108377-be9c29b29330" },
    { name: "Marcus Thorne", role: "Backend", id: "photo-1507003211169-0a1dd7228f2d" },
    { name: "Elena Gilbert", role: "Mobile", id: "photo-1554151228-14d9def656e4" },
  ]

  useEffect(() => {
    const allMembers: TeamMember[] = MOCK_MEMBERS.map((member, index) => ({
      name: member.name,
      role: member.role,
      avatar: `https://images.unsplash.com/${member.id}?q=80&w=400&h=540&auto=format&fit=crop`,
      rotation: rotations[index % rotations.length],
      bgColor: bgColors[index % bgColors.length],
    }))

    const sets: TeamMember[][] = []
    for (let i = 0; i < allMembers.length; i += 4) {
      sets.push(allMembers.slice(i, i + 4))
    }
    setTeamSets(sets)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (teamSets.length === 0) return

    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentSet((prev) => (prev + 1) % teamSets.length)
        setHoveredIndex(null)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [teamSets.length, isHovering])

  const teamMembers = teamSets[currentSet] || []

  return (
    <section className="relative py-12 px-4 bg-[#C5D9FF] flex flex-col items-center justify-center overflow-hidden min-h-[500px]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>

      <div className="w-full max-w-7xl relative z-10 flex flex-col items-center justify-center">
        {/* Team avatars container */}
        <div className="p-4 relative min-h-[400px] flex items-center justify-center">
          <div
            className="flex justify-center items-end relative transition-all duration-700 ease-in-out"
            key={currentSet}
          >
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div
                  key={i}
                  className={`relative flex-shrink-0 animate-pulse ${rotations[i % rotations.length]} ${i > 0 ? "-ml-6 md:-ml-12" : ""}`}
                >
                  <div className="w-24 h-32 md:w-44 md:h-60 bg-gray-200/50 rounded-2xl backdrop-blur-sm" />
                </div>
              ))
            ) : (teamMembers.map((member, index) => (
              <motion.div
                key={`${currentSet}-${index}`}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: hoveredIndex === index ? 0 : parseInt(member.rotation.replace(/[^0-9-]/g, '') || '0')
                }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`relative flex-shrink-0 cursor-pointer ${index > 0 ? "-ml-6 md:-ml-12" : ""}`}
                style={{
                  zIndex: hoveredIndex === index ? 999 : teamMembers.length - index,
                }}
                onMouseEnter={() => {
                  setHoveredIndex(index)
                  setIsHovering(true)
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null)
                  setIsHovering(false)
                }}
              >
                <div className="relative">
                  {/* Image Container */}
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      y: -10,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className={`w-28 h-36 md:w-44 md:h-60 ${member.bgColor} rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40`}
                  >
                    <img
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-all duration-500 ease-out"
                    />
                  </motion.div>

                  {/* Tooltip centered ON the card center for "on top" effect */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center p-4 z-[1000] pointer-events-none"
                      >
                        <div className="bg-black/80 backdrop-blur-md text-white px-4 py-3 rounded-2xl text-center shadow-2xl border border-white/10 max-w-[90%]">
                          <div className="text-sm font-bold truncate">Hi I am {member.name.split(' ')[0]}</div>
                          <div className="text-[10px] text-white/60 font-medium tracking-wide uppercase mt-0.5">{member.role}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )))}
          </div>
        </div>
      </div>
    </section>
  )
}
