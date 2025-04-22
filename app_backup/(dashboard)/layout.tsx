"use client"

import { useAuth } from "@/components/auth-provider"
import { redirect } from "next/navigation"
import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    redirect("/login")
  }

  return <>{children}</>
}
