import type React from "react"
import MainNav from "@/components/main-nav"
import Footer from "@/components/sections/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <ScrollToTop />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
