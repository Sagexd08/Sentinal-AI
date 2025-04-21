"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LucideCheck, LucideX, LucideAlertTriangle, LucideEye, LucideFlag } from "lucide-react"

export default function ContentPage() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const contentItems = [
    {
      id: "C12345",
      type: "Text",
      status: "flagged",
      confidence: 92,
      timestamp: "2023-06-12T14:32:00Z",
      platform: "Forum",
      excerpt: "This content contains potentially harmful language that violates community guidelines...",
    },
    {
      id: "C12346",
      type: "Image",
      status: "flagged",
      confidence: 87,
      timestamp: "2023-06-12T15:45:00Z",
      platform: "Social Media",
      excerpt: "Image flagged for potential graphic content requiring human review...",
    },
    {
      id: "C12347",
      type: "Video",
      status: "approved",
      confidence: 95,
      timestamp: "2023-06-12T16:20:00Z",
      platform: "Streaming",
      excerpt: "Content reviewed and approved by moderator ID #M234...",
    },
    {
      id: "C12348",
      type: "Text",
      status: "rejected",
      confidence: 98,
      timestamp: "2023-06-12T17:05:00Z",
      platform: "Comments",
      excerpt: "Content removed for violation of hate speech policy section 3.2...",
    },
    {
      id: "C12349",
      type: "Image",
      status: "pending",
      confidence: 76,
      timestamp: "2023-06-12T18:15:00Z",
      platform: "Social Media",
      excerpt: "Content flagged with medium confidence, awaiting human review...",
    },
  ]

  const filteredContent = contentItems.filter((item) => {
    if (filter !== "all" && item.status !== filter) return false
    if (search && !item.excerpt.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "flagged":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "pending":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "flagged":
        return <LucideAlertTriangle className="h-4 w-4" />
      case "approved":
        return <LucideCheck className="h-4 w-4" />
      case "rejected":
        return <LucideX className="h-4 w-4" />
      case "pending":
        return <LucideFlag className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Management</h1>
          <p className="text-gray-400">Review and manage flagged content</p>
        </div>
      </div>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle>Content Queue</CardTitle>
          <CardDescription>Review and moderate flagged content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-800/50 border-gray-700"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="bg-gray-800/50 border-gray-700">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Content</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-white">{item.id}</span>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(item.status)}
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </Badge>
                        <Badge variant="outline" className="bg-gray-800/50 text-gray-400 border-gray-700">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{item.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Platform: {item.platform}</span>
                        <span>Confidence: {item.confidence}%</span>
                        <span>
                          {new Date(item.timestamp).toLocaleDateString()} at{" "}
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                        <LucideEye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-700 text-green-400 hover:bg-green-900/20"
                      >
                        <LucideCheck className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-700 text-red-400 hover:bg-red-900/20">
                        <LucideX className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No content items match your filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
