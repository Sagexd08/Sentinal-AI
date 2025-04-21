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

// Resource Card Component
const ResourceCard = ({ resource }) => (
  <Card className="bg-gray-900/50 border-gray-800 overflow-hidden hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col">
    <div className="h-48 bg-gray-800 overflow-hidden">
      <img
        src={resource.image || "/placeholder.svg"}
        alt={resource.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <CardHeader className="pb-2 flex-1">
      <div className="flex justify-between items-center mb-2">
        <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-500/30">
          {resource.category}
        </Badge>
        <span className="text-xs text-gray-500">{resource.timeToRead}</span>
      </div>
      <CardTitle className="text-xl text-white">{resource.title}</CardTitle>
      <CardDescription className="text-gray-400">{resource.description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 w-full">
        Read More
      </Button>
    </CardFooter>
  </Card>
)

// Webinar Card Component
const WebinarCard = ({ webinar }) => (
  <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col">
    <CardHeader className="flex-1">
      <CardTitle className="text-xl text-white">{webinar.title}</CardTitle>
      <CardDescription className="text-gray-400">
        {webinar.date} • {webinar.speakers.join(", ")}
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
        Register Now
      </Button>
    </CardFooter>
  </Card>
)

// CTA Component
const ContactCTA = () => (
  <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-xl p-8 border border-purple-500/20">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Need Custom Resources?</h2>
      <p className="text-gray-300 mb-6">
        Our team can provide personalized guidance and documentation for your specific moderation needs.
      </p>
      <Button className="bg-white text-purple-600 hover:bg-gray-100">Contact Our Team</Button>
    </div>
  </div>
)

// Section Header Component
const SectionHeader = ({ title, buttonText, onClick }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
    <h2 className="text-3xl font-bold text-white">{title}</h2>
    <Button 
      variant="outline" 
      className="border-gray-700 text-gray-300 hover:bg-gray-800 whitespace-nowrap"
      onClick={onClick}
    >
      {buttonText}
    </Button>
  </div>
)

export default function ResourcesPage() {
  // Resource categories for filtering
  const categories = ["All", "Guide", "Documentation", "Whitepaper", "Research", "Case Study"]
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [visibleResourcesCount, setVisibleResourcesCount] = useState(6)

  const allResources = [
    {
      title: "Getting Started Guide",
      description: "Learn how to integrate our moderation tools into your platform in minutes.",
      category: "Guide",
      timeToRead: "10 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745161774/WhatsApp_Image_2025-04-20_at_20.16.56_eafe96ae_pw7vxd.jpg?height=200&width=400",
    },
    {
      title: "API Documentation",
      description: "Comprehensive documentation for our moderation API endpoints and SDKs.",
      category: "Documentation",
      timeToRead: "Reference",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745161772/api_u4nuds.jpg?height=200&width=400",
    },
    {
      title: "Content Policy Framework",
      description: "Best practices for creating effective content policies for your community.",
      category: "Whitepaper",
      timeToRead: "15 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_4:3/v1745162155/content_hvzflc.jpg?height=200&width=400",
    },
    {
      title: "AI Moderation Benchmarks",
      description: "Performance analysis of our AI models compared to industry standards.",
      category: "Research",
      timeToRead: "20 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745162155/api2_jwo2jc.jpg?height=200&width=400",
    },
    {
      title: "Community Governance Guide",
      description: "How to implement decentralized governance for content moderation.",
      category: "Guide",
      timeToRead: "12 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745162155/gov_clsesg.jpg?height=200&width=400",
    },
    {
      title: "Case Study: TechTalk",
      description: "How TechTalk reduced moderation costs by 75% while improving accuracy.",
      category: "Case Study",
      timeToRead: "8 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745162155/talk_rtfjij.jpg?height=200&width=400",
    },
    {
      title: "Blockchain Integration Guide",
      description: "Step-by-step guide to integrating blockchain for transparent moderation records.",
      category: "Guide",
      timeToRead: "15 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745163958/WhatsApp_Image_2025-04-20_at_21.15.00_6f1ada81_t1mcr0.jpg?height=200&width=400",
    },
    {
      title: "AI Model Training Whitepaper",
      description: "Technical deep dive into how our AI models are trained for content detection.",
      category: "Whitepaper",
      timeToRead: "30 min read",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745163959/WhatsApp_Image_2025-04-20_at_21.15.14_7052304b_g3esgh.jpg?height=200&width=400",
    },
    {
      title: "SDK Documentation",
      description: "Complete reference for our JavaScript, Python, and Ruby SDKs.",
      category: "Documentation",
      timeToRead: "Reference",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745163959/WhatsApp_Image_2025-04-20_at_21.15.22_41cb5c4d_cyowzt.jpg?height=200&width=400",
    },
  ]

  const webinars = [
    {
      title: "The Future of AI Moderation",
      date: "June 15, 2023",
      speakers: ["Dr. Sarah Johnson", "Michael Chen"],
    },
    {
      title: "Blockchain for Content Transparency",
      date: "July 22, 2023",
      speakers: ["Alex Rivera", "Priya Patel"],
    },
    {
      title: "Building Safe Online Communities",
      date: "August 10, 2023",
      speakers: ["James Wilson", "Sophia Kim"],
    },
  ]

  // Filter resources based on selected category
  const filteredResources = selectedCategory === "All" 
    ? allResources 
    : allResources.filter(resource => resource.category === selectedCategory)
  
  // Get visible resources based on filter and count
  const visibleResources = filteredResources.slice(0, visibleResourcesCount)
  
  // Handle showing more resources
  const handleViewMoreResources = () => {
    setVisibleResourcesCount(prevCount => 
      prevCount + 3 > filteredResources.length 
        ? filteredResources.length 
        : prevCount + 3
    )
  }

  return (
    <div className="relative w-full">
      <Background />
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1">
          <div className="container mx-auto px-4 py-16">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Resources & Learning
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Explore our comprehensive collection of guides, documentation, and research to help you implement effective
                content moderation.
              </p>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mt-6">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={
                      selectedCategory === category
                        ? "bg-purple-600 hover:bg-purple-700 cursor-pointer text-white"
                        : "bg-purple-900/20 text-purple-400 border-purple-500/30 hover:bg-purple-900/40 cursor-pointer"
                    }
                    onClick={() => {
                      setSelectedCategory(category)
                      setVisibleResourcesCount(6) // Reset visible count when changing category
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <section aria-labelledby="featured-resources" className="mb-16">
              <SectionHeader 
                title="Featured Resources" 
                buttonText="View All Resources"
                onClick={() => setVisibleResourcesCount(filteredResources.length)}
              />

              {visibleResources.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No resources found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleResources.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                  ))}
                </div>
              )}

              {visibleResourcesCount < filteredResources.length && (
                <div className="flex justify-center mt-8">
                  <Button 
                    variant="outline" 
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    onClick={handleViewMoreResources}
                  >
                    Load More Resources
                  </Button>
                </div>
              )}
            </section>

            {/* Webinars Section */}
            <section aria-labelledby="upcoming-webinars" className="mb-16">
              <SectionHeader 
                title="Upcoming Webinars" 
                buttonText="View All Webinars"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {webinars.map((webinar, index) => (
                  <WebinarCard key={index} webinar={webinar} />
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <ContactCTA />
          </div>
        </div>
        
       
      </div>
    </div>
  )
}