"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-provider"

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: "Tech Solutions Inc.",
    role: "Administrator",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyReport: true,
    contentAlerts: true,
    systemUpdates: false,
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-gray-800/50 border border-gray-700">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={profileData.company}
                    onChange={handleProfileChange}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    name="role"
                    value={profileData.role}
                    onChange={handleProfileChange}
                    className="bg-gray-800/50 border-gray-700"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                    <p className="text-sm text-gray-400">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <Separator className="bg-gray-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Push Notifications</h4>
                    <p className="text-sm text-gray-400">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>

                <Separator className="bg-gray-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Weekly Report</h4>
                    <p className="text-sm text-gray-400">Receive a weekly summary of moderation activity</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) => handleNotificationChange("weeklyReport", checked)}
                  />
                </div>

                <Separator className="bg-gray-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Content Alerts</h4>
                    <p className="text-sm text-gray-400">Get notified about high-priority content flags</p>
                  </div>
                  <Switch
                    checked={notifications.contentAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("contentAlerts", checked)}
                  />
                </div>

                <Separator className="bg-gray-800" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">System Updates</h4>
                    <p className="text-sm text-gray-400">Receive notifications about system updates and maintenance</p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("systemUpdates", checked)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Change Password</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="••••••••"
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••"
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="bg-gray-800/50 border-gray-700"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Enable 2FA
                  </Button>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Sign Out of All Devices</h4>
                  <p className="text-sm text-gray-400 mb-4">
                    This will sign you out from all devices except your current one.
                  </p>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Sign Out Everywhere
                  </Button>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h4 className="text-sm font-medium text-red-500 mb-2">Delete Account</h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage your API keys and access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">API Keys</h4>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">Production Key</span>
                      <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500/30">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Input
                        value="••••••••••••••••••••••••••••••"
                        readOnly
                        className="bg-gray-800/50 border-gray-700"
                      />
                      <Button variant="outline" className="ml-2 border-gray-700 text-gray-300 hover:bg-gray-800">
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    Generate New Key
                  </Button>
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    View API Documentation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}
