"use client"

import { useState } from "react"
import ThreeScene from "@/components/3d/three-scene"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/sections/footer"

// Background Component
const Background = () => (
  <div className="fixed inset-0 z-0">
    <ThreeScene />
  </div>
)

export default function ResourcesPage() {
  const [filter, setFilter] = useState("all")

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "guide", label: "Guides" },
    { id: "doc", label: "Documentation" },
    { id: "whitepaper", label: "Whitepapers" },
    { id: "research", label: "Research" },
  ]

  const allResources = [
    {
      title: "Getting Started Guide",
      description: "Learn how to integrate our moderation tools into your platform in minutes.",
      category: "guide",
      timeToRead: "10 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745161774/WhatsApp_Image_2025-04-20_at_20.16.56_eafe96ae_pw7vxd.jpg?height=200&width=400",
    },
    {
      title: "API Documentation",
      description: "Comprehensive documentation for our moderation API endpoints and SDKs.",
      category: "doc",
      timeToRead: "Reference",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745161772/api_u4nuds.jpg?height=200&width=400",
    },
    {
      title: "Content Policy Framework",
      description: "Best practices for creating effective content policies for your community.",
      category: "whitepaper",
      timeToRead: "15 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_4:3/v1745162155/content_hvzflc.jpg?height=200&width=400",
    },
    {
      title: "AI Moderation Benchmarks",
      description: "Performance analysis of our AI models compared to industry standards.",
      category: "research",
      timeToRead: "20 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745162155/api2_jwo2jc.jpg?height=200&width=400",
    },
    {
      title: "Implementation Patterns",
      description: "Common patterns and best practices for implementing our moderation tools.",
      category: "guide",
      timeToRead: "12 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745162155/patterns_jwo2jc.jpg?height=200&width=400",
    },
    {
      title: "SDK Reference",
      description: "Detailed reference for our JavaScript, Python, and Ruby SDKs.",
      category: "doc",
      timeToRead: "Reference",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745162155/sdk_jwo2jc.jpg?height=200&width=400",
    },
    {
      title: "Transparency in AI Moderation",
      description: "How blockchain technology enables transparent moderation decisions.",
      category: "whitepaper",
      timeToRead: "18 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745162155/transparency_jwo2jc.jpg?height=200&width=400",
    },
    {
      title: "Bias Mitigation in AI Models",
      description: "Our approach to reducing bias in content moderation AI systems.",
      category: "research",
      timeToRead: "25 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745162155/bias_jwo2jc.jpg?height=200&width=400",
    },
  ]

  const filteredResources = filter === "all" ? allResources : allResources.filter(resource => resource.category === filter)

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Background />

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Resources
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our guides, documentation, and research to help you implement and get the most out of our content moderation platform.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                className={filter === category.id ? "bg-gradient-to-r from-cyan-500 to-purple-600" : "border-purple-500/30 text-purple-400 hover:bg-purple-900/20"}
                onClick={() => setFilter(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <Card key={index} className="bg-black/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden">
                <div className="h-48 relative">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-500/30">
                      {categories.find(c => c.id === resource.category)?.label || resource.category}
                    </Badge>
                    <span className="text-xs text-gray-400">{resource.timeToRead}</span>
                  </div>
                  <CardTitle className="text-xl text-white">{resource.title}</CardTitle>
                  <CardDescription className="text-gray-400">{resource.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                    View Resource
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Need Custom Resources?</h2>
                <p className="text-gray-300">
                  Our team can provide personalized guidance and documentation for your specific use case.
                </p>
              </div>
              <Button className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
