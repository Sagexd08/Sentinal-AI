'use client'

import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "./auth-provider"

export default function AuthSessionProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <SessionProvider refetchInterval={0} refetchWhenOffline={false}>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  )
}
