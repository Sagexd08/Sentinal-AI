"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { LucideChevronLeft, LucideChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      quote:
        "This moderation system has transformed how we handle content on our platform. The AI detection is incredibly accurate, and the transparency provided by the blockchain integration has built trust with our community.",
      author: "Sarah Johnson",
      role: "Community Manager at TechTalk",
      avatar: "https://res.cloudinary.com/djojshvyd/image/upload/v1740825773/WhatsApp_Image_2025-03-01_at_16.07.53_1_wcjb3f.jpg?height=80&width=80",
    },
    {
      quote:
        "As a developer, I appreciate the open-source nature of this project. I've been able to contribute to the codebase and see firsthand how the community governance model ensures fair and balanced moderation decisions.",
      author: "Michael Chen",
      role: "Senior Developer at CodeShare",
      avatar: "https://res.cloudinary.com/djojshvyd/image/upload/v1740825772/WhatsApp_Image_2025-03-01_at_16.07.52_1_ho71qd.jpg?height=80&width=80",
    },
    {
      quote:
        "The real-time detection capabilities have reduced our moderation workload by 75%. Our team can now focus on edge cases and community building rather than sifting through flagged content manually.",
      author: "Priya Patel",
      role: "Head of Trust & Safety at SocialConnect",
      avatar: "https://res.cloudinary.com/ddavgtvp2/image/upload/v1741501188/m7dlqm8rqtjes5bgrewc.jpg?height=80&width=80",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

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
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Hear from the communities and developers using our moderation system.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              initial={false}
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative backdrop-blur-md bg-black/30 rounded-xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    
                    <div className="relative">
                      <div className="flex items-center mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-cyan-500/50 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-500" />
                          <div className="relative p-1 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500">
                            <img
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.author}
                              className="w-16 h-16 rounded-full border-2 border-black/20 backdrop-blur-sm"
                            />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                            {testimonial.author}
                          </h4>
                          <p className="text-gray-400 group-hover:text-gray-300">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-lg text-gray-300 italic leading-relaxed group-hover:text-white transition-colors duration-300">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-gray-700/50 bg-black/20 backdrop-blur-md text-gray-300 hover:bg-purple-900/20 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              <LucideChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                      : "bg-gray-700/50 hover:bg-gray-600/50"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-gray-700/50 bg-black/20 backdrop-blur-md text-gray-300 hover:bg-purple-900/20 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              <LucideChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
