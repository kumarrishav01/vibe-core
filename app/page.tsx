"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import WorksSection from "@/components/works-section"
import ProcessSection from "@/components/process-section"
import ContactSection from "@/components/contact-section"
import CustomCursor from "@/components/custom-cursor"
import LoadingScreen from "@/components/loading-screen"

export default function Portfolio() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited')
    if (hasVisited) {
      setShowLoading(false)
    } else {
      sessionStorage.setItem('hasVisited', 'true')
      setTimeout(() => setShowLoading(false), 3000)
    }
  }, [])

  return (
    <div className="relative w-full bg-black">
      <CustomCursor />
      {showLoading && <LoadingScreen />}

      <main className="w-full">
        <HeroSection />
        <AboutSection />
        <WorksSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </div>
  )
}
