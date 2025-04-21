import { Metadata } from 'next'
import AboutPage from '@/app/(marketing)/about/page'

export const metadata: Metadata = {
  title: "About | Next-Gen Moderation",
  description: "Learn about our mission to create a safer internet through AI and Web3 technologies.",
}

export default function Page() {
  return <AboutPage />
}
