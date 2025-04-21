"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Hero() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Return null on server-side to prevent hydration mismatch
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 min-h-screen flex flex-col justify-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        SentinelAI
        </h1>
        <h2 className="text-xl md:text-3xl text-gray-300 mb-8">AI + Web3 for a Safer Internet</h2>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          An intelligent, transparent, and community-driven system to combat online harm at scale. Powered by real-time
          AI detection and decentralized governance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 rounded-full font-medium shadow-lg shadow-purple-900/30 text-lg"
          >
            Get Started
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-purple-500 text-purple-400 hover:bg-purple-900/20 px-8 py-6 rounded-full font-medium text-lg"
          >
            Watch Demo
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 flex justify-center gap-8 flex-wrap"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm px-6 py-3 rounded-full">
          <span className="text-gray-400">Trusted by</span>
          <span className="ml-2 text-white font-medium">350+ Communities</span>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm px-6 py-3 rounded-full">
          <span className="text-gray-400">Processing</span>
          <span className="ml-2 text-white font-medium">10M+ Content Items Daily</span>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-sm px-6 py-3 rounded-full">
          <span className="text-gray-400">Backed by</span>
          <span className="ml-2 text-white font-medium">1,200+ Developers</span>
        </div>
      </motion.div>
    </div>
  )
}
