"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LucideLayoutDashboard,
  LucideShield,
  LucideBarChart,
  LucideSettings,
  LucideUsers,
  LucideCode,
  LucideLifeBuoy,
  LucideChevronLeft,
  LucideChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Update the navigation array to include all dashboard pages
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LucideLayoutDashboard,
    },
    {
      name: "Content",
      href: "/dashboard/content",
      icon: LucideShield,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: LucideBarChart,
      comingSoon: true,
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: LucideUsers,
      comingSoon: true,
    },
    {
      name: "API",
      href: "/dashboard/api",
      icon: LucideCode,
      comingSoon: true,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: LucideSettings,
    },
  ]

  return (
    <div
      className={cn(
        "bg-gray-900/70 border-r border-gray-800 h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              NextMod
            </span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-gray-400 hover:text-white"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <LucideChevronRight className="h-5 w-5" /> : <LucideChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Update the navigation rendering to show "Coming Soon" badges */}
      <div className="flex-1 py-6 px-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.comingSoon ? "#" : item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
              pathname === item.href ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50",
              item.comingSoon && "opacity-60 cursor-not-allowed hover:bg-transparent hover:text-gray-400",
            )}
            onClick={(e) => {
              if (item.comingSoon) {
                e.preventDefault()
              }
            }}
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
            {!collapsed && (
              <>
                <span>{item.name}</span>
                {item.comingSoon && (
                  <span className="ml-auto text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">Soon</span>
                )}
              </>
            )}
            {collapsed && item.comingSoon && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-gray-600 rounded-full"></span>
            )}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <Link
          href="/help"
          className={cn(
            "flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors",
          )}
        >
          <LucideLifeBuoy className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
          {!collapsed && <span>Help & Support</span>}
        </Link>
      </div>
    </div>
  )
}
