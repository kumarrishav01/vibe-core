"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX - 8}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY - 8}px`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const projects = [
    {
      title: "3D Portfolio Website",
      description: "Interactive 3D portfolio that's absolutely fire 🔥 Built with React Three Fiber featuring sick particle systems and buttery smooth animations.",
      tech: ["Next.js", "Three.js", "TypeScript", "Framer Motion"],
      status: "Live",
      emoji: "🌌",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "AI-Powered E-Commerce",
      description: "Next-gen e-commerce platform with AI recommendations, crypto payments, and a dashboard that hits different 💸",
      tech: ["React", "Node.js", "MongoDB", "OpenAI"],
      status: "In Progress",
      emoji: "🛒",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Real-Time AI Chat",
      description: "Chat app that's basically ChatGPT but make it aesthetic ✨ Real-time messaging with AI that actually gets you.",
      tech: ["React", "Socket.io", "OpenAI API", "Express"],
      status: "Completed",
      emoji: "🤖",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Data Viz Dashboard",
      description: "Dashboard so clean it makes Excel cry 📊 Interactive charts, real-time updates, and data that actually looks good.",
      tech: ["React", "D3.js", "Python", "FastAPI"],
      status: "Live",
      emoji: "📈",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Web3 Gaming Platform",
      description: "Gaming platform where you can actually make bank 🎮 NFT integration, crypto rewards, and gameplay that's addictive AF.",
      tech: ["React", "Solidity", "Web3.js", "Ethereum"],
      status: "Coming Soon",
      emoji: "🎮",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Voice Clone Studio",
      description: "AI voice cloning that's so good it's scary 🎤 Create custom voices for content, games, or just to mess with your friends.",
      tech: ["Python", "TensorFlow", "React", "FastAPI"],
      status: "Beta",
      emoji: "🎤",
      gradient: "from-indigo-500 to-purple-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white cursor-none overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-10 right-20 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-500/15 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }} />
      </div>

      {/* Custom Cursor */}
      <div className="fixed top-0 left-0 w-4 h-4 bg-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference shadow-lg shadow-pink-500/50" 
           style={{
             transform: 'translate(var(--mouse-x, -50px), var(--mouse-y, -50px))',
             transition: 'transform 0.1s ease-out'
           }} />
      
      <Navigation />
      
      <div className="pt-32 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-7xl md:text-9xl font-thin mb-6">
              <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                PROJECTS
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Stuff I built that actually slaps 💯
            </p>
          </motion.div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-4xl">{project.emoji}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      project.status === 'Live' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      project.status === 'Completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      project.status === 'Beta' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                    {project.title}
                  </h3>
                  
                  <p className="text-white/70 mb-6 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <motion.span 
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              Want to see more? 😏
            </h2>
            <p className="text-white/60 mb-8 text-lg">
              Check out my GitHub for the full collection of projects that go hard
            </p>
            <motion.a 
              href="https://github.com" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-red-500/25"
            >
              <span>🐙</span>
              <span>View GitHub</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}