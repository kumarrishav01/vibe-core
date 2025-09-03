"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Cylinder } from "@react-three/drei"
import type { Mesh } from "three"

export default function Octagon3D() {
  const octagonRef = useRef<Mesh>(null)
  const { mouse, viewport } = useThree()

  useFrame((state) => {
    if (octagonRef.current) {
      const time = state.clock.elapsedTime

      // Mouse influence on rotation
      const mouseInfluenceX = mouse.y * 0.3
      const mouseInfluenceY = mouse.x * 0.3

      // Base rotation + mouse influence
      octagonRef.current.rotation.x = time * 0.1 + mouseInfluenceX
      octagonRef.current.rotation.y = time * 0.15 + mouseInfluenceY
      octagonRef.current.rotation.z = Math.sin(time * 0.2) * 0.1

      // Mouse influence on position (subtle)
      octagonRef.current.position.x = mouse.x * 0.5
      octagonRef.current.position.y = mouse.y * 0.3

      // Breathing/scaling effect
      const scale = 1 + Math.sin(time * 0.8) * 0.05
      octagonRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group position={[0, 0, -5]}>
      {/* Main large octagon using cylinder with 8 segments */}
      <Cylinder
        ref={octagonRef}
        args={[8, 8, 0.2, 8]} // radiusTop, radiusBottom, height, radialSegments
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#1a1a2e"
          wireframe
          transparent
          opacity={0.3}
          emissive="#0f0f1a"
          emissiveIntensity={0.1}
        />
      </Cylinder>

      {/* Inner octagon ring */}
      <Cylinder
        args={[6, 6, 0.1, 8]}
        position={[0, 0, 0.2]}
        rotation={[0, Math.PI / 8, 0]} // Offset rotation for visual interest
      >
        <meshStandardMaterial
          color="#2a2a4e"
          wireframe
          transparent
          opacity={0.2}
          emissive="#1a1a3e"
          emissiveIntensity={0.05}
        />
      </Cylinder>

      {/* Outer octagon ring */}
      <Cylinder
        args={[10, 10, 0.05, 8]}
        position={[0, 0, -0.2]}
        rotation={[0, -Math.PI / 8, 0]} // Opposite offset rotation
      >
        <meshStandardMaterial
          color="#0a0a1e"
          wireframe
          transparent
          opacity={0.15}
          emissive="#050510"
          emissiveIntensity={0.02}
        />
      </Cylinder>
    </group>
  )
}
