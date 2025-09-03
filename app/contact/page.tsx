"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX - 8}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY - 8}px`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const socialLinks = [
    { icon: '📧', label: 'Email', value: 'rishofficial@vibecore.in', gradient: 'from-red-500 to-pink-500' },
    { icon: '💼', label: 'LinkedIn', value: '/in/riiissssshhhhhhh', gradient: 'from-blue-500 to-cyan-500' },
    { icon: '🐙', label: 'GitHub', value: '/kumarrishav01', gradient: 'from-purple-500 to-indigo-500' },
    { icon: '📱', label: 'Discord', value: '@tmharimummykapati', gradient: 'from-indigo-500 to-purple-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 text-white cursor-none overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/15 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }} />
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
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-7xl md:text-9xl font-thin mb-6">
              <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                HIT ME UP
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Got a crazy idea? Let's make it happen 🚀
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                  Let's Build Something Epic 🔥
                </h2>
                <p className="text-lg text-white/80 leading-relaxed mb-8">
                  I'm always down to work on projects that push boundaries and break the internet. 
                  Whether it's AI, Web3, 3D experiences, or something completely wild — let's make it happen! ✨
                </p>
                
                <div className="space-y-4">
                  {socialLinks.map((link, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${link.gradient} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
                        {link.icon}
                      </div>
                      <div>
                        <p className="text-white/60 text-sm font-medium">{link.label}</p>
                        <p className="text-white font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${link.gradient} transition-all duration-300">
                          {link.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-4 text-white">
                  💫 Currently Available For:
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Freelance Projects</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Full-time Opportunities</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Creative Collaborations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                    <span>Startup Adventures</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
                  Drop Me a Line 💬
                </h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-white/80 mb-3 font-medium">What's your name? 😎</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-white/5 border-2 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:outline-none transition-all duration-300 ${
                        focusedField === 'name' ? 'border-red-500 bg-white/10' : 'border-white/20'
                      }`}
                      placeholder="Your awesome name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-3 font-medium">How can I reach you? 📧</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-white/5 border-2 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:outline-none transition-all duration-300 ${
                        focusedField === 'email' ? 'border-red-500 bg-white/10' : 'border-white/20'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 mb-3 font-medium">What's the tea? ☕</label>
                    <textarea 
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-white/5 border-2 rounded-2xl px-6 py-4 text-white placeholder-white/40 focus:outline-none resize-none transition-all duration-300 ${
                        focusedField === 'message' ? 'border-red-500 bg-white/10' : 'border-white/20'
                      }`}
                      placeholder="Tell me about your crazy idea, project, or just say hi! I'm always down to chat about tech, anime, or whatever's on your mind 😊"
                    />
                  </div>
                  
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-red-500/25"
                  >
                    Send It! 🚀
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}