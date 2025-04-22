import type React from "react"
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-cyan-500/10 to-transparent" />
      </div>
      <div className="relative z-10 w-full max-w-md p-6">{children}</div>
    </div>
  )
}
