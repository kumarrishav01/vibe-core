"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX - 8}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY - 8}px`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white cursor-none overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-400/15 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      {/* Custom Cursor */}
      <div className="fixed top-0 left-0 w-4 h-4 bg-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference shadow-lg shadow-pink-500/50" 
           style={{
             transform: 'translate(var(--mouse-x, -50px), var(--mouse-y, -50px))',
             transition: 'transform 0.1s ease-out'
           }} />
      
      <Navigation />
      
      <div className="pt-32 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Title */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-7xl md:text-9xl font-thin mb-6">
              <span className="bg-gradient-to-r from-red-400 via-pink-500 to-red-600 bg-clip-text text-transparent">
                ABOUT
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Turning crazy ideas into digital reality ✨
            </p>
          </motion.div>
          
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                  Who I Am 🚀
                </h2>
                <p className="text-lg text-white/80 leading-relaxed mb-4">
                  Yo! I'm Aryanil — a Gen Z developer who's obsessed with turning wild ideas into mind-blowing digital experiences. 
                  I live and breathe cutting-edge tech, from AI to Web3 to 3D graphics.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  My vibe? Creating stuff that doesn't just work, but makes people go "DAMN, that's sick!" 🔥
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-500">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
                  What I Do 💫
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '🌐', text: 'Full-Stack Dev' },
                    { icon: '🎮', text: '3D & WebGL' },
                    { icon: '🤖', text: 'AI Integration' },
                    { icon: '✨', text: 'Creative Coding' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-white/90 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                  Skills That Hit Different 💯
                </h2>
                {[
                  { skill: "Physics", level: 95, emoji: "⚛️" },
                  { skill: "Chemistry", level: 92, emoji: "🎨" },
                  { skill: "Mathematics", level: 88, emoji: "🤖" },
                  { skill: "AI & Machine Learning", level: 85, emoji: "⛓️" },
                  { skill: "Creative Coding", level: 98, emoji: "✨" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.skill} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="mb-6 group"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="font-semibold text-white">{item.skill}</span>
                      </div>
                      <span className="text-red-400 font-bold">{item.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.level}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-500/50"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Tech Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              Tech Stack That Slaps 🔥
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { name: 'React', emoji: '⚛️' },
                { name: 'Next.js', emoji: '▲' },
                { name: 'Three.js', emoji: '🎮' },
                { name: 'TypeScript', emoji: '📘' },
                { name: 'Node.js', emoji: '🟢' },
                { name: 'Python', emoji: '🐍' },
                { name: 'WebGL', emoji: '🎨' },
                { name: 'Framer', emoji: '✨' }
              ].map((tech, i) => (
                <motion.div 
                  key={tech.name}
                  whileHover={{ scale: 1.1, rotateY: 180 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:border-red-500/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-3xl mb-2">{tech.emoji}</div>
                  <div className="text-sm font-medium text-white/90">{tech.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}