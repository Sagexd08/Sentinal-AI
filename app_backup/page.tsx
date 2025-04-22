"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Environment } from "@react-three/drei"
import { LucideChevronDown } from "lucide-react"
import { ACESFilmicToneMapping, Color } from "three"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

import Navbar from "@/components/navbar"
import LoadingScreen from "@/components/loading-screen"
import { Button } from "@/components/ui/button"
import Hero from "@/components/sections/hero"
import Features from "@/components/sections/features"
import HowItWorks from "@/components/sections/how-it-works"
import Testimonials from "@/components/sections/testimonials"
import Pricing from "@/components/sections/pricing"
import FAQ from "@/components/sections/faq"
import Footer from "@/components/sections/footer"
import SimpleGlobe from "@/components/3d/simple-globe"
import ThreeScene from "@/components/3d/three-scene"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState(0)
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const testimonialsRef = useRef(null)
  const pricingRef = useRef(null)
  const faqRef = useRef(null)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      const sections = [
        { ref: heroRef, id: 0 },
        { ref: featuresRef, id: 1 },
        { ref: howItWorksRef, id: 2 },
        { ref: testimonialsRef, id: 3 },
        { ref: pricingRef, id: 4 },
        { ref: faqRef, id: 5 },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sections = [
    { id: "hero", title: "Home", path: "/" },
    { id: "features", title: "Features", path: "/features" },
    { id: "how-it-works", title: "How It Works", path: "/how-it-works" },
    { id: "testimonials", title: "Testimonials", path: "/testimonials" },
    { id: "pricing", title: "Pricing", path: "/pricing" },
    { id: "faq", title: "FAQ", path: "/faq" },
  ]

  const scrollToSection = (index) => {
    const sectionRefs = [heroRef, featuresRef, howItWorksRef, testimonialsRef, pricingRef, faqRef]
    const section = sections[index]
    if (pathname === "/" && sectionRefs[index].current) {
      // Scroll behavior for home page
      const offset = sectionRefs[index].current.offsetTop
      const headerOffset = 80
      const elementPosition = offset - headerOffset
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    } else {
      // Navigate to section page
      router.push(section.path)
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <ThreeScene />
      </div>
      <div className="relative z-10">
        <Navbar activeSection={activeSection} sections={sections} onNavigate={scrollToSection} />
        <div ref={heroRef} className="relative min-h-screen">
          <div className="relative">
            <Hero />
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent border border-purple-500 rounded-full w-12 h-12 text-purple-500 hover:bg-purple-900/20"
              onClick={() => scrollToSection(1)}
            >
              <LucideChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div ref={featuresRef}>
          <Features />
        </div>

        <div ref={howItWorksRef}>
          <HowItWorks />
        </div>

        <div ref={testimonialsRef}>
          <Testimonials />
        </div>

        <div ref={pricingRef}>
          <Pricing />
        </div>

        <div ref={faqRef}>
          <FAQ />
        </div>

        <Footer />
      </div>
    </main>
  )
}
