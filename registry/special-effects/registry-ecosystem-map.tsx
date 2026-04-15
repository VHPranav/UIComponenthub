"use client"

import React, { forwardRef, useRef } from "react"
import { Box, Typography } from "@mui/material"
import { Database, Calendar, Headphones, MessageSquare, Zap, Bot } from "lucide-react"
import { AnimatedBeam } from "./animated-beam"

const Circle = forwardRef<HTMLDivElement, { children: React.ReactNode; style?: React.CSSProperties; size?: number | string }>(
  ({ children, style, size = 60 }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          zIndex: 10,
          display: "flex",
          width: size,
          height: size,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "2px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          ...style,
        }}
      >
        {children}
      </Box>
    )
  }
)

Circle.displayName = "Circle"

export function RegistryEcosystemMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null) // CRM (Database)
  const div2Ref = useRef<HTMLDivElement>(null) // Calendars (Calendar)
  const div3Ref = useRef<HTMLDivElement>(null) // Help Desks (Headphones)
  const div4Ref = useRef<HTMLDivElement>(null) // Center (Alpha Bot)
  const div5Ref = useRef<HTMLDivElement>(null) // Comms (MessageSquare)
  const div6Ref = useRef<HTMLDivElement>(null) // Zapier (Zap)

  return (
    <Box 
      sx={{ 
        width: "100%", 
        minHeight: "400px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "transparent",
        overflow: "visible",
        py: 4
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          display: "flex",
          height: { xs: "340px", md: "420px" },
          width: "100%",
          maxWidth: "800px",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
          px: { xs: 2, sm: 4 },
          margin: "0 auto",
        }}
      >
        <Box 
          sx={{ 
            display: "flex", 
            height: "100%", 
            width: "100%", 
            maxWidth: "500px", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "space-between", 
            gap: { xs: 2, md: 4 } 
          }}
        >
          {/* Top Row */}
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, width: "80px" }}>
              <Circle ref={div1Ref} size={56}><Database size={24} color="#2563EB" /></Circle>
              <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500, display: { xs: "none", sm: "block" }, fontSize: "0.7rem" }}>CRM</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, width: "80px" }}>
              <Circle ref={div2Ref} size={56}><Calendar size={24} color="#10B981" /></Circle>
              <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500, display: { xs: "none", sm: "block" }, fontSize: "0.7rem" }}>Calendars</Typography>
            </Box>
          </Box>

          {/* Middle Row */}
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, width: "80px" }}>
              <Circle ref={div3Ref} size={56}><Headphones size={24} color="#F59E0B" /></Circle>
              <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500, display: { xs: "none", sm: "block" }, fontSize: "0.7rem" }}>Help Desks</Typography>
            </Box>

            {/* Center Hub */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, zIndex: 20, width: "100px" }}>
              <Circle 
                ref={div4Ref} 
                size={80} 
                style={{ 
                  border: "4px solid rgba(37, 99, 235, 0.2)", 
                  backgroundColor: "#EFF6FF", 
                  boxShadow: "0 0 30px rgba(37, 99, 235, 0.2)" 
                }}
              >
                <Bot size={40} color="#2563EB" />
              </Circle>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: "#2563EB", 
                  fontWeight: 700, 
                  mt: 1, 
                  display: { xs: "none", sm: "block" },
                  fontSize: "0.75rem",
                  textAlign: "center"
                }}
              >
                Alpha Interface
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, width: "80px" }}>
              <Circle ref={div5Ref} size={56}><MessageSquare size={24} color="#8B5CF6" /></Circle>
              <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500, display: { xs: "none", sm: "block" }, fontSize: "0.7rem" }}>Comms</Typography>
            </Box>
          </Box>

          {/* Bottom Row */}
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, width: "80px" }}>
              <Circle ref={div6Ref} size={56}><Zap size={24} color="#EF4444" /></Circle>
              <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 500, display: { xs: "none", sm: "block" }, fontSize: "0.7rem" }}>Automation</Typography>
            </Box>
          </Box>
        </Box>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-60}
          endYOffset={-10}
          pathColor="rgba(0,0,0,0.06)"
          gradientStartColor="#ffaa40"
          gradientStopColor="#9c40ff"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
          curvature={60}
          endYOffset={-10}
          reverse
          pathColor="rgba(0,0,0,0.06)"
          gradientStartColor="#10B981"
          gradientStopColor="#2563EB"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          endXOffset={-10}
          pathColor="rgba(0,0,0,0.06)"
          gradientStartColor="#F59E0B"
          gradientStopColor="#EF4444"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div4Ref}
          endXOffset={10}
          reverse
          pathColor="rgba(0,0,0,0.06)"
          gradientStartColor="#8B5CF6"
          gradientStopColor="#2563EB"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div4Ref}
          curvature={0}
          endYOffset={10}
          reverse
          pathColor="rgba(0,0,0,0.06)"
          gradientStartColor="#EF4444"
          gradientStopColor="#2563EB"
        />
      </Box>
    </Box>
  )
}
