"use client"

import { 
  AnimatedTerminal, 
  TerminalLine, 
  TypingText, 
  AnimatedSpan 
} from "./animated-terminal"

export function AnimatedTerminalDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex items-center justify-center min-h-[500px]">
      <AnimatedTerminal title="antigravity@hub: ~" className="w-full shadow-blue-500/10">
        <TerminalLine prompt="$">
          <TypingText duration={30}>npx ui-hub init</TypingText>
        </TerminalLine>

        <AnimatedSpan delay={200} className="text-blue-400">
          🔍 Searching for packages...
        </AnimatedSpan>

        <AnimatedSpan delay={500} className="text-white/70">
          ✔ Dependencies found.
        </AnimatedSpan>

        <TerminalLine prompt="?">
          <TypingText delay={100} duration={20}>Which components would you like to install?</TypingText>
        </TerminalLine>

        <AnimatedSpan className="text-yellow-500">
          ❯ Animated Terminal
        </AnimatedSpan>
        
        <AnimatedSpan className="text-white/40">
          &nbsp; Fluid Gooey Effect
        </AnimatedSpan>

        <TerminalLine prompt="$">
          <TypingText delay={300} duration={30}>installing animated-terminal --force</TypingText>
        </TerminalLine>

        <AnimatedSpan className="text-green-400">
          ✨ Installation complete! Your terminal is now cooler.
        </AnimatedSpan>

        <TerminalLine prompt="$">
          <TypingText delay={500} duration={60}>echo "Experience the retro-future."</TypingText>
        </TerminalLine>
        
        <AnimatedSpan className="mt-2 p-2 bg-white/5 rounded border border-white/10 text-xs italic text-blue-300">
          "The best way to predict the future is to animate it."
        </AnimatedSpan>
      </AnimatedTerminal>
    </div>
  )
}
