"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Color } from "three"
import type { Points, BufferGeometry, Float32BufferAttribute } from "three"

export default function MorphingParticles() {
  const pointsRef = useRef<Points>(null)
  const { mouse } = useThree()

  // Crystal particle count
  const particleCount = 800

  const { positions, originalPositions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const crystalColors = [
      new Color(0xff0000), // Bright red
      new Color(0x8b0000), // Dark red
      new Color(0x2c0000), // Very dark red
      new Color(0x000000), // Black
      new Color(0x1a0000), // Dark crimson
    ]

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 12
      const y = (Math.random() - 0.5) * 12
      const z = (Math.random() - 0.5) * 8

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      // Assign crystal colors
      const colorIndex = Math.floor(Math.random() * crystalColors.length)
      const color = crystalColors[colorIndex]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, originalPositions, colors }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      const geometry = pointsRef.current.geometry as BufferGeometry
      const positionAttribute = geometry.getAttribute("position") as Float32BufferAttribute
      const positions = positionAttribute.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        // Original position
        const originalX = originalPositions[i3]
        const originalY = originalPositions[i3 + 1]
        const originalZ = originalPositions[i3 + 2]

        // Mouse repulsion effect
        const mouseX = mouse.x * 5
        const mouseY = mouse.y * 5
        const distance = Math.sqrt((originalX - mouseX) ** 2 + (originalY - mouseY) ** 2)

        // Repulsion force - particles move away from mouse
        const repulsionRadius = 3
        const repulsionStrength = 0.5
        let repulsionX = 0
        let repulsionY = 0

        if (distance < repulsionRadius && distance > 0) {
          const force = ((repulsionRadius - distance) / repulsionRadius) * repulsionStrength
          repulsionX = ((originalX - mouseX) / distance) * force
          repulsionY = ((originalY - mouseY) / distance) * force
        }

        // Crystal-like motion - more angular and sharp
        const time = state.clock.elapsedTime
        const crystalWave = Math.sin(time * 0.5 + originalX * 0.2) * 0.4 + Math.cos(time * 0.3 + originalY * 0.15) * 0.3
        const sharpMovement = Math.sin(time + i * 0.02) * 0.2

        // Apply transformations with repulsion and crystal-like movement
        positions[i3] = originalX + sharpMovement + repulsionX
        positions[i3 + 1] = originalY + Math.cos(time * 0.8 + i * 0.015) * 0.25 + repulsionY
        positions[i3 + 2] = originalZ + crystalWave * 0.4
      }

      positionAttribute.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.025} 
        transparent 
        opacity={0.9} 
        sizeAttenuation
        vertexColors
      />
    </points>
  )
}
