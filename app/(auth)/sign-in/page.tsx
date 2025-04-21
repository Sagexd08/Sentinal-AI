"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LucideArrowLeft, Github } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Separator } from "../../components/ui/separator"
import { useAuth } from "../../components/auth-provider"

export default function SignInPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await signIn("credentials", formData)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: string) => {
    try {
      if (provider === 'google') setGoogleLoading(true)
      if (provider === 'github') setGithubLoading(true)
      setError("")

      const result = await signIn(provider)
      if (result?.error) {
        throw new Error(result.error)
      }
      router.push("/dashboard")
    } catch (err) {
      console.error("Auth error:", err)
      setError(`Failed to sign in with ${provider}. ${err.message || 'Please try again.'}`)
    } finally {
      setGoogleLoading(false)
      setGithubLoading(false)
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

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
          <Label htmlFor="password">Password</Label>
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

      <Separator className="my-6" />

      <div className="mt-6 space-y-3">
        <Button
          variant="outline"
          className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
          onClick={() => handleSocialSignIn('google')}
          disabled={googleLoading || githubLoading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </Button>

        <Button
          variant="outline"
          className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
          onClick={() => handleSocialSignIn('github')}
          disabled={googleLoading || githubLoading}
        >
          <Github className="mr-2 h-4 w-4" />
          {githubLoading ? "Signing in..." : "Continue with GitHub"}
        </Button>
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-500 bg-red-500/10 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-8 text-center text-gray-400 text-sm">
        Don't have an account?{" "}
        <Link href="/sign-up" className="text-purple-400 hover:text-purple-300">
          Sign up
        </Link>
      </div>
    </div>
  )
}
