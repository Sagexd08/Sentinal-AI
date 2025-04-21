import type { Metadata } from "next"
import Footer from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Blog | Next-Gen Moderation",
  description: "Latest insights, news and updates about content moderation, AI and Web3 technologies.",
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
