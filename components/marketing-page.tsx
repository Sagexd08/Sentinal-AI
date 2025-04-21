"use client"

import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Environment } from "@react-three/drei"
import { LucideChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import Hero from "@/components/sections/hero"
import Features from "@/components/sections/features"
import HowItWorks from "@/components/sections/how-it-works"
import Testimonials from "@/components/sections/testimonials"
import Pricing from "@/components/sections/pricing"
import FAQ from "@/components/sections/faq"
import SimpleGlobe from "@/components/3d/simple-globe"

export default function MarketingPage() {
  const featuresRef = useRef(null)
  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Suspense
            fallback={
              <div className="w-full h-full bg-black flex items-center justify-center text-white">
                Loading 3D experience...
              </div>
            }
          >
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <SimpleGlobe />
              <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
              <Environment preset="night" />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </Suspense>
        </div>

        <Hero />

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            className="bg-transparent border border-purple-500 rounded-full w-12 h-12 text-purple-500 hover:bg-purple-900/20"
            onClick={scrollToFeatures}
          >
            <LucideChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div ref={featuresRef} className="relative z-10">
        <Features />
      </div>

      <div className="relative z-10">
        <HowItWorks />
      </div>

      <div className="relative z-10">
        <Testimonials />
      </div>

      <div className="relative z-10">
        <Pricing />
      </div>

      <div className="relative z-10">
        <FAQ />
      </div>
    </div>
  )
}
