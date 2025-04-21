"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideMenu, LucideX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function MainNav() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update the navigation array to include all the requested pages
  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/solutions" },
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Dashboard", href: "/dashboard" },
  ]

  // Remove the previous navigation array with nested items

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 px-4 py-3 transition-all duration-300",
        scrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
          >
          SentinelAI
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navigation.map((item) => {
            if (item.children) {
              return (
                <div key={item.name} className="relative group">
                  <button className="text-sm font-medium px-2 py-1 transition-colors text-gray-400 hover:text-white flex items-center">
                    {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium relative px-2 py-1 transition-colors",
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-purple-400"
                    : "text-gray-400 hover:text-white",
                )}
              >
                {item.name}
                {(pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600" />
                )}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex space-x-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-full">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <LucideX /> : <LucideMenu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="container mx-auto py-4 flex flex-col space-y-3">
            {navigation.map((item) => {
              if (item.children) {
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="text-left px-4 py-2 text-gray-300 font-medium">{item.name}</div>
                    <div className="pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="text-left px-4 py-2 rounded-md transition-colors block text-gray-400 hover:bg-gray-800/30 hover:text-white"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-left px-4 py-2 rounded-md transition-colors",
                    pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                      ? "bg-purple-900/30 text-purple-400"
                      : "text-gray-400 hover:bg-gray-800/30 hover:text-white",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-2 px-4 flex flex-col space-y-2">
              <Link href="/sign-in">
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
