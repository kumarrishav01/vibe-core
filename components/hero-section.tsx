"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useRef, useEffect } from "react"
import { Environment } from "@react-three/drei"
import MorphingParticles from "./morphing-particles"
import ScrollCameraController from "./scroll-camera-controller"
import FallingSakura from "./falling-sakura"
import Navigation from "./navigation"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / window.innerHeight))
        document.documentElement.style.setProperty("--scroll-progress", scrollProgress.toString())
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX - 8}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY - 8}px`)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <Navigation />
      <section id="hero" ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black cursor-none">
        {/* Custom Pink Neon Cursor */}
        <div className="fixed top-0 left-0 w-4 h-4 bg-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference shadow-lg shadow-pink-500/50" 
             style={{
               transform: 'translate(var(--mouse-x, -50px), var(--mouse-y, -50px))',
               transition: 'transform 0.1s ease-out'
             }} />
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ScrollCameraController />
          <MorphingParticles />
          <FallingSakura />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, 5]} intensity={0.4} color="#8a4a4a" />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white">
          <h1 className="text-6xl md:text-8xl font-thin mb-6 tracking-wider">
            <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              ARYANIL
            </span>
            <br />
            <span
              className="inline-block animate-fade-in-up text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
              style={{ animationDelay: "0.4s" }}
            >
              DEVELOPER
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl font-light mb-8 opacity-80 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            Turning crazy ideas into real, usable projects
          </p>
          <button
            onClick={scrollToNext}
            className="cursor-hover px-8 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 animate-fade-in-up"
            data-cursor-type="hover"
            style={{ animationDelay: "0.8s" }}
          >
            EXPLORE WORK
          </button>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-hover"
        data-cursor-type="hover"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </button>
      </section>
    </>
  )
}
