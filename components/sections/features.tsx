"use client"

import { motion } from "framer-motion"
import { LucideShieldCheck, LucideUsers, LucideBarChart, LucideGlobe, LucideLock, LucideCode } from "lucide-react"
import { useRef, useEffect } from "react"

export default function Features() {
  const features = [
    {
      icon: <LucideShieldCheck className="h-10 w-10 text-cyan-400" />,
      title: "Real-Time AI Detection",
      description:
        "Advanced algorithms detect harmful content across text, images, and video in real-time with high accuracy.",
    },
    {
      icon: <LucideUsers className="h-10 w-10 text-purple-400" />,
      title: "Community Governance",
      description:
        "Decentralized decision-making through a DAO where stakeholders vote on policies and moderation guidelines.",
    },
    {
      icon: <LucideBarChart className="h-10 w-10 text-blue-400" />,
      title: "Transparent Reporting",
      description:
        "All moderation decisions are recorded on the blockchain, ensuring complete transparency and accountability.",
    },
    {
      icon: <LucideGlobe className="h-10 w-10 text-cyan-400" />,
      title: "Cross-Platform Integration",
      description:
        "Seamlessly integrates with existing platforms through browser extensions, APIs, and mobile applications.",
    },
    {
      icon: <LucideLock className="h-10 w-10 text-purple-400" />,
      title: "Privacy-Preserving",
      description:
        "Uses zero-knowledge proofs to verify content without exposing sensitive user data or private information.",
    },
    {
      icon: <LucideCode className="h-10 w-10 text-blue-400" />,
      title: "Open Source",
      description:
        "Fully open-source codebase allowing for community contributions, audits, and continuous improvement.",
    },
  ]

  return (
    <div className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-purple-600 bg-clip-text text-transparent"
          >
            Key Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Our platform combines cutting-edge AI with decentralized Web3 technologies to create a comprehensive
            moderation ecosystem.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.03,
                y: -8,
                transition: { duration: 0.2 }
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="group relative bg-black/30 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Sparkle effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:duration-200" />

              <div className="relative">
                <div className="mb-6 relative">
                  {/* Enhanced icon container */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500" />
                  <div className="relative bg-black/50 w-16 h-16 rounded-full flex items-center justify-center border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Enhanced text content */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
