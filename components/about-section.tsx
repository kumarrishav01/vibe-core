"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
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
  const controls = useAnimation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible")
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [controls])

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
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 60, scale: 0.95, rotate: -5 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                bounce: 0.5,
                duration: 1.2,
                staggerChildren: 0.18,
              },
            },
          }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-thin text-white mb-8"
            variants={{ hidden: { opacity: 0, y: 40, scale: 0.8 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 1 } } }}
          >
            About
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 leading-relaxed mb-6 cursor-pointer"
            variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { type: "spring", duration: 1 } } }}
            whileHover={{ scale: 1.07 }}
          >
            Hey! I'm Rish — a curious learner and determined JEE aspirant who thrives on solving tough problems and pushing myself beyond limits. Over the past few years, I’ve dedicated myself to building strong foundations in physics, chemistry, and mathematics, while also exploring the joy of connecting concepts across subjects.
          </motion.p>
          <motion.p
            className="text-lg text-gray-400 leading-relaxed mb-6 cursor-pointer"
            variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { type: "spring", duration: 1 } } }}
            whileHover={{ scale: 1.07 }}
          >
            I love tackling challenging questions, breaking them into smaller ideas, and finding creative approaches that make learning more exciting. Whether it’s experimenting with problem-solving strategies, optimizing study techniques, or mentoring peers with doubts, I treat preparation as both a journey of discipline and discovery.
          </motion.p>
          <motion.p
            className="text-lg text-gray-400 leading-relaxed cursor-pointer"
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", duration: 1 } } }}
            whileHover={{ scale: 1.07 }}
          >
            Beyond academics, I’m fascinated by how logic, design, and imagination intersect. I enjoy exploring technology, creative thinking, and storytelling that inspires motivation during long study hours. Right now, my focus is mastering JEE concepts while building a mindset that blends hard work, consistency, and curiosity for lifelong learning.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 60, scale: 0.95, rotate: 5 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                bounce: 0.5,
                duration: 1.2,
                delayChildren: 0.3,
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <div className="space-y-6">
            {[
              { skill: "Physics", level: 95 },
              { skill: "Chemistry", level: 92 },
              { skill: "Mathematics", level: 88 },
              { skill: "AI & Machine Learning", level: 98 },
              { skill: "Creative Coding", level: 90 },
            ].map((item, index) => (
              <motion.div
                key={item.skill}
                className="cursor-hover"
                data-cursor-type="hover"
                initial="hidden"
                animate={controls}
                variants={{ hidden: { opacity: 0, x: 40, scale: 0.8 }, visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", duration: 0.8 + index * 0.1 } } }}
              >
                <div className="flex justify-between text-white mb-2">
                  <span className="font-medium">{item.skill}</span>
                  <span className="text-gray-400">{item.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className="bg-gradient-to-r from-red-400 to-red-600 h-1 rounded-full"
                    initial={{ width: "0%" }}
                    animate={controls}
                    variants={{
                      hidden: { width: "0%" },
                      visible: { width: `${item.level}%`, transition: { duration: 1, delay: 0.5 + index * 0.1 } },
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
