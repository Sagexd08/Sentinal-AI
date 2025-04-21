import { Metadata } from 'next'
import ContactPage from '@/app/(marketing)/contact/page'

export const metadata: Metadata = {
  title: "Contact | Next-Gen Moderation",
  description: "Get in touch with our team for questions, support, or partnership inquiries.",
}

export default function Page() {
  return <ContactPage />
}
