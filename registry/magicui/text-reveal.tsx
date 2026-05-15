"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  containerRef?: React.RefObject<HTMLElement>
}

export const TextReveal: FC<TextRevealProps> = ({ children, className, containerRef }) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  
  // If we have a container, we use it for useScroll. 
  // We use ["start start", "end end"] because the target is the content of the container.
  const { scrollYProgress } = useScroll(
    containerRef 
      ? { container: containerRef } 
      : { target: targetRef, offset: ["start 0.9", "start 0.25"] }
  )

  const words = children.split(" ")

  return (
    <div 
      ref={targetRef} 
      className={cn(
        "relative z-0 w-full", 
        containerRef ? "h-[200%]" : "h-[200vh]",
        className
      )}
    >
      <div
        className={cn(
          "sticky top-0 mx-auto flex max-w-4xl items-center justify-center bg-transparent px-4",
          containerRef ? "h-1/2" : "h-screen"
        )}
      >
        <p
          className={
            "flex flex-wrap justify-center p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </p>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative mx-1 lg:mx-2">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  )
}
