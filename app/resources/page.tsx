import { Metadata } from 'next'
import ResourcesPageComponent from '@/components/resources-page'

export const metadata: Metadata = {
  title: "Resources | Next-Gen Moderation",
  description: "Explore our resources, guides, and documentation for content moderation solutions.",
}

export default function ResourcesPage() {
  return <ResourcesPageComponent />
}
