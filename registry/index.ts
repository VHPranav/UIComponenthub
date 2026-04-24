import React from "react"
import { FallingText } from "./animations/falling-text"
import { CountUpDemo } from "./animations/count-up-demo"
import { ShinyText } from "./animations/shiny-text"
import { RotatingText } from "./animations/rotating-text"
import { DecryptedText } from "./animations/decrypted-text"
import { TypingAnimation } from "./animations/typing-animation"
import { BlurText } from "./animations/blur-text"
import { ScrollRevealDemo } from "./animations/scroll-reveal-demo"
import { ScrollVelocityDemo } from "./animations/scroll-velocity-demo"
import { AnimatedContentDemo } from "./animations/animated-content-demo"
import { GlareCardDemo } from "./animations/glare-card-demo"
import { ThreeConfettiDemo } from "./animations/three-confetti-demo"
import { FloatingCardsEffectDemo } from "./animations/floating-cards-effect-demo"
import { AnimatedTerminalDemo } from "./animations/animated-terminal-demo"
import { MagicRingsCyberpunk } from "./backgrounds/magic-rings-cyberpunk"
import { MagicRingsSerenity } from "./backgrounds/magic-rings-serenity"
import { MagicRingsParallax } from "./backgrounds/magic-rings-parallax"
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
import { InteractivePixelGrid } from "./backgrounds/interactive-pixel-grid"
import { MagneticIntegrationsOrb } from "./backgrounds/magnetic-integrations-orb"
import { RegistryEcosystemMap } from "./special-effects/registry-ecosystem-map"
import { GradualBlurDemo } from "./special-effects/gradual-blur-demo"
import { SplashCursorDemo } from "./special-effects/splash-cursor-demo"
import { FluidGooeyEffectDemo } from "./special-effects/fluid-gooey-effect-demo"
import { RadialIntroDemo } from "./special-effects/radial-intro-demo"
import { DockDemo } from "./magicui/dock-demo"
import { ProgressiveBlurDemo } from "./special-effects/progressive-blur-demo"
import { BalloonBackgroundDemo } from "./backgrounds/balloon-background-demo"
import { UnityNodesDemo } from "./backgrounds/unity-nodes-demo"
import { AutumnBreezeDemo } from "./backgrounds/autumn-breeze-demo"
import { KineticBalanceDemo } from "./backgrounds/kinetic-balance-demo"
import { TeamSectionDemo } from "./sections/team-section-demo"
// import { ColourfulBentoGrid } from "./cards/colourful-bento-grid"

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
  "interactive-pixel-grid": InteractivePixelGrid,
  "magnetic-integrations-orb": MagneticIntegrationsOrb,
  "registry-ecosystem-map": RegistryEcosystemMap,
  "blur-text": BlurText as any,
  "typing-animation": TypingAnimation,
  "falling-text": FallingText,
  "decrypted-text": DecryptedText,
  "rotating-text": RotatingText,
  "count-up": CountUpDemo,
  "shiny-text": ShinyText,
  "scroll-reveal": ScrollRevealDemo,
  "scroll-velocity": ScrollVelocityDemo,
  "animated-content": AnimatedContentDemo,
  "glare-card": GlareCardDemo,
  "magic-rings-cyberpunk": MagicRingsCyberpunk,
  "magic-rings-serenity": MagicRingsSerenity,
  "magic-rings-parallax": MagicRingsParallax,
  "gradual-blur": GradualBlurDemo,
  "splash-cursor": SplashCursorDemo,
  "three-confetti": ThreeConfettiDemo,
  "floating-cards-effect": FloatingCardsEffectDemo,
  "fluid-gooey-effect": FluidGooeyEffectDemo,
  "radial-intro": RadialIntroDemo,
  "dock": DockDemo,
  "progressive-blur": ProgressiveBlurDemo,
  "animated-terminal": AnimatedTerminalDemo,
  "balloon-background": BalloonBackgroundDemo,
  "unity-nodes": UnityNodesDemo,
  "autumn-breeze": AutumnBreezeDemo,
  "kinetic-balance": KineticBalanceDemo,
  "team-section": TeamSectionDemo,
  // "colourful-bento-grid": ColourfulBentoGrid,
}
