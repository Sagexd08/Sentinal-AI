"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LucideArrowLeft } from "lucide-react"
import { Button } from "../../../components/ui/button.js"
import { Input } from "../../../components/ui/input.js"
import { Label } from "../../../components/ui/label.js"
import { Separator } from "../../../components/ui/separator.js"
import { Checkbox } from "../../../components/ui/checkbox.js"
import { useAuth } from "../../../components/auth-provider.js"

export default function SignUpPage() {
  const router = useRouter()
  const { signUp, signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      acceptTerms: checked,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions")
      setIsLoading(false)
      return
    }

    try {
      await signUp(formData.name, formData.email, formData.password)
      // Only attempt sign in if sign up was successful
      try {
        await signIn(formData.email, formData.password)
        router.push("/dashboard")
      } catch (signInErr) {
        // If sign in fails after successful signup, show a different message
        setError("Account created! Please try signing in.")
        router.push("/sign-in")
      }
    } catch (err) {
      if (err.message?.includes("email-already-in-use")) {
        setError("This email is already registered. Please sign in instead.")
      } else if (err.message?.includes("invalid-email")) {
        setError("Please enter a valid email address.")
      } else if (err.message?.includes("weak-password")) {
        setError("Password is too weak. Please use a stronger password.")
      } else {
        setError("Failed to create account. Please try again later.")
      }
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
          Create Your Account
        </h1>
        <p className="text-gray-400 mt-2">Join the next generation of content moderation</p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/30 text-red-400 px-4 py-3 rounded-md mb-6">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-gray-800/50 border-gray-700"
          />
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="bg-gray-800/50 border-gray-700"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="acceptTerms" checked={formData.acceptTerms} onCheckedChange={handleCheckboxChange} />
          <label
            htmlFor="acceptTerms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
          >
            I agree to the{" "}
            <Link href="/terms" className="text-purple-400 hover:text-purple-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 flex items-center">
        <Separator className="flex-1 bg-gray-700" />
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <Separator className="flex-1 bg-gray-700" />
      </div>

      <div className="mt-6 space-y-3">
        <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
          Sign up with Google
        </Button>
        <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
          Sign up with GitHub
        </Button>
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-purple-400 hover:text-purple-300">
          Sign in
        </Link>
      </div>
    </div>
  )
}
