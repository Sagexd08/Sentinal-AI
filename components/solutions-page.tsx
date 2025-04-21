"use client"

import Link from "next/link"
import ThreeScene from "@/components/3d/three-scene"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/sections/footer"

export default function SolutionsPage() {
  const solutions = [
    {
      title: "AI Content Detection",
      description: "Real-time detection of harmful content across text, images, and video with high accuracy.",
      features: [
        "Multi-modal content analysis",
        "Real-time processing",
        "Low false positive rate",
        "Continuous learning system",
      ],
      cta: "Learn More",
      href: "#ai-detection",
    },
    {
      title: "Blockchain Transparency",
      description: "Immutable record of moderation decisions ensuring complete accountability and trust.",
      features: [
        "Transparent audit trail",
        "Immutable record keeping",
        "Public verification",
        "Smart contract governance",
      ],
      cta: "Explore Technology",
      href: "#blockchain",
    },
    {
      title: "Community Governance",
      description: "Decentralized decision-making that puts moderation power in the hands of your community.",
      features: [
        "Democratic policy creation",
        "Stakeholder voting",
        "Reputation systems",
        "Incentive mechanisms",
      ],
      cta: "See How It Works",
      href: "#governance",
    },
    {
      title: "Enterprise Integration",
      description: "Seamless integration with your existing platform and workflows through our flexible API.",
      features: [
        "RESTful API",
        "SDKs for major languages",
        "Custom webhooks",
        "Workflow automation",
      ],
      cta: "View Documentation",
      href: "#integration",
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive insights into content trends, moderation actions, and system performance.",
      features: [
        "Real-time metrics",
        "Custom reports",
        "Trend analysis",
        "Performance optimization",
      ],
      cta: "See Demo",
      href: "#analytics",
    },
    {
      title: "Training & Support",
      description: "Expert guidance and support to help you get the most out of our platform.",
      features: [
        "Dedicated success manager",
        "24/7 technical support",
        "Custom training sessions",
        "Best practice guidance",
      ],
      cta: "Contact Us",
      href: "/contact",
    },
  ]

  const industries = [
    {
      name: "Social Media",
      description: "Protect your users from harmful content while maintaining engagement and authentic expression.",
      icon: "🌐",
    },
    {
      name: "Gaming",
      description: "Create safe, inclusive gaming environments that foster positive community interactions.",
      icon: "🎮",
    },
    {
      name: "E-commerce",
      description: "Ensure product listings and reviews comply with policies and maintain marketplace integrity.",
      icon: "🛒",
    },
    {
      name: "Education",
      description: "Provide safe learning environments for students of all ages with age-appropriate content filtering.",
      icon: "📚",
    },
    {
      name: "Healthcare",
      description: "Protect sensitive patient information while enabling productive healthcare discussions.",
      icon: "🏥",
    },
    {
      name: "Finance",
      description: "Prevent fraud and ensure compliance with regulatory requirements in financial communications.",
      icon: "💰",
    },
  ]

  return (
    <main className="relative min-h-screen bg-black">
      <ThreeScene className="fixed inset-0 z-0" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Comprehensive Moderation Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Our platform combines cutting-edge AI with decentralized Web3 technologies to create a transparent, effective,
              and community-driven content moderation ecosystem.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                Request Demo
              </Button>
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-900/20">
                View Pricing
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {solutions.map((solution, index) => (
              <Card
                key={index}
                className="bg-black/50 border border-purple-500/20 hover:border-purple-500/50 transition-all h-full flex flex-col"
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{solution.title}</CardTitle>
                  <CardDescription className="text-gray-400">{solution.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-cyan-400 mr-2 mt-0.5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Link href={solution.href}>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                      {solution.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">Industries We Serve</h2>
            <p className="text-xl text-gray-300 mb-12 text-center">
              Our moderation solutions are tailored to meet the unique challenges of various industries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-purple-500/30 transition-all"
                >
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{industry.name}</h3>
                  <p className="text-gray-400">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to transform your content moderation?</h2>
              <p className="text-gray-300 mb-6">
                Contact our team to discuss your specific needs and how our solutions can help you create a safer platform.
              </p>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
