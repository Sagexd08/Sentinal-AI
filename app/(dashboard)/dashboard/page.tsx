"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  Activity, 
  AlertTriangle, 
  Check, 
  Users, 
  Download, 
  BarChart3, 
  Clock, 
  Layers,
  Home
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function DashboardPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!user) {
      router.push("/sign-in")
    }
  }, [user, router])

  // If no user, show nothing while redirecting
  if (!user) {
    return null
  }

  const handleLogout = () => {
    signOut()
    router.push("/sign-in")
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            <Home className="h-5 w-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-gray-400 mt-1 text-lg">Welcome back, {user?.name || "User"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2 shadow-lg shadow-indigo-900/20">
            <Download className="h-4 w-4" /> Generate Report
          </Button>
          <Button 
            variant="outline" 
            className="rounded-full px-6 border-gray-700 text-gray-400 hover:bg-gray-800/80"
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900/40 backdrop-blur-md rounded-full p-1 border border-gray-800/50 w-full md:w-auto">
          <TabsTrigger value="overview" className="rounded-full text-sm">Overview</TabsTrigger>
          <TabsTrigger value="content" className="rounded-full text-sm">Content</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-full text-sm">Analytics</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-full text-sm">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl rounded-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Content</CardTitle>
                  <div className="p-2 bg-blue-500/10 rounded-full">
                    <Layers className="h-4 w-4 text-blue-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">1,284,392</div>
                <p className="text-xs text-green-400 flex items-center mt-2 font-medium">
                  <Activity className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl rounded-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Flagged Content</CardTitle>
                  <div className="p-2 bg-red-500/10 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">24,853</div>
                <p className="text-xs text-red-400 flex items-center mt-2 font-medium">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  1.9% of total content
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl rounded-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">AI Accuracy</CardTitle>
                  <div className="p-2 bg-green-500/10 rounded-full">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">94.7%</div>
                <p className="text-xs text-green-400 flex items-center mt-2 font-medium">
                  <Check className="h-3 w-3 mr-1" />
                  +2.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl rounded-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Moderators</CardTitle>
                  <div className="p-2 bg-indigo-500/10 rounded-full">
                    <Users className="h-4 w-4 text-indigo-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">128</div>
                <p className="text-xs text-cyan-400 flex items-center mt-2 font-medium">
                  <Users className="h-3 w-3 mr-1" />
                  12 new this week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl rounded-xl lg:col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white font-medium">Content Moderation Activity</CardTitle>
                    <CardDescription>Last 30 days of moderation</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 border-gray-700 text-gray-400 bg-gray-800/50 hover:bg-gray-700">
                      <Clock className="h-3.5 w-3.5 mr-1" /> 30 Days
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 border-gray-700 text-gray-400 bg-gray-800/50 hover:bg-gray-700">
                      <BarChart3 className="h-3.5 w-3.5 mr-1" /> Analytics
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center p-0 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 flex items-center justify-center">
                  <p className="text-gray-500">Interactive chart visualization would go here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl rounded-xl lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white font-medium">Recent Alerts</CardTitle>
                    <CardDescription>Content flagged by the system</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-indigo-400 hover:text-white hover:bg-indigo-500/20">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                      <div className={`${
                        i % 2 === 0 ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
                      } p-2 rounded-lg`}>
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-white text-sm">Content ID: #A{i}28F9</h4>
                          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">{i * 2}h ago</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {i % 2 === 0
                            ? "Potential hate speech detected in forum post"
                            : "Suspicious image flagged for manual review"}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2 border-gray-800 text-gray-400 hover:bg-gray-800">
                    Load More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl rounded-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white font-medium">Content Management</CardTitle>
                  <CardDescription>Review and manage flagged content</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800/50 hover:bg-gray-700">
                    Filter
                  </Button>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Add Content
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-lg">
                <p className="text-gray-400">Content management interface would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl rounded-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white font-medium">Analytics Dashboard</CardTitle>
                  <CardDescription>Detailed metrics and performance data</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-700 bg-gray-800/50 hover:bg-gray-700">
                    Last 30 Days
                  </Button>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-lg">
                <p className="text-gray-400">Analytics dashboard would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-xl rounded-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white font-medium">Account Settings</CardTitle>
                  <CardDescription>Manage your account and preferences</CardDescription>
                </div>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  Save Changes
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-lg">
                <p className="text-gray-400">Settings interface would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}