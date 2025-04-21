import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Next-Gen Moderation",
  description: "Learn about our mission to create a safer internet through AI and Web3 technologies.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
