import { Metadata } from 'next'
import SolutionsPage from '@/app/(marketing)/solutions/page'

export const metadata: Metadata = {
  title: "Solutions | Next-Gen Moderation",
  description: "Discover our comprehensive content moderation solutions for platforms of all sizes.",
}

export default function Page() {
  return <SolutionsPage />
}
