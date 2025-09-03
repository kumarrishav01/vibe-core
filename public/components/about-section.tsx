"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useRef, useEffect, useState } from "react"
import { Text, Float, Environment, Box } from "@react-three/drei"
import ScrollCameraController from "./scroll-camera-controller"

function FloatingElements() {
  return (
    <group>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Text font="/fonts/Geist-Bold.ttf" fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
          CREATIVE
        </Text>
      </Float>

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Box position={[3, 1, -2]} args={[0.5, 0.5, 0.5]}>
          <meshStandardMaterial color="#ff4444" wireframe transparent opacity={0.4} />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.4}>
        <Box position={[-3, -1, -1]} args={[0.3, 0.3, 0.3]}>
          <meshStandardMaterial color="#ff2222" transparent opacity={0.5} />
        </Box>
      </Float>
    </group>
  )
}

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center"
    >
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ScrollCameraController />
            <FloatingElements />
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.4} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <h2 className="text-5xl md:text-6xl font-thin text-white mb-8">About</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Hey! I'm Rish — a passionate developer and creative technologist who loves turning crazy ideas into real,
            usable projects. Over the past few years, I've built and launched a wide range of products, from advanced
            Discord bots to AI-powered student productivity apps.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed mb-6">
            I've explored voice cloning tech, created anime-inspired generative tools, experimented with custom 3D
            websites, and even built tools that integrate real-time blockchain price mechanics into games and bots.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            Beyond code, I'm fascinated by storytelling and how tech can evoke emotion, whether through interactive UI
            animations or anime-inspired visual experiments. Right now, I'm focused on combining web3, AI, and 3D design
            to create futuristic, high-impact digital experiences that feel alive and memorable.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          <div className="space-y-6">
            {[
              { skill: "Three.js & WebGL", level: 95 },
              { skill: "React & Next.js", level: 92 },
              { skill: "AI & Machine Learning", level: 88 },
              { skill: "Web3 & Blockchain", level: 85 },
              { skill: "Discord Bot Development", level: 98 },
              { skill: "Creative Coding", level: 90 },
            ].map((item, index) => (
              <div key={item.skill} className="cursor-hover" data-cursor-type="hover">
                <div className="flex justify-between text-white mb-2">
                  <span className="font-medium">{item.skill}</span>
                  <span className="text-gray-400">{item.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div
                    className="bg-gradient-to-r from-red-400 to-red-600 h-1 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${item.level}%` : "0%",
                      transitionDelay: `${index * 0.1 + 0.5}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
