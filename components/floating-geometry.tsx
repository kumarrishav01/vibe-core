"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Box, Sphere, Octahedron } from "@react-three/drei"
import type { Mesh } from "three"

export default function FloatingGeometry() {
  const group1Ref = useRef<Mesh>(null)
  const group2Ref = useRef<Mesh>(null)
  const octagonRef = useRef<Mesh>(null)
  const [scrollY, setScrollY] = useState(0)
  const { mouse } = useThree()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Calculate scroll progress for octagon scaling
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = Math.min(scrollY / (maxScroll || 1), 1)
    const octagonScale = 1 + scrollProgress * 0.8 // Scale from 1 to 1.8

    if (group1Ref.current) {
      group1Ref.current.rotation.x = time * 0.2
      group1Ref.current.rotation.y = time * 0.3
      group1Ref.current.position.y = Math.sin(time) * 0.5
    }

    if (group2Ref.current) {
      group2Ref.current.rotation.x = time * -0.1
      group2Ref.current.rotation.z = time * 0.4
      group2Ref.current.position.x = Math.cos(time * 0.8) * 2
    }

    // Scroll-responsive octagon
    if (octagonRef.current) {
      octagonRef.current.rotation.x = time * 0.15
      octagonRef.current.rotation.y = time * 0.25
      octagonRef.current.rotation.z = time * 0.1
      octagonRef.current.scale.setScalar(octagonScale)
      octagonRef.current.position.y = Math.cos(time * 0.8) * 0.3

      // Subtle mouse influence
      const mouseInfluence = 0.3
      octagonRef.current.position.x = -3 + mouse.x * mouseInfluence
      octagonRef.current.position.z = -2 + mouse.y * mouseInfluence
    }
  })

  return (
    <group>
      {/* Floating Sphere */}
      <Sphere ref={group2Ref} position={[4, -1, -2]} args={[0.3, 16, 16]}>
        <meshStandardMaterial color="#ffaa00" transparent opacity={0.7} />
      </Sphere>

      {/* Scroll-responsive Octagon with visible strokes */}
      <Octahedron ref={octagonRef} position={[-3, 0, -2]} args={[0.6]}>
        <meshStandardMaterial
          color="#ff0088"
          wireframe
          transparent
          opacity={0.8}
          emissive="#ff0088"
          emissiveIntensity={0.1}
        />
      </Octahedron>

      {/* Additional smaller elements */}
      <Box position={[6, 0, -6]} args={[0.2, 0.2, 0.2]}>
        <meshStandardMaterial color="#aa00ff" wireframe />
      </Box>

      <Sphere position={[-5, -3, -5]} args={[0.15, 8, 8]}>
        <meshStandardMaterial color="#00aaff" />
      </Sphere>
    </group>
  )
}
