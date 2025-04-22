import { Metadata } from 'next'
import ContactPageComponent from '@/components/contact-page'

export const metadata: Metadata = {
  title: "Contact | Next-Gen Moderation",
  description: "Get in touch with our team for questions, support, or partnership inquiries.",
}

export default function ContactPage() {
  return <ContactPageComponent />
}
