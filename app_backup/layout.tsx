import type { Metadata } from 'next'
import './globals.css'
import { headers } from 'next/headers'
import { SessionProvider } from "next-auth/react"
import ClientAuthProvider from "@/components/client-auth-provider"
import { Providers } from '@/components/Providers';
import AuthSessionProvider from "@/components/auth-session-provider"

export const metadata: Metadata = {
  title: 'SentinelAI',
  description: 'Created with v0',
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
