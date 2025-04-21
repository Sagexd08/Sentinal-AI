"use client"

import { useState } from "react"
import ThreeScene from "@/components/3d/three-scene"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LucideCheck } from "lucide-react"
import Footer from "@/components/sections/footer"

export default function ContactPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 z-0">
        <ThreeScene />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-grow container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Contact Us
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              Have questions or want to learn more about our moderation solutions? Get in touch with our team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Get in Touch</h2>

                {isSubmitted ? (
                  <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-6 text-center">
                    <div className="mx-auto w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <LucideCheck className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-300">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                    <Button
                      className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-600"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Contact Information</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Email</h3>
                    <p className="text-gray-300">info@nextgenmoderation.com</p>
                    <p className="text-gray-300">support@nextgenmoderation.com</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Office</h3>
                    <p className="text-gray-300">
                      123 Innovation Way
                      <br />
                      Tech District
                      <br />
                      San Francisco, CA 94107
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Social</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Twitter
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        LinkedIn
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        GitHub
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-medium text-purple-400 mb-2">Support Hours</h3>
                    <p className="text-gray-300">
                      Monday - Friday: 9am - 6pm PST
                      <br />
                      Weekend: 10am - 4pm PST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
      </div>
    </main>
  )
}
