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

// Featured Post Component
const FeaturedPost = ({ post }) => (
  <Card className="bg-gray-900/50 border-gray-800 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-64 lg:h-auto bg-gray-800">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <div className="p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-500/30">
              {post.category}
            </Badge>
            <span className="text-xs text-gray-500">{post.readTime}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
          <p className="text-gray-400 mb-4">{post.excerpt}</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-300">{post.author}</p>
            <p className="text-xs text-gray-500">{post.date}</p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
            Read Article
          </Button>
        </div>
      </div>
    </div>
  </Card>
)

// Post Card Component
const PostCard = ({ post }) => (
  <Card className="bg-gray-900/50 border-gray-800 overflow-hidden hover:border-purple-500/30 transition-all duration-300">
    <div className="h-48 bg-gray-800 overflow-hidden">
      <img 
        src={post.image || "/placeholder.svg"} 
        alt={post.title} 
        className="w-full h-full object-cover" 
        loading="lazy"
      />
    </div>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center mb-2">
        <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-500/30">
          {post.category}
        </Badge>
        <span className="text-xs text-gray-500">{post.readTime}</span>
      </div>
      <CardTitle className="text-xl text-white">{post.title}</CardTitle>
      <CardDescription className="text-gray-400 line-clamp-3">{post.excerpt}</CardDescription>
    </CardHeader>
    <CardFooter className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-300">{post.author}</p>
        <p className="text-xs text-gray-500">{post.date}</p>
      </div>
      <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20">
        Read More
      </Button>
    </CardFooter>
  </Card>
)

// Newsletter Component
const Newsletter = () => (
  <div className="max-w-3xl mx-auto mt-20 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-xl p-8 border border-purple-500/20">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Subscribe to Our Newsletter</h2>
      <p className="text-gray-300 mb-6">
        Get the latest insights and updates about content moderation delivered to your inbox.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          required
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Button type="submit" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
          Subscribe
        </Button>
      </form>
    </div>
  </div>
)

// Background Component - Updated
const Background = () => (
  <div className="fixed inset-0 z-0">
    <ThreeScene>
      <SimpleGlobe />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
    </ThreeScene>
  </div>
)

// Main Blog Page Component
export default function BlogPage() {
  const featuredPost = {
    title: "The Future of Content Moderation: AI + Web3",
    excerpt:
      "Explore how the combination of artificial intelligence and blockchain technology is revolutionizing content moderation across digital platforms.",
    date: "June 10, 2023",
    author: "Dr. Sarah Johnson",
    category: "Technology",
    image: "https://res.cloudinary.com/dporz9gz6/image/upload/v1745162997/WhatsApp_Image_2025-04-20_at_20.56.22_f99cd2dd_esuq3i.jpg?height=400&width=800",
    readTime: "8 min read",
  }

  const allPosts = [
    {
      title: "5 Ways AI is Transforming Content Detection",
      excerpt:
        "Discover the latest advancements in AI-powered content detection and how they're improving moderation accuracy.",
      date: "May 28, 2023",
      author: "Michael Chen",
      category: "AI",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745162997/WhatsApp_Image_2025-04-20_at_20.57.14_64d8f0b0_iccdys.jpg?height=200&width=400",
      readTime: "6 min read",
    },
    {
      title: "Building Trust Through Blockchain Transparency",
      excerpt:
        "How blockchain technology creates immutable records of moderation decisions, enhancing trust and accountability.",
      date: "May 15, 2023",
      author: "Alex Rivera",
      category: "Blockchain",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745162997/WhatsApp_Image_2025-04-20_at_20.57.37_fe25fcde_ios2hk.jpg?height=200&width=400",
      readTime: "5 min read",
    },
    {
      title: "Community-Driven Moderation: The DAO Approach",
      excerpt:
        "Exploring how decentralized autonomous organizations are enabling communities to govern their own content policies.",
      date: "May 3, 2023",
      author: "Priya Patel",
      category: "Governance",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745162998/WhatsApp_Image_2025-04-20_at_20.57.57_76f1ab2a_v9cahv.jpg?height=200&width=400",
      readTime: "7 min read",
    },
    {
      title: "Balancing Free Speech and Safety Online",
      excerpt:
        "The challenges of maintaining open discourse while protecting users from harmful content in digital spaces.",
      date: "April 22, 2023",
      author: "James Wilson",
      category: "Policy",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745162998/WhatsApp_Image_2025-04-20_at_20.58.19_db8c5c1a_ducfoj.jpg?height=200&width=400",
      readTime: "9 min read",
    },
    {
      title: "The Hidden Costs of Manual Content Moderation",
      excerpt:
        "Why traditional approaches to content moderation are becoming unsustainable and the toll they take on moderators.",
      date: "April 10, 2023",
      author: "Sophia Kim",
      category: "Industry",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745163462/cc_dvqerf.jpg?height=200&width=400",
      readTime: "6 min read",
    },
    {
      title: "Case Study: How TechTalk Reduced Moderation Costs by 75%",
      excerpt:
        "A detailed look at how one platform transformed their moderation approach with AI and blockchain technology.",
      date: "March 28, 2023",
      author: "David Thompson",
      category: "Case Study",
      image: "https://res.cloudinary.com/dporz9gz6/image/upload/c_crop,ar_16:9/v1745162998/WhatsApp_Image_2025-04-20_at_20.58.59_a344e448_nahbbp.jpg?height=200&width=400",
      readTime: "8 min read",
    },
  ]

  const categories = ["All", "AI", "Blockchain", "Governance", "Policy", "Industry", "Case Study", "Technology"]
  
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  
  // Filter posts by category
  const filteredPosts = selectedCategory === "All" 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory)
  
  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setCurrentPage(1) // Reset to first page when changing category
  }
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top of posts section
    document.getElementById("posts-section").scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="relative min-h-screen bg-black">
      <Background />

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1">
          <div className="container mx-auto px-4 py-32">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Blog & Insights
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                The latest news, research, and insights about content moderation, AI technology, and Web3 innovations.
              </p>
            </div>

            {/* Featured Post */}
            <section aria-labelledby="featured-post" className="mb-12">
              <h2 id="featured-post" className="sr-only">Featured Post</h2>
              <FeaturedPost post={featuredPost} />
            </section>

            {/* Posts Section */}
            <section id="posts-section" aria-labelledby="latest-articles" className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 id="latest-articles" className="text-2xl font-bold text-white">Latest Articles</h2>
                <div className="relative">
                  <select 
                    className="bg-gray-800 border border-gray-700 text-gray-300 rounded-md px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    aria-label="Filter by category"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {currentPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-400">No articles found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPosts.map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
                </div>
              )}
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  &larr;
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button 
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className={
                      currentPage === i + 1 
                        ? "bg-purple-600 hover:bg-purple-700" 
                        : "border-gray-700 text-gray-300 hover:bg-gray-800"
                    }
                    onClick={() => handlePageChange(i + 1)}
                    aria-label={`Page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                  </Button>
                ))}
                
                <Button 
                  variant="outline" 
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  &rarr;
                </Button>
              </div>
            )}

            {/* Newsletter */}
            <Newsletter />
          </div>
        </div>
        
      </div>
    </main>
  )
}