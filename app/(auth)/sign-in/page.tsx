"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LucideArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-provider"

export default function SignInPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await signIn(formData.email, formData.password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-800 p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
          <LucideArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          Sign In to Next-Gen Moderation
        </h1>
        <p className="text-gray-400 mt-2">Access your moderation dashboard and tools</p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/30 text-red-400 px-4 py-3 rounded-md mb-6">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-gray-800/50 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-gray-800/50 border-gray-700"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 flex items-center">
        <Separator className="flex-1 bg-gray-700" />
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <Separator className="flex-1 bg-gray-700" />
      </div>

      <div className="mt-6 space-y-3">
        <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
          Continue with GitHub
        </Button>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        Don't have an account?{" "}
        <Link href="/sign-up" className="text-purple-400 hover:text-purple-300">
          Sign up
        </Link>
      </div>
    </div>
  )
}
