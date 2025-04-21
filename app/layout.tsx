import type { Metadata } from 'next'
import './globals.css'
import { headers } from 'next/headers'
import { Montserrat } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import ClientAuthProvider from "@/components/client-auth-provider"
import { Providers } from '@/components/Providers';
import AuthSessionProvider from "@/components/auth-session-provider"

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

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
    <html lang="en" className={montserrat.variable}>
      <body className="font-montserrat">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
