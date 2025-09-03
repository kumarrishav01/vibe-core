"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import SidePanel from './side-panel'

const Navigation = () => {
  const pathname = usePathname()
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-red-500/20"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Sidebar Toggle */}
            <motion.button
              onClick={() => setIsSidePanelOpen(true)}
              className="p-2 hover:bg-red-500/10 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={24} className="text-red-500" />
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', damping: 15 }}
            >
              <Link href="/" className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                  VIBE 
                </span>
              </Link>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index + 0.4 }}
                >
                  <Link
                    href={item.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      pathname === item.path 
                        ? 'text-red-500' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {pathname === item.path && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400"
                        layoutId="activeNavItem"
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Contact Button */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link 
                href="/contact" 
                className="px-6 py-2 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-black transition-all duration-300"
              >
                Hire Me
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isPanelOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 border-t border-red-500/20"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsPanelOpen(false)}
                  className={`block py-2 text-sm font-medium transition-all duration-300 ${
                    pathname === item.path 
                      ? 'text-red-500' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
      
      <SidePanel isOpen={isSidePanelOpen} onClose={() => setIsSidePanelOpen(false)} />
    </>
  )
}

export default Navigation