"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
}

const SidePanel = ({ isOpen, onClose }: SidePanelProps) => {
  const menuItems = [
    'Client Panel',
    'Feedback',
    'Terms',
    'Discord',
    'Telegram',
    'About'
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-xl border-r border-red-500/30 z-50"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-bold text-red-500">MENU</h2>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              <div className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="p-4 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors"
                  >
                    <span className="text-white font-medium text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SidePanel