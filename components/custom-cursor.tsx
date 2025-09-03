"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cursorType, setCursorType] = useState("default")

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains("cursor-hover")) {
        setIsHovering(true)
        setCursorType(target.dataset.cursorType || "hover")
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorType("default")
    }

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
    }
  }, [])

  return (
    <>
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px) scale(${isHovering ? 2 : 1})`,
          backgroundColor: cursorType === "work" ? "#00ff88" : cursorType === "contact" ? "#ff0088" : "#ffffff",
        }}
      />
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-40 transition-all duration-500 ease-out"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isHovering ? 1.5 : 1})`,
          opacity: isHovering ? 0.8 : 0.3,
        }}
      />
    </>
  )
}
