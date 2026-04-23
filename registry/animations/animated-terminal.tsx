"use client"

import * as React from "react"
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Terminal as TerminalIcon, Copy, RotateCcw, Check } from "lucide-react"

import { cn } from "@/lib/utils"

// --- Contexts ---

interface TerminalContextValue {
  activeIndex: number
  completeItem: (index: number) => void
  sequenceStarted: boolean
}

const TerminalContext = createContext<TerminalContextValue | null>(null)
const useTerminal = () => useContext(TerminalContext)

const ItemIndexContext = createContext<number | null>(null)
const useItemIndex = () => useContext(ItemIndexContext)

// --- Components ---

interface AnimatedSpanProps {
  children: React.ReactNode
  delay?: number
  className?: string
  startOnView?: boolean
}

/**
 * AnimatedSpan fades in content after a delay or based on terminal sequence.
 */
export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  startOnView = false,
}: AnimatedSpanProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(elementRef, { amount: 0.3, once: true })

  const terminal = useTerminal()
  const itemIndex = useItemIndex()
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!terminal || itemIndex === null) return
    if (!terminal.sequenceStarted) return
    if (hasStarted) return
    if (terminal.activeIndex === itemIndex) {
      setHasStarted(true)
    }
  }, [terminal, hasStarted, itemIndex])

  const shouldAnimate = terminal ? hasStarted : startOnView ? isInView : true

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: 5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
      transition={{ duration: 0.3, delay: terminal ? 0 : delay / 1000 }}
      className={cn("text-sm font-mono", className)}
      onAnimationComplete={() => {
        if (terminal && itemIndex !== null && shouldAnimate) {
          terminal.completeItem(itemIndex)
        }
      }}
    >
      {children}
    </motion.div>
  )
}

interface TypingTextProps {
  children: string
  className?: string
  duration?: number
  delay?: number
  startOnView?: boolean
  showCursor?: boolean
}

/**
 * TypingText simulates a terminal typing experience with a blinking cursor.
 */
export const TypingText = ({
  children,
  className,
  duration = 40,
  delay = 0,
  startOnView = true,
  showCursor = true,
}: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(elementRef, { amount: 0.3, once: true })

  const terminal = useTerminal()
  const itemIndex = useItemIndex()

  useEffect(() => {
    if (terminal && itemIndex !== null) {
      if (terminal.sequenceStarted && !started && terminal.activeIndex === itemIndex) {
        setStarted(true)
      }
    } else if (!startOnView || isInView) {
      const timer = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(timer)
    }
  }, [terminal, itemIndex, started, startOnView, isInView, delay])

  useEffect(() => {
    if (!started || isDone) return

    let i = 0
    const interval = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setIsDone(true)
        if (terminal && itemIndex !== null) {
          terminal.completeItem(itemIndex)
        }
      }
    }, duration)

    return () => clearInterval(interval)
  }, [children, duration, started, isDone, terminal, itemIndex])

  return (
    <span ref={elementRef} className={cn("inline-block font-mono text-sm", className)}>
      {displayedText}
      {showCursor && started && !isDone && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-2 h-4 ml-1 bg-current align-middle"
        />
      )}
    </span>
  )
}

interface TerminalLineProps {
  children: React.ReactNode
  prompt?: string
  className?: string
}

/**
 * TerminalLine provides an optional prompt prefix to a line of text.
 */
export const TerminalLine = ({ children, prompt, className }: TerminalLineProps) => {
  return (
    <div className={cn("flex flex-row gap-2 items-start", className)}>
      {prompt && (
        <span className="shrink-0 font-mono text-sm text-green-500 font-bold opacity-80">
          {prompt}
        </span>
      )}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}

interface AnimatedTerminalProps {
  children: React.ReactNode
  className?: string
  title?: string
  sequence?: boolean
  startOnView?: boolean
  showCrtEffect?: boolean
}

/**
 * AnimatedTerminal is the premium container with CRT effects and glassmorphism.
 */
export const AnimatedTerminal = ({
  children,
  className,
  title = "bash",
  sequence = true,
  startOnView = true,
  showCrtEffect = true,
}: AnimatedTerminalProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentEndRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { amount: 0.3, once: true })

  const [activeIndex, setActiveIndex] = useState(0)
  const [isCopied, setIsCopied] = useState(false)
  const [replayKey, setReplayKey] = useState(0)

  const sequenceStarted = sequence ? !startOnView || isInView : true

  const contextValue = useMemo(() => ({
    activeIndex,
    completeItem: (index: number) => {
      setActiveIndex((prev) => (index === prev ? prev + 1 : prev))
    },
    sequenceStarted,
  }), [activeIndex, sequenceStarted])

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children
    return Children.toArray(children).map((child, index) => (
      <ItemIndexContext.Provider key={`${replayKey}-${index}`} value={index}>
        {child}
      </ItemIndexContext.Provider>
    ))
  }, [children, sequence, replayKey])

  // Auto-scroll logic
  useEffect(() => {
    if (contentEndRef.current) {
      contentEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeIndex])

  const handleCopy = () => {
    const text = containerRef.current?.innerText || ""
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleReplay = () => {
    setReplayKey(prev => prev + 1)
    setActiveIndex(0)
  }

  return (
    <TerminalContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn(
          "relative group overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl transition-all duration-500",
          "hover:border-white/20",
          className
        )}
      >
        {/* CRT Effect Overlay */}
        {showCrtEffect && (
          <div className="absolute inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_100%),linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-[100]" />
            <div className="absolute inset-0 bg-scanline animate-scanline opacity-[0.03]" />
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.4)]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.4)]" />
            </div>
            <div className="flex items-center gap-2 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
              <TerminalIcon className="w-3 h-3 text-white/40" />
              <span className="text-[11px] font-mono font-medium text-white/40 tracking-tight select-none">
                {title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleReplay}
              className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors"
              title="Replay sequence"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors"
              title="Copy terminal content"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 max-h-[400px] overflow-auto custom-scrollbar relative overflow-x-hidden">
          <div className="grid gap-y-1.5 relative z-10">
            {wrappedChildren}
          </div>
          <div ref={contentEndRef} />

          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-blue-500/10 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-purple-500/10 blur-[80px] pointer-events-none" />
        </div>

        <style jsx global>{`
          @keyframes scanline {
            0% { transform: translateY(0); }
            100% { transform: translateY(100%); }
          }
          .animate-scanline {
            animation: scanline 8s linear infinite;
            background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent);
            height: 100px;
            width: 100%;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `}</style>
      </div>
    </TerminalContext.Provider>
  )
}

