export interface ComponentItem {
  id: string
  name: string
  description: string
  category: "Buttons" | "Cards" | "Inputs" | "Animations" | "Special Effects"
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
  /*
  {
    id: "bt-1",
    name: "Colourful Bento Grid",
    description: "A high-impact, responsive Bento-style grid with industry-specific cards and smooth animations.",
    category: "Cards",
    tags: ["Bento Grid", "Animated", "Premium"],
    installation: "npm install framer-motion clsx tailwind-merge",
    code: `export const ColourfulBentoGrid = () => {
  return <div className="grid grid-cols-3 gap-4">Bento Grid</div>
}`,
  },
  */
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
]
