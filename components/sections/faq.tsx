"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "How does the AI moderation system work?",
      answer:
        "Our AI moderation system uses advanced machine learning algorithms to analyze content across text, images, and video. It identifies potentially harmful content based on trained patterns and community guidelines. The system continuously improves through feedback loops and new data.",
    },
    {
      question: "What makes this different from traditional moderation tools?",
      answer:
        "Unlike traditional moderation tools, our system combines AI detection with blockchain transparency and community governance. This creates a more accountable, fair, and effective moderation process that adapts to emerging challenges while maintaining trust through complete transparency.",
    },
    {
      question: "How is the blockchain used in the moderation process?",
      answer:
        "The blockchain serves as an immutable ledger for moderation decisions, creating a transparent audit trail. Smart contracts govern the rules of moderation, and a decentralized autonomous organization (DAO) allows community members to participate in governance decisions.",
    },
    {
      question: "Can I integrate this with my existing platform?",
      answer:
        "Yes, we offer multiple integration options including APIs, SDKs, browser extensions, and mobile applications. Our system is designed to work alongside existing platforms with minimal disruption to your current workflows.",
    },
    {
      question: "How do you handle privacy concerns?",
      answer:
        "We use zero-knowledge proofs and other privacy-preserving technologies to verify content without exposing sensitive user data. Our system is designed to be compliant with major privacy regulations including GDPR and CCPA.",
    },
    {
      question: "How can I contribute to the project?",
      answer:
        "As an open-source project, we welcome contributions from developers, designers, and community moderators. You can contribute code through our GitHub repository, participate in governance through our DAO, or help improve our AI models by providing feedback and training data.",
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
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Find answers to common questions about our moderation system.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="group relative border border-gray-700/50 hover:border-purple-500/50 rounded-xl overflow-hidden backdrop-blur-md bg-black/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <AccordionTrigger 
                    className="relative px-6 py-4 hover:bg-purple-900/20 text-white text-left transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="relative px-6 py-4 text-gray-300 bg-black/20 group-hover:text-gray-200 transition-colors duration-300">
                    <div className="relative z-10 leading-relaxed">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
