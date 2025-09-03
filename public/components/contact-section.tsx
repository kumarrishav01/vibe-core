"use client"

import React, { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense } from "react"
import { Sphere, Float } from "@react-three/drei"
import ScrollCameraController from "./scroll-camera-controller"
import emailjs from "@emailjs/browser"

function ContactSphere() {
  const sphereRef = useRef<any>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.material.emissiveIntensity = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={sphereRef} args={[1, 32, 32]}>
        <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.2} wireframe />
      </Sphere>
    </Float>
  )
}

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    try {
      await emailjs.sendForm(
        "service_ovhi2xj",       // service ID
        "template_xh0fmz7",     // template ID
        formRef.current!,
        "qAwph7-SSVlG3wyp9"     // public key
      )
      console.log("Email successfully sent!")
      alert("Thanks! Your message has been sent. 🚀")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Email sending failed:", error)
      alert("Oops! Something went wrong. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="relative w-full min-h-screen bg-black flex items-center">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-30">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <Suspense fallback={null}>
            <ScrollCameraController />
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} />
            <ContactSphere />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl md:text-6xl font-thin text-white mb-8">
            Let's Build
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Something Amazing
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Ready to turn your crazy idea into reality? Let's collaborate and create something that pushes boundaries
            and feels truly alive. Whether it's AI, web3, 3D, or something completely new — I'm excited to explore it
            with you.
          </p>

          <div className="space-y-4 text-gray-400">
            <div className="cursor-hover flex items-center space-x-4" data-cursor-type="contact">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span>rishofficial@vibecore.in</span>
            </div>
            <div className="cursor-hover flex items-center space-x-4" data-cursor-type="contact">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              <span>Discord: @tmharimummykapati</span>
            </div>
            <div className="cursor-hover flex items-center space-x-4" data-cursor-type="contact">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Available for freelance & collaborations</span>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className={`cursor-hover w-full p-4 bg-transparent border-b-2 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                focusedField === "name" ? "border-red-400" : "border-gray-700"
              }`}
              data-cursor-type="contact"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={`cursor-hover w-full p-4 bg-transparent border-b-2 text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                focusedField === "email" ? "border-red-400" : "border-gray-700"
              }`}
              data-cursor-type="contact"
              required
            />
          </div>

          <div className="relative">
            <textarea
              name="message"
              placeholder="Tell me about your crazy idea..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              rows={4}
              className={`cursor-hover w-full p-4 bg-transparent border-b-2 text-white placeholder-gray-500 focus:outline-none resize-none transition-all duration-300 ${
                focusedField === "message" ? "border-red-400" : "border-gray-700"
              }`}
              data-cursor-type="contact"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="cursor-hover w-full p-4 bg-gradient-to-r from-red-400 to-red-600 text-white font-bold hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
            data-cursor-type="contact"
          >
            {isSending ? "SENDING..." : "LET'S COLLABORATE"}
          </button>
        </form>
      </div>
    </section>
  )
}
