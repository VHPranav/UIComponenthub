import { Category } from "./types"

export interface ComponentItem {
  id: string
  name: string
  description: string
  category: Category
  tags: string[]
  preview?: string
  code: string
  installation: string
}

export const CATEGORIES = [
  "All",
  "Buttons",
  "Cards",
  "Inputs",
  "Animations",
  "Special Effects",
  "Backgrounds",
  "Navigation",
] as const

export const ALL_TAGS = [
  "Animated",
  "Interactive",
  "Gradient",
  "Glassmorphism",
  "Micro-interaction",
  "Minimal",
  "Futuristic",
]

export const componentsData: ComponentItem[] = [
  {
    id: "br-1",
    name: "Shimmer Button",
    description: "A button with a smooth shimmer effect that follows the cursor or mouse movement.",
    category: "Buttons",
    tags: ["Animated", "Interactive", "Gradient"],
    installation: "npm install framer-motion lucide-react",
    code: `import { motion } from "framer-motion"

export const ShimmerButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-6 py-3 font-bold text-white transition-all bg-primary rounded-lg overflow-hidden group"
    >
      <span className="relative z-10">Shimmer Effect</span>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
    </motion.button>
  )
}`,
  },
  {
    id: "cd-1",
    name: "Glass Card",
    description: "A card with realistic glassmorphism effect using backdrop filters and border gradients.",
    category: "Cards",
    tags: ["Glassmorphism", "Minimal"],
    installation: "npm install lucide-react",
    code: `export const GlassCard = ({ children }) => {
  return (
    <div className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
      {children}
    </div>
  )
}`,
  },
  {
    id: "in-1",
    name: "Floating Input",
    description: "A modern input with a floating label and smooth focus transitions.",
    category: "Inputs",
    tags: ["Interactive", "Minimal"],
    installation: "npm install lucide-react",
    code: `export const FloatingInput = () => {
  return <input className="p-2 border rounded" placeholder="Floating..." />
}`,
  },
  {
    id: "an-1",
    name: "Text Wave",
    description: "A text animation where characters move in a wave-like patterns.",
    category: "Animations",
    tags: ["Animated", "Micro-interaction"],
    installation: "npm install framer-motion",
    code: `export const TextWave = () => {
  return <div className="animate-bounce">Wave</div>
}`,
  },
  {
    id: "se-1",
    name: "Particles Glow",
    description: "A special effect that creates glowing particle clusters in the background.",
    category: "Special Effects",
    tags: ["Futuristic", "Animated"],
    installation: "npm install tw-animate-css",
    code: `export const ParticlesGlow = () => {
  return <div className="bg-primary/20 blur-xl w-20 h-20 rounded-full" />
}`,
  },
  {
    id: "br-2",
    name: "Magnetic Button",
    description: "A button that subtly pulls toward the cursor when nearby.",
    category: "Buttons",
    tags: ["Interactive", "Micro-interaction"],
    installation: "npm install framer-motion",
    code: `export const MagneticButton = () => {
  return <button>Magnetic</button>
}`,
  },
  {
    id: "cd-2",
    name: "3D Perspective Card",
    description: "A card that tilts in 3D space based on mouse position.",
    category: "Cards",
    tags: ["Interactive", "Futuristic"],
    installation: "npm install framer-motion",
    code: `export const PerspectiveCard = () => {
  return <div className="w-40 h-40 bg-muted rounded-xl" />
}`,
  },
  {
    id: "bg-1",
    name: "Interactive Pixel Grid",
    description: "A premium, interactive square grid background that responds to mouse movement and features an automated idle ripple animation.",
    category: "Backgrounds",
    tags: ["Interactive", "Animated", "Minimalist"],
    installation: "npm install framer-motion clsx tailwind-merge",
    code: `export const InteractivePixelGrid = () => {
  return <div className="w-full h-full bg-grid-zinc-200" />
}`,
  },
  {
    id: "bg-2",
    name: "Magnetic Integrations Orb",
    description: "A stunning floating integration icons display with a magnetic hover effect and smooth float animations. Perfect as a section background.",
    category: "Backgrounds",
    tags: ["Magnetic", "Animated", "Interactive", "Integrations"],
    installation: "npm install framer-motion lucide-react",
    code: `export const MagneticIntegrationsOrb = () => {
  return <MagneticIntegrationsOrb />
}`,
  },
  {
    id: "blur-text",
    name: "Blur Text",
    description: "An elegant text animation component that reveals text with a smooth blur and motion effect. Supports words and letters animation.",
    category: "Animations",
    tags: ["Animated", "Typography", "Motion"],
    installation: "npm install framer-motion",
    code: `export const BlurText = () => {
  return <BlurText text="Animated Text" />
}`,
  },
  {
    id: "typing-animation",
    name: "Typing Animation",
    description: "A dynamic text component that simulates a typing effect character-by-character. Perfect for hero headlines and intro sections.",
    category: "Animations",
    tags: ["Animated", "Typography", "Interactive"],
    installation: "npm install framer-motion",
    code: `export const TypingAnimation = () => {
  return <TypingAnimation text="Hello World" />
}`,
  },
  {
    id: "falling-text",
    name: "Falling Letters",
    description: "A high-impact physics animation where text breaks into individual characters that fall and react to gravity and mouse interaction. Powered by Matter.js.",
    category: "Animations",
    tags: ["Physics", "Interactive", "Animated", "Typography"],
    installation: "npm install matter-js",
    code: `export const FallingTextEffect = () => {
  return <FallingText text="Gravity is real" fontSize="2rem" />
}`,
  },
  {
    id: "decrypted-text",
    name: "Decrypted Text",
    description: "A premium text entrance effect where characters transition from a glitchy scramble to clear text. Features per-character motion, scaling, and jitter.",
    category: "Animations",
    tags: ["Animated", "Typography", "Glitch", "Motion"],
    installation: "npm install framer-motion",
    code: `export const DecryptedTextEffect = () => {
  return <DecryptedText text="Cyberpunk Reveal" />
}`,
  },
  {
    id: "rotating-text",
    name: "Rotating Text",
    description: "A versatile text rotation component that transitions through an array of strings with highly customizable character, word, or line-level animations.",
    category: "Animations",
    tags: ["Animated", "Typography", "Motion", "Rotating"],
    installation: "npm install framer-motion",
    code: `export const RotatingTextEffect = () => {
  return <RotatingText texts={["React", "Motion", "Tailwind", "Next.js"]} />
}`,
  },
  {
    id: "count-up",
    name: "Number Count Up",
    description: "A high-performance number animation component that uses spring physics for smooth, natural numerical transitions. Supports decimals and custom separators.",
    category: "Animations",
    tags: ["Animated", "Numbers", "Spring", "Motion"],
    installation: "npm install framer-motion",
    code: `export const CountUpEffect = () => {
  return <CountUp to={100} duration={2} />
}`,
  },
  {
    id: "shiny-text",
    name: "Shiny Text",
    description: "A premium typography effect that animates a radiant shine across the text. Supports customizable speed, colors, and interactive hover states.",
    category: "Animations",
    tags: ["Animated", "Typography", "Shine", "Motion"],
    installation: "npm install framer-motion",
    code: `export const ShinyTextExample = () => {
  return <ShinyText text="Shimmering Content" speed={2} />
}`,
  },
  {
    id: "animated-content",
    name: "Animated Content",
    description: "A high-performance entrance animation component powered by GSAP. Supports configurable directions, staggering, and scroll-triggered activation.",
    category: "Animations",
    tags: ["Animated", "GSAP", "ScrollTrigger", "Entrance"],
    installation: "npm install gsap",
    code: `import { AnimatedContent } from "@/registry/animations/animated-content"

export const AnimatedContentDemo = () => {
  return (
    <AnimatedContent direction="vertical" distance={50}>
      <div>Animated Content</div>
    </AnimatedContent>
  )
}`,
  },
  {
    id: "scroll-reveal",
    name: "Scroll Reveal",
    description: "A premium scroll-driven text reveal effect that brings words to life with organic motion and cinematic depth.",
    category: "Animations",
    tags: ["Animated", "GSAP", "ScrollTrigger", "Typography"],
    installation: "npm install gsap",
    code: `import { ScrollReveal } from "@/registry/animations/scroll-reveal"

export const ScrollRevealDemo = () => {
  return (
    <ScrollReveal>
      Experience a new dimension of typography.
    </ScrollReveal>
  )
}`,
  },
  {
    id: "scroll-velocity",
    name: "Scroll Velocity",
    description: "A high-performance parallax text component that moves at a velocity proportional to the scroll speed. Perfect for dynamic horizontal headlines.",
    category: "Animations",
    tags: ["Animated", "Framer Motion", "Parallax", "Velocity"],
    installation: "npm install framer-motion",
    code: `import { ScrollVelocity } from "@/registry/animations/scroll-velocity"

export const ScrollVelocityDemo = () => {
  return (
    <ScrollVelocity texts={["Dynamic", "Interactive", "High Performance"]} />
  )
}`,
  },
  {
    id: "glare-card",
    name: "Glare Card",
    description: "A premium interactive card component that combines 3D spring physics with dynamic light reflection and glassmorphism. Perfect for showcasing products or features with a high-end feel.",
    category: "Animations",
    tags: ["Animated", "Interactive", "3D", "Tilt", "Glare"],
    installation: "npm install framer-motion",
    code: `import { GlareCard } from "@/registry/animations/glare-card"

export const GlareCardDemo = () => {
  return (
    <GlareCard spotlight className="h-96 w-72 bg-zinc-950 p-8">
      <h3 className="text-xl font-bold">Interactive Surface</h3>
    </GlareCard>
  )
}`,
  },
  {
    id: "floating-cards-effect",
    name: "Floating Cards Effect",
    description: "A premium 3D interaction featuring instanced cards that flow in a wave pattern. Responds dynamically to mouse velocity and position.",
    category: "Animations",
    tags: ["3D", "WebGL", "Three.js", "GSAP", "Interactive"],
    installation: "npm install three @react-three/fiber gsap",
    code: `import FloatingCardsEffect from "@/registry/animations/floating-cards-effect"

export const Demo = () => {
  return (
    <div className="w-full h-full min-h-[500px]">
      <FloatingCardsEffect count={80} spacing={0.45} />
    </div>
  )
}`,
    isNew: true,
  },
  {
    id: "magic-rings-cyberpunk",
    name: "Magic Rings Cyberpunk",
    description: "A high-performance interactive WebGL background featuring multiple 3D rings in a bright cyberpunk aesthetic that react to mouse movements, complete with click bursts.",
    category: "Backgrounds",
    tags: ["Background", "WebGL", "Three.js", "Interactive", "3D", "Cyberpunk"],
    installation: "npm install three && npm install -D @types/three",
    code: `import { MagicRingsCyberpunk } from "@/registry/backgrounds/magic-rings-cyberpunk"

export const Demo = () => {
  return (
    <div className="relative w-full h-[400px]">
        <MagicRingsCyberpunk />
    </div>
  )
}`,
  },
  {
    id: "magic-rings-serenity",
    name: "Magic Rings Serenity",
    description: "A softly blurred, slow-moving pastel WebGL background perfect for subtle, non-distracting visual experiences.",
    category: "Backgrounds",
    tags: ["Background", "WebGL", "Three.js", "Serene", "3D"],
    installation: "npm install three && npm install -D @types/three",
    code: `import { MagicRingsSerenity } from "@/registry/backgrounds/magic-rings-serenity"

export const Demo = () => {
  return (
    <div className="relative w-full h-[400px]">
        <MagicRingsSerenity />
    </div>
  )
}`,
  },
  {
    id: "magic-rings-parallax",
    name: "Magic Rings Parallax",
    description: "A deep space WebGL background featuring high noise levels and intense 3D mouse parallax.",
    category: "Backgrounds",
    tags: ["Background", "WebGL", "Three.js", "Parallax", "3D"],
    installation: "npm install three && npm install -D @types/three",
    code: `import { MagicRingsParallax } from "@/registry/backgrounds/magic-rings-parallax"

export const Demo = () => {
  return (
    <div className="relative w-full h-[400px]">
        <MagicRingsParallax />
    </div>
  )
}`,
  },
  {
    id: "gradual-blur",
    name: "Gradual Blur Overlay",
    description: "A mathematical step-based blur gradient generator that natively fades frosted glass without heavy dependencies.",
    category: "Special Effects",
    tags: ["Blur", "Frosted", "Gradient", "Overlay", "Math"],
    installation: "npm install lucide-react",
    code: `import { GradualBlur } from "@/registry/special-effects/gradual-blur"

export const GradualBlurDemo = () => {
  return (
    <div className="w-full relative min-h-[400px] rounded-xl overflow-hidden shadow-2xl flex flex-col justify-end bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
      <GradualBlur 
        preset="intense" 
        position="bottom" 
        height="12rem"
        curve="ease-out"
        className="z-10 text-white p-8"
      >
        <h2 className="text-3xl font-black">FROSTED GLASS</h2>
      </GradualBlur>
    </div>
  )
}`,
  },
  {
    id: "splash-cursor",
    name: "Splash Cursor",
    description: "A highly interactive, full-screen WebGL fluid simulation that reacts dynamically to cursor swiping and clicking.",
    category: "Special Effects",
    tags: ["WebGL", "Fluid", "Cursor", "Physics", "VFX"],
    installation: "npm install raw-loader",
    code: `import SplashCursor from "@/registry/special-effects/splash-cursor"

export const SplashCursorDemo = () => {
  return (
    <SplashCursor 
      RAINBOW_MODE={false}
      COLOR="#fdce3c"
    />
  )
}
export default SplashCursorDemo`,
  },
  {
    id: "fluid-gooey-effect",
    name: "Fluid Gooey Image Reveal",
    description: "A premium interactive image reveal component featuring GSAP animations and liquid gooey SVG filters. Droplets merge and travel with organic fluid physics.",
    category: "Special Effects",
    tags: ["GSAP", "SVG", "Masking", "Interactive", "Gooey"],
    installation: "npm install gsap",
    code: `import FluidGooeyEffect from "@/registry/special-effects/fluid-gooey-effect"

export const FluidGooeyDemo = () => {
  return (
    <div className="w-full h-[600px]">
      <FluidGooeyEffect
        mainImage="/gooey-bg.png"
        revealImage="/gooey-reveal.png"
        trailCount={10}
        dropletCount={30}
      />
    </div>
  )
}`,
    isNew: true,
  },
  {
    id: "radial-intro",
    name: "Radial Intro Orbit",
    description: "A dynamic orbital entrance animation that places profile items in a circular layout. Features sequential lift-in mechanics and a continuous upright spin.",
    category: "Special Effects",
    tags: ["Animated", "Framer Motion", "Orbital", "Intro"],
    installation: "npm install framer-motion",
    code: `import { RadialIntro } from "@/registry/special-effects/radial-intro"

const ITEMS = [
  { id: 1, name: 'Item 1', src: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Item 2', src: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Item 3', src: 'https://via.placeholder.com/150' },
]

export const Demo = () => {
  return (
    <div className="w-full h-[500px] flex items-center justify-center">
      <RadialIntro orbitItems={ITEMS} stageSize={320} imageSize={64} />
    </div>
  )
}`,
    isNew: true,
  },
  {
    id: "dock",
    title: "Dock",
    description: "A macOS-style dock component with smooth magnification effects and tooltips.",
    category: "Special Effects",
    tags: ["Magic UI", "Dock", "Framer Motion", "Navigation", "Interactive"],
    date: "2026-04-21",
    code: `import { Dock, DockIcon } from "@/registry/magicui/dock"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

export const Demo = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <TooltipProvider>
        <Dock direction="middle">
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-4 w-4 bg-primary rounded-full" />
              </TooltipTrigger>
              <TooltipContent><p>Home</p></TooltipContent>
            </Tooltip>
          </DockIcon>
          {/* Add more icons... */}
        </Dock>
      </TooltipProvider>
    </div>
  )
}`,
    isNew: true,
  },
  {
    id: "progressive-blur",
    title: "Progressive Blur",
    description: "A smooth, graduated backdrop-blur effect created with layered masks for elegant UI overlays.",
    category: "Special Effects",
    tags: ["Blur", "Overlay", "Graduated", "Interactive", "Glassmorphism"],
    date: "2026-04-21",
    code: `import { ProgressiveBlur } from "@/registry/magicui/progressive-blur"

export const Demo = () => {
  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-xl">
      <img 
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover"
        alt="gradient"
      />
      <ProgressiveBlur position="bottom" height="50%" />
      <div className="absolute bottom-6 inset-x-0 text-center font-bold text-white drop-shadow-md">
        Graduated Blur Effect
      </div>
    </div>
  )
}`,
    isNew: true,
  },
  {
    id: "mega-menu-navbar",
    name: "Mega Menu Navbar",
    description: "A premium, scroll-reactive navbar featuring glassmorphic effects and portal-based mega menu dropdowns.",
    category: "Navigation",
    tags: ["Navigation", "Interactive", "Glassmorphism", "Mega Menu"],
    installation: "npm install framer-motion lucide-react clsx tailwind-merge",
    code: `import Navbar from "@/registry/nav/navbar"

export default function Layout() {
  return <Navbar />
}`,
    isNew: true,
  },
]
