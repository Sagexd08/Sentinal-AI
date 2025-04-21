"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import SimpleGlobe from "@/components/3d/simple-globe"
import ThreeScene from "@/components/3d/three-scene"
import Footer from "@/components/sections/footer"

export default function BlogPage() {
  const [filter, setFilter] = useState("all")

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "ai", label: "AI & ML" },
    { id: "web3", label: "Web3" },
    { id: "moderation", label: "Content Moderation" },
    { id: "research", label: "Research" },
  ]

  const blogPosts = [
    {
      title: "The Future of AI in Content Moderation",
      description: "How advanced machine learning models are revolutionizing the way platforms detect harmful content.",
      category: "ai",
      date: "May 15, 2023",
      readTime: "8 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745161772/ai_ixnvxl.jpg?height=200&width=400",
    },
    {
      title: "Blockchain-Based Transparency in Moderation Decisions",
      description: "How decentralized ledgers can create accountability and trust in content moderation systems.",
      category: "web3",
      date: "April 28, 2023",
      readTime: "6 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745161772/blockchain_ixnvxl.jpg?height=200&width=400",
    },
    {
      title: "Building Community-Driven Moderation Policies",
      description: "The importance of involving users in creating and enforcing content guidelines.",
      category: "moderation",
      date: "April 10, 2023",
      readTime: "5 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745161772/community_ixnvxl.jpg?height=200&width=400",
    },
    {
      title: "Multimodal Content Analysis: Beyond Text",
      description: "How our AI systems detect harmful content across images, video, and audio.",
      category: "ai",
      date: "March 22, 2023",
      readTime: "7 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745161772/multimodal_ixnvxl.jpg?height=200&width=400",
    },
    {
      title: "The Ethics of Automated Content Moderation",
      description: "Navigating the complex ethical challenges of using AI to make moderation decisions.",
      category: "research",
      date: "March 5, 2023",
      readTime: "10 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745161772/ethics_ixnvxl.jpg?height=200&width=400",
    },
    {
      title: "Smart Contracts for Content Governance",
      description: "How blockchain-based smart contracts can automate and enforce moderation policies.",
      category: "web3",
      date: "February 18, 2023",
      readTime: "6 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745161772/smart-contracts_ixnvxl.jpg?height=200&width=400",
    },
  ]

  const filteredPosts = filter === "all" ? blogPosts : blogPosts.filter(post => post.category === filter)

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <ThreeScene />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Blog & Insights
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our latest thoughts on content moderation, AI technology, and creating safer online spaces.
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
            {filteredPosts.map((post, index) => (
              <Card key={index} className="bg-black/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden">
                <div className="h-48 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-500/30">
                      {categories.find(c => c.id === post.category)?.label || post.category}
                    </Badge>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <CardTitle className="text-xl text-white">{post.title}</CardTitle>
                  <CardDescription className="text-gray-400">{post.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                  <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
              Load More Articles
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
