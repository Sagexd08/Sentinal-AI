"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LucideBell, LucideSettings, LucideLogOut, LucideUser, LucideSearch } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DashboardHeader() {
  const { user, signOut } = useAuth()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New content flagged",
      description: "5 new items require your review",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "System update",
      description: "New AI model deployed successfully",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Weekly report",
      description: "Your moderation summary is ready",
      time: "1 day ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden md:flex md:w-60 lg:w-80">
            <div className="relative w-full">
              <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search..." className="w-full bg-gray-800/50 border-gray-700 pl-8" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <LucideBell className="h-5 w-5 text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-gray-900 border-gray-800">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-gray-400 hover:text-white"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex flex-col items-start p-4 ${notification.read ? "opacity-60" : ""}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex w-full justify-between">
                      <span className="font-medium text-white">{notification.title}</span>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <span className="text-sm text-gray-400 mt-1">{notification.description}</span>
                    {!notification.read && (
                      <div className="mt-2 self-end">
                        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                      </div>
                    )}
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="py-4 text-center text-gray-500">No notifications</div>
              )}
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="justify-center text-purple-400 hover:text-purple-300">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-cyan-500">
                  <span className="text-sm font-medium text-white">{user?.name?.charAt(0) || "U"}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem>
                <LucideUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LucideSettings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem onClick={signOut}>
                <LucideLogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
