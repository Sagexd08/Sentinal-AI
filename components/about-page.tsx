"use client"

import { motion } from "framer-motion"
import ThreeScene from "@/components/3d/three-scene"
import Footer from "@/components/sections/footer"
import { ArrowRight, Users, Shield, Lightbulb, Scale, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const values = [
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: "Community",
      description: "We believe in the power of communities to create better online spaces."
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-400" />,
      title: "Protection",
      description: "We're committed to protecting users from harmful content and experiences."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-400" />,
      title: "Innovation",
      description: "We continuously innovate to stay ahead of evolving content challenges."
    },
    {
      icon: <Scale className="h-8 w-8 text-red-400" />,
      title: "Fairness",
      description: "We strive for fair and balanced moderation decisions across all content."
    },
    {
      icon: <Lock className="h-8 w-8 text-green-400" />,
      title: "Privacy",
      description: "We respect user privacy and build systems that protect personal data."
    }
  ]

  return (
    <main className="relative min-h-screen bg-black">
      {/* Replace the old Canvas with ThreeScene */}
      <ThreeScene className="fixed inset-0 z-0" />

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Our Mission
            </h1>
            <p className="text-xl text-gray-300">
              We're building the future of content moderation by combining cutting-edge AI with the transparency and
              accountability of Web3 technologies.
            </p>
          </motion.div>

          <div className="space-y-24">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 text-gray-300">
                  <p>
                    SentinelAI was founded in 2023 by a team of AI researchers, blockchain developers, and content policy
                    experts who recognized that traditional approaches to content moderation were failing to keep pace with
                    the scale and complexity of harmful content online, while centralized decision-making created issues of
                    transparency and trust.
                  </p>
                  <p>
                    We set out to build a solution that leverages cutting-edge AI for detection while using blockchain
                    technology to ensure transparency and community governance. Our goal was to create a system that could scale
                    to meet the demands of modern platforms while maintaining the highest standards of fairness and
                    accountability.
                  </p>
                </div>
                <div className="relative h-64 md:h-auto rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Our Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-purple-500/30 transition-all"
                  >
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Our Team</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Our team brings together expertise from diverse fields including artificial intelligence, blockchain
                  development, content policy, and community management. We're united by our passion for creating a safer
                  internet and our belief in the power of technology to solve complex social challenges.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-4 bg-white/5 p-4 rounded-xl">
                    <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">TM</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Team Member {i}</h3>
                      <p className="text-gray-400 text-sm">Co-Founder & {i % 2 === 0 ? "CTO" : "CEO"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Join Our Mission</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We're always looking for talented individuals who share our vision for a safer, more transparent internet.
                  Whether you're an AI researcher, blockchain developer, content policy expert, or community builder, we'd
                  love to hear from you.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/contact">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all">
                    <span>Get in Touch</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
