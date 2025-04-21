"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LucideCheck } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Community",
      price: "Free",
      description: "For small communities and personal projects",
      features: [
        "Up to 10,000 content items per month",
        "Basic AI moderation",
        "Community dashboard",
        "Email support",
        "Public API access",
      ],
      color: "border-blue-500/20 hover:border-blue-500/50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "For growing communities and businesses",
      features: [
        "Up to 100,000 content items per month",
        "Advanced AI moderation",
        "Custom moderation rules",
        "Priority support",
        "Analytics dashboard",
        "Webhook integrations",
      ],
      color: "border-purple-500/30 hover:border-purple-500/70",
      buttonColor: "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific needs",
      features: [
        "Unlimited content moderation",
        "Custom AI model training",
        "Dedicated account manager",
        "24/7 priority support",
        "Advanced analytics",
        "Custom integrations",
        "SLA guarantees",
      ],
      color: "border-cyan-500/20 hover:border-cyan-500/50",
      buttonColor: "bg-cyan-600 hover:bg-cyan-700",
    },
  ]

  return (
    <div className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-purple-600 bg-clip-text text-transparent"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Choose the plan that fits your community's needs. All plans include core moderation features.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className={`group relative bg-black/30 backdrop-blur-md rounded-xl p-8 border ${plan.color} hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] ${
                plan.popular ? "md:-mt-4 md:mb-4" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  Most Popular
                </div>
              )}

              <div className="relative">
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-gray-400 ml-2">{plan.period}</span>}
                </div>
                <p className="text-gray-400 mb-8 group-hover:text-gray-300 transition-colors duration-300">
                  {plan.description}
                </p>

                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start group/item">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md transform group-hover/item:scale-150 transition-transform duration-300" />
                        <LucideCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5 relative" />
                      </div>
                      <span className="text-gray-300 group-hover/item:text-white transition-colors duration-200">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full relative overflow-hidden ${plan.buttonColor} backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300`} 
                  size="lg"
                >
                  <span className="relative z-10">
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
