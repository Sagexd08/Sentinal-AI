"use client"

import { AuthProvider } from "./auth-provider"

export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
