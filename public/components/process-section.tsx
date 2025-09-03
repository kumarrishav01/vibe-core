import { motion } from "framer-motion"
"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useRef, useState, useEffect, useMemo } from "react"
import { Sphere, Line, Box, Torus } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import ScrollCameraController from "./scroll-camera-controller"

function ProcessVisualization() {
  const groupRef = useRef<any>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  const linePoints = useMemo(
    () =>
      [
        [-3, 2, 0],
        [0, 2, 0],
        [3, 2, 0],
        [3, -2, 0],
        [0, -2, 0],
        [-3, -2, 0],
      ] as [number, number, number][],
    [],
  )

  return (
    <group ref={groupRef}>
      <Line points={linePoints} color="#00ffaa" lineWidth={2} />
      {linePoints.map(([x, y, z], index) => (
        <group key={index} position={[x, y, z]}>
          <Sphere args={[0.1]}>
            <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={0.2} />
          </Sphere>
          {index % 2 === 0 && (
            <Box position={[0, 0, -0.5]} args={[0.2, 0.2, 0.2]}>
              <meshStandardMaterial color="#ff0088" wireframe />
            </Box>
          )}
          {index % 3 === 0 && (
            <Torus position={[0, 0, 0.5]} args={[0.15, 0.05, 8, 16]}>
              <meshStandardMaterial color="#0088ff" />
            </Torus>
          )}
        </group>
      ))}
    </group>
  )
}

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const steps = [
    { title: "Ideate", description: "Turning crazy ideas into viable concepts" },
    { title: "Prototype", description: "Rapid experimentation with cutting-edge tech" },
    { title: "Build", description: "Full-stack development with modern frameworks" },
    { title: "Launch", description: "Deploying memorable digital experiences" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center"
    >
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <Suspense fallback={null}>
            <ScrollCameraController />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <ProcessVisualization />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-thin text-white mb-16 text-center">My Process</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`cursor-hover text-center p-6 transition-all duration-500 ${
                activeStep === index ? "text-white scale-105" : "text-gray-500 scale-100"
              }`}
              data-cursor-type="hover"
            >
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all duration-500 ${
                  activeStep === index
                    ? "border-cyan-400 bg-cyan-400/20 text-cyan-400"
                    : "border-gray-600 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <motion.p
                className="text-sm leading-relaxed cursor-pointer"
                whileHover={{ scale: 1.07 }}
              >
                {step.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
