import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SentinelAI - Next-Gen Content Moderation',
  description: 'AI-powered content moderation with transparency and accountability',
}

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-purple-500">SentinelAI</h1>
      <h2 className="text-2xl mb-8">Next-Gen Content Moderation</h2>

      <div className="max-w-3xl text-center mb-12">
        <p className="text-lg mb-4">
          SentinelAI is a cutting-edge platform that leverages artificial intelligence to detect and prevent digital threats,
          ensuring the integrity of your online presence.
        </p>
        <p className="text-lg">
          Our system combines advanced machine learning algorithms, blockchain verification, and decentralized governance
          to create a comprehensive solution for content moderation and digital security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Content Moderation</h3>
          <p>Advanced AI algorithms to detect and filter inappropriate content across your digital platforms.</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Threat Detection</h3>
          <p>Real-time monitoring and detection of potential security threats and vulnerabilities.</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Analytics Dashboard</h3>
          <p>Comprehensive analytics and reporting to track and visualize your digital security status.</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <a
          href="/demo"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Try Demo
        </a>
        <a
          href="/about"
          className="bg-transparent border border-purple-600 hover:bg-purple-900/20 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Learn More
        </a>
      </div>

      <div className="mt-8 text-center text-gray-400">
        <p>&copy; 2025 SentinelAI. All rights reserved.</p>
        <p className="mt-2">
          <a
            href="https://github.com/Sagexd08/Sentinal-AI"
            className="text-purple-400 hover:text-purple-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </main>
  )
}
