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
      description: "Decentralized decision-making through a DAO where stakeholders vote on policies.",
      features: ["Token-based voting", "Policy development", "Dispute resolution", "Community participation"],
      cta: "Join Community",
      href: "#governance",
    },
    {
      title: "Cross-Platform Integration",
      description: "Seamlessly integrate with existing platforms through our flexible API and SDKs.",
      features: ["REST API access", "Browser extensions", "Mobile applications", "CMS plugins"],
      cta: "View Integrations",
      href: "#integrations",
    },
  ]

  const useCases = [
    {
      title: "Social Media Platforms",
      description: "Protect your users from harmful content while maintaining a positive community experience.",
    },
    {
      title: "Online Communities",
      description: "Create safe spaces for discussion without the burden of manual moderation.",
    },
    {
      title: "Educational Platforms",
      description: "Ensure age-appropriate content for students while allowing open learning.",
    },
    {
      title: "E-commerce",
      description: "Filter product listings and reviews to maintain marketplace integrity.",
    },
    {
      title: "Gaming Communities",
      description: "Moderate in-game chat and user-generated content in real-time.",
    },
    {
      title: "Content Platforms",
      description: "Ensure uploaded content meets community guidelines before publication.",
    },
  ]

  return (
    <main className="relative min-h-screen bg-black">
      <div className="fixed inset-0 z-0">
        <ThreeScene />
      </div>

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
                View Documentation
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {solutions.map((solution, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{solution.title}</CardTitle>
                  <CardDescription className="text-gray-400">{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={solution.href}>
                    <Button className="w-full bg-gray-800 text-white hover:bg-gray-700">{solution.cta}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Use Cases</h2>
            <p className="text-lg text-gray-300 mb-8">
              Our moderation solutions are designed to work across a wide range of platforms and industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-white">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Content Moderation?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Join hundreds of platforms already using our next-generation moderation solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
              >
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  )
}
