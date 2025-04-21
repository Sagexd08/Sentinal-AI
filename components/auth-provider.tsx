"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<User>
  signUp: (name: string, email: string, password: string) => Promise<User>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<User> => {
    // This is a mock authentication
    // In a real app, you would call your authentication API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user = {
            id: "user_123",
            name: email.split("@")[0],
            email,
            role: "admin",
          }
          localStorage.setItem("user", JSON.stringify(user))
          setUser(user)
          resolve(user)
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const signUp = async (name: string, email: string, password: string): Promise<User> => {
    // This is a mock registration
    // In a real app, you would call your registration API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const user = {
            id: "user_" + Math.random().toString(36).substring(2, 15),
            name,
            email,
            role: "user",
          }
          localStorage.setItem("user", JSON.stringify(user))
          setUser(user)
          resolve(user)
        } else {
          reject(new Error("Invalid registration details"))
        }
      }, 1000)
    })
  }

  const signOut = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
