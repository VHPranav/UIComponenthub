"use client"

import { useRef, useState, useEffect } from "react"
import Matter from "matter-js"

interface FallingTextProps {
  text?: string
  highlightWords?: string[]
  trigger?: "auto" | "scroll" | "click" | "hover"
  backgroundColor?: string
  wireframes?: boolean
  gravity?: number
  mouseConstraintStiffness?: number
  fontSize?: string
  className?: string
}

export function FallingText({
  text = "Falling Letters",
  highlightWords = [],
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "2rem",
  className = "",
}: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)

  const [effectStarted, setEffectStarted] = useState(false)

  // Split into letters
  useEffect(() => {
    if (!textRef.current) return
    
    // Split text into individual characters
    const characters = text.split("")

    const newHTML = characters
      .map((char) => {
        // Simple highlight logic: check if this character is part of a highlighted word
        // (This is basic, for a better version we'd map word ranges to characters)
        const isHighlighted = highlightWords.some(hw => text.includes(hw) && hw.includes(char))
        
        return `<span 
          class="inline-block select-none leading-none ${isHighlighted ? "text-blue-500 font-bold" : ""}"
          style="display: inline-block; min-width: ${char === " " ? "0.3em" : "auto"}"
        >
          ${char === " " ? "&nbsp;" : char}
        </span>`
      })
      .join("")

    textRef.current.innerHTML = newHTML
  }, [text, highlightWords])

  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true)
      return
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(containerRef.current)
      return () => observer.disconnect()
    }
  }, [trigger])

  useEffect(() => {
    if (!effectStarted) return

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter

    if (!containerRef.current || !canvasContainerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height

    if (width <= 0 || height <= 0) return

    const engine = Engine.create()
    engine.world.gravity.y = gravity

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    })

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    }
    
    // Boundaries
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions)
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions)
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions)
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions)

    if (!textRef.current) return
    const letterSpans = textRef.current.querySelectorAll("span")
    
    const letterBodies = Array.from(letterSpans).map((elem) => {
      const rect = elem.getBoundingClientRect()

      const x = rect.left - containerRect.left + rect.width / 2
      const y = rect.top - containerRect.top + rect.height / 2

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
      })
      
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: 0,
      })
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05)

      return { elem, body }
    })

    // Initial positioning
    letterBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute"
      elem.style.left = `${body.position.x}px`
      elem.style.top = `${body.position.y}px`
      elem.style.transform = "translate(-50%, -50%)"
    })

    const mouse = Mouse.create(containerRef.current)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    })
    render.mouse = mouse

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...letterBodies.map((wb) => wb.body),
    ])

    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)

    const updateLoop = () => {
      letterBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position
        elem.style.left = `${x}px`
        elem.style.top = `${y}px`
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`
      })
      requestAnimationFrame(updateLoop)
    }
    const requestId = requestAnimationFrame(updateLoop)

    return () => {
      cancelAnimationFrame(requestId)
      Render.stop(render)
      Runner.stop(runner)
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas)
      }
      World.clear(engine.world, false)
      Engine.clear(engine)
    }
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness])

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative z-[1] w-full min-h-[400px] cursor-pointer text-center pt-8 overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/50 ${className}`}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="inline-block w-full px-4"
        style={{
          fontSize,
          lineHeight: 1.4,
        }}
      />

      <div className="absolute top-0 left-0 z-0 pointer-events-none" ref={canvasContainerRef} />
    </div>
  )
}
