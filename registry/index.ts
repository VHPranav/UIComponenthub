import React from "react"
import { GlassButton } from "./buttons/glass-button"
import { ShimmerButton } from "./buttons/shimmer-button"
import { RetroButton } from "./buttons/retro-button"
import { TiltCard } from "./cards/tilt-card"
import { SpotlightCard } from "./cards/spotlight-card"
import { GlassNavbar } from "./nav/glass-navbar"
import { SpringModal } from "./modals/spring-modal"
import { BeamInput } from "./inputs/beam-input"
import { OrbitLoader } from "./loaders/orbit-loader"
import { LiquidLoader } from "./loaders/liquid-loader"

export const registry: Record<string, React.ComponentType<any>> = {
  "glass-button": GlassButton,
  "shimmer-button": ShimmerButton,
  "retro-button": RetroButton,
  "tilt-card": TiltCard,
  "spotlight-card": SpotlightCard,
  "glass-navbar": GlassNavbar,
  "spring-modal": SpringModal,
  "beam-input": BeamInput,
  "orbit-loader": OrbitLoader,
  "liquid-loader": LiquidLoader,
}
