"use client"

import { useState, useEffect } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center max-w-md w-full px-8">
        <div className="text-4xl md:text-6xl font-thin text-white mb-8 animate-pulse">Loading</div>

        <div className="w-full max-w-xs mx-auto h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="text-gray-400 text-sm">{Math.round(Math.min(progress, 100))}%</div>
      </div>
    </div>
  )
}
