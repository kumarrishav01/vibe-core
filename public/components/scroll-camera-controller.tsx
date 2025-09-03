"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"

export default function ScrollCameraController() {
  const { camera } = useThree()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame(() => {
    // Calculate scroll progress (0 to 1 based on total page height)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = Math.min(scrollY / (maxScroll || 1), 1)

    // Dynamic camera positioning based on scroll
    // Start close (z: 3) and zoom out as we scroll (z: 12)
    const targetZ = 3 + scrollProgress * 9
    const targetY = scrollProgress * 1.5 // Slight vertical movement
    const targetX = Math.sin(scrollProgress * Math.PI * 1.5) * 0.8 // Subtle horizontal sway

    // Smooth camera interpolation
    camera.position.x += (targetX - camera.position.x) * 0.04
    camera.position.y += (targetY - camera.position.y) * 0.04
    camera.position.z += (targetZ - camera.position.z) * 0.04

    // Dynamic field of view for more dramatic effect
    const targetFov = 75 + scrollProgress * 25
    camera.fov += (targetFov - camera.fov) * 0.04
    camera.updateProjectionMatrix()

    // Look at center with slight offset
    camera.lookAt(0, 0, 0)
  })

  return null
}
