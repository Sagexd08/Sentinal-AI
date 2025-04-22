import { Metadata } from 'next'
import BlogPageComponent from '@/components/blog-page'

export const metadata: Metadata = {
  title: "Blog | Next-Gen Moderation",
  description: "Latest insights, news and updates about content moderation, AI and Web3 technologies.",
}

export default function BlogPage() {
  return <BlogPageComponent />
}
