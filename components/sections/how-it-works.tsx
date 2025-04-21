"use client"

import { motion } from "framer-motion"
import { LucideArrowRight } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Content Analysis",
      description:
        "Our AI engine scans content in real-time across text, images, and video to identify potentially harmful material.",
      color: "from-cyan-500 to-cyan-700",
    },
    {
      number: "02",
      title: "Classification & Flagging",
      description:
        "Content is classified into categories and flagged based on community guidelines and moderation policies.",
      color: "from-blue-500 to-blue-700",
    },
    {
      number: "03",
      title: "Blockchain Verification",
      description:
        "Moderation decisions are recorded on the blockchain, creating an immutable and transparent audit trail.",
      color: "from-indigo-500 to-indigo-700",
    },
    {
      number: "04",
      title: "Community Review",
      description: "Flagged content can be reviewed by community moderators through a decentralized governance system.",
      color: "from-purple-500 to-purple-700",
    },
    {
      number: "05",
      title: "Continuous Learning",
      description:
        "The system learns from feedback and new data, constantly improving detection accuracy and reducing false positives.",
      color: "from-pink-500 to-pink-700",
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
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Our moderation system follows a comprehensive process to ensure accuracy, transparency, and fairness.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex mb-12 items-start group relative"
            >
              {/* Number circle with enhanced effects */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500" />
                <div
                  className={`relative flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-white/10 group-hover:border-purple-500/50 transition-all duration-300`}
                >
                  {step.number}
                </div>
              </div>

              {/* Content box with enhanced effects */}
              <div className="ml-6 p-6 rounded-lg backdrop-blur-md bg-black/30 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] relative w-full">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Enhanced connection line */}
                  {index < steps.length - 1 && (
                    <div className="flex items-center text-gray-500 ml-4 mt-6">
                      <div className="h-12 border-l-2 border-dashed border-purple-500/30 group-hover:border-purple-500/50 transition-colors duration-300" />
                      <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      >
                        <LucideArrowRight className="h-5 w-5 ml-2 text-purple-500/50 group-hover:text-purple-400" />
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
