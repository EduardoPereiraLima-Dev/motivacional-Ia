"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedGradientText({ children, className = "" }: AnimatedGradientTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    let hue = 0
    let animationFrameId: number

    const animate = () => {
      hue = (hue + 0.5) % 360

      // Create a vibrant gradient that shifts through colors
      const gradient = `
        linear-gradient(
          to right,
          hsl(${hue}, 100%, 50%),
          hsl(${(hue + 60) % 360}, 100%, 50%),
          hsl(${(hue + 120) % 360}, 100%, 50%),
          hsl(${(hue + 180) % 360}, 100%, 50%),
          hsl(${(hue + 240) % 360}, 100%, 50%),
          hsl(${(hue + 300) % 360}, 100%, 50%)
        )
      `

      element.style.backgroundImage = gradient
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      ref={textRef}
      className={`bg-clip-text text-transparent inline-block bg-gradient-to-r ${className}`}
      style={{
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
      }}
    >
      {children}
    </div>
  )
}
