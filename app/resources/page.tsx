import { Metadata } from 'next'
import ResourcesPage from '@/app/(marketing)/resources/page'

export const metadata: Metadata = {
  title: "Resources | Next-Gen Moderation",
  description: "Explore our resources, guides, and documentation for content moderation solutions.",
}

export default function Page() {
  return <ResourcesPage />
}
