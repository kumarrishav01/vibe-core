"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { CanvasTexture } from "three"
import type { Points, BufferGeometry, Float32BufferAttribute } from "three"

export default function FallingSakura() {
  const pointsRef = useRef<Points>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const particleCount = 200

  const { positions, velocities, starTexture } = useMemo(() => {
    if (!mounted) return { positions: new Float32Array(0), velocities: new Float32Array(0), starTexture: null }
    
    // Create star texture
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')!
    
    ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, 64, 64)
    
    // Draw star
    ctx.fillStyle = '#ff0000'
    ctx.beginPath()
    const centerX = 32, centerY = 32, outerRadius = 25, innerRadius = 10, spikes = 5
    
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fill()
    
    const starTexture = new CanvasTexture(canvas)
    
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 15 + 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = -Math.random() * 0.02 - 0.005
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005
    }

    return { positions, velocities, starTexture }
  }, [mounted])

  useFrame((state) => {
    if (!pointsRef.current || !mounted) return
    
    const geometry = pointsRef.current.geometry as BufferGeometry
    const positionAttribute = geometry.getAttribute("position") as Float32BufferAttribute
    const positions = positionAttribute.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] += velocities[i3 + 2]

      positions[i3] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.001

      if (positions[i3 + 1] < -8) {
        positions[i3] = (Math.random() - 0.5) * 20
        positions[i3 + 1] = Math.random() * 5 + 10
        positions[i3 + 2] = (Math.random() - 0.5) * 10
      }
    }

    positionAttribute.needsUpdate = true
  })

  if (!mounted) return null

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        map={starTexture}
        transparent 
        opacity={0.9} 
        sizeAttenuation
        alphaTest={0.1}
      />
    </points>
  )
}