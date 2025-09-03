"use client"
import { motion } from "framer-motion"

import { Canvas } from "@react-three/fiber"
import { Suspense, useRef, useState } from "react"
import { Box, Text, Float, Sphere, Torus, Octahedron } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import ScrollCameraController from "./scroll-camera-controller"
import Image from "next/image"

function WorkItem3D({
  position,
  title,
  isHovered,
  type = "box",
}: { position: [number, number, number]; title: string; isHovered: boolean; type?: string }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      meshRef.current.rotation.y += 0.01
      meshRef.current.scale.setScalar(isHovered ? 1.3 : 1)
    }
  })

  const renderGeometry = () => {
    switch (type) {
      case "sphere":
        return (
          <Sphere ref={meshRef} args={[0.8, 16, 16]}>
            <meshStandardMaterial
              color={isHovered ? "#ff4444" : "#333333"}
              wireframe={isHovered}
              transparent
              opacity={0.8}
            />
          </Sphere>
        )
      case "torus":
        return (
          <Torus ref={meshRef} args={[0.6, 0.3, 16, 32]}>
            <meshStandardMaterial
              color={isHovered ? "#ff2222" : "#333333"}
              wireframe={isHovered}
              transparent
              opacity={0.8}
            />
          </Torus>
        )
      case "octahedron":
        return (
          <Octahedron ref={meshRef} args={[0.8]}>
            <meshStandardMaterial
              color={isHovered ? "#ff6666" : "#333333"}
              wireframe={isHovered}
              transparent
              opacity={0.8}
            />
          </Octahedron>
        )
      default:
        return (
          <Box ref={meshRef} args={[1, 1, 1]}>
            <meshStandardMaterial
              color={isHovered ? "#ff0000" : "#333333"}
              wireframe={isHovered}
              transparent
              opacity={0.8}
            />
          </Box>
        )
    }
  }

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        {renderGeometry()}
        <Text
          position={[0, -1.5, 0]}
          font="/fonts/Geist-Regular.ttf"
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </group>
    </Float>
  )
}

export default function WorksSection() {
  const [hoveredWork, setHoveredWork] = useState<string | null>(null)

  const works = [
    {
      id: "work1",
      title: "Discord Economy Bot",
      description: "Advanced Discord bot with economy systems, giveaways, and real-time blockchain integration",
      type: "box",
      image: "/images/discord-bot.webp",
    },
    {
      id: "work2",
      title: "AI Study Assistant",
      description: "AI-powered student productivity app using GPT and Gemini for smart focus and study optimization",
      type: "sphere",
      image: "/images/ai-study.png",
    },
    {
      id: "work3",
      title: "E-sports",
      description: "Experienced e-sports athelete in BGMI",
      type: "torus",
      image: "/images/esports.jpg" ,
    },
    {
      id: "work4",
      title: "3D Web Experiences",
      description: "Custom immersive websites built with Three.js and React for memorable digital experiences",
      type: "octahedron",
      image: "/images/3d-web.png",
    },
  ]

  return (
    <section id="works" className="relative w-full min-h-screen bg-black flex items-center">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <ScrollCameraController />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <WorkItem3D position={[-3, 1, 0]} title="Discord" isHovered={hoveredWork === "work1"} type="box" />
            <WorkItem3D position={[3, 1, 0]} title="AI Study" isHovered={hoveredWork === "work2"} type="sphere" />
            <WorkItem3D position={[-3, -1, 0]} title="Voice AI" isHovered={hoveredWork === "work3"} type="torus" />
            <WorkItem3D position={[3, -1, 0]} title="3D Web" isHovered={hoveredWork === "work4"} type="octahedron" />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-thin text-white mb-12 text-center">Selected Works</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {works.map((work, index) => (
            <div
              key={work.id}
              className="cursor-hover group p-8 border border-gray-800 hover:border-red-400 transition-all duration-300 bg-black/50 backdrop-blur-sm"
              data-cursor-type="work"
              onMouseEnter={() => setHoveredWork(work.id)}
              onMouseLeave={() => setHoveredWork(null)}
            >
              <div className="h-48 mb-6 relative overflow-hidden rounded-lg">
                <Image
                  src={work.image || "/placeholder.svg"}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 text-white/60 group-hover:text-white transition-colors duration-300 font-bold text-lg">
                  0{index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                {work.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                <motion.p
                  className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 cursor-pointer"
                  whileHover={{ scale: 1.07 }}
                >
                  {work.description}
                </motion.p>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
