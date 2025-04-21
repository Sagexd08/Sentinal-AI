import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resources | Next-Gen Moderation",
  description: "Explore our resources, guides, and documentation for content moderation solutions.",
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
