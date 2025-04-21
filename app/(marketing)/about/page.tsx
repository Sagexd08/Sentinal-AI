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

  const valueCards = [
    {
      icon: <Shield className="h-8 w-8 text-cyan-400" />,
      title: "Transparency",
      description: "We believe in complete openness about how moderation decisions are made and executed."
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-400" />,
      title: "Community Governance",
      description: "We empower communities to set their own standards and participate in moderation decisions."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-purple-400" />,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible with AI and blockchain technology."
    },
    {
      icon: <Scale className="h-8 w-8 text-blue-400" />,
      title: "Fairness",
      description: "We strive to create systems that are equitable and free from bias."
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

      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container mx-auto px-4 pt-24 pb-1 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to create a safer internet through the power of AI and Web3 technologies.
          </p>
        </motion.section>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-7 backdrop-blur-2xl bg-black/30 p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl"
            >
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Next-Gen Moderation was founded in 2022 by a team of AI researchers, blockchain developers, and content
                    moderation experts who recognized the growing challenges of online harm. Traditional moderation approaches
                    were failing to keep pace with the scale and complexity of harmful content online, while centralized
                    decision-making created issues of transparency and trust.
                  </p>
                  <p>
                    We set out to build a solution that leverages cutting-edge AI for detection while using blockchain
                    technology to ensure transparency and community governance. Our goal was to create a system that could scale
                    to meet the demands of modern platforms while maintaining the highest standards of fairness and
                    accountability.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We believe that everyone deserves access to online spaces free from harassment, hate speech, and harmful
                    content. Our mission is to empower communities to create safer digital environments through transparent,
                    effective, and fair content moderation.
                  </p>
                  <p>
                    By combining advanced AI with decentralized governance, we're building tools that can adapt to the unique needs of different communities while maintaining consistent standards of safety and respect.
                  </p>
                </div>
              </section>

              <section>
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
                        <p className="text-gray-400 text-sm">
                          {i % 2 === 0 ? "AI Research Lead" : "Blockchain Developer"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              {/* Values Section */}
              <div className="backdrop-blur-2xl bg-black/30 p-8 rounded-2xl border border-white/10 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-white">Our Values</h2>
                <div className="space-y-6">
                  {valueCards.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="bg-gradient-to-br from-white/5 to-white/10 p-6 rounded-xl border border-white/5"
                    >
                      <div className="flex items-start">
                        <div className="mr-4">{value.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                          <p className="text-gray-300">{value.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Join Us Section */}
              <div className="backdrop-blur-2xl bg-black/30 p-8 rounded-2xl border border-white/10 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-white">Join Us</h2>
                <p className="text-gray-300 mb-6">
                  We're always looking for talented individuals who share our vision. Whether you're a developer, researcher,
                  community manager, or just passionate about online safety, we'd love to hear from you.
                </p>
                <Link href="/careers" className="inline-flex items-center group">
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-full px-6 py-3 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/25 flex items-center">
                    View Open Positions
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        
      </div>
    </main>
  )
}