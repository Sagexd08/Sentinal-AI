import { Metadata } from 'next'
import MarketingPage from './MarketingPage'

export const metadata: Metadata = {
  title: 'SentinelAI - Next-Gen Content Moderation',
  description: 'AI-powered content moderation with transparency and accountability',
}

export default function Page() {
  return <MarketingPage />
}
