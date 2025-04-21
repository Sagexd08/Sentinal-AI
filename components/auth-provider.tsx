"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export const AuthContext = createContext<{
  user: any;
  signOut: () => void;
  signIn: (provider: string, credentials?: any) => Promise<any>;
  isLoading: boolean;
}>({
  user: null,
  signOut: () => {},
  signIn: () => Promise.resolve({}),
  isLoading: false
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && status === "unauthenticated") {
      if (window.location.pathname !== "/sign-in") {
        router.push("/sign-in")
      }
    }
    if (mounted && status === "authenticated") {
      if (window.location.pathname === "/sign-in") {
        router.push("/dashboard")
      }
    }
  }, [status, router, mounted])

  // Don't render anything until the component is mounted
  if (!mounted) return null;

  const value = {
    user: session?.user || null,
    isLoading: status === "loading",
    signOut: () => signOut({
      callbackUrl: "/sign-in",
      redirect: true
    }),
    signIn: async (provider: string, credentials?: any) => {
      try {
        return await signIn(provider, {
          ...credentials,
          callbackUrl: "/dashboard",
          redirect: false,
        })
      } catch (error) {
        console.error("Sign in error:", error)
        throw error
      }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
