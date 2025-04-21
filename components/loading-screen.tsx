"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        SentinelAI
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-400 mb-12">AI + Web3 for a Safer Internet</h2>

        <div className="w-64 md:w-96 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-600" style={{ width: `${progress}%` }} />
        </div>

        <p className="mt-4 text-gray-500">Loading experience... {Math.round(progress)}%</p>
      </div>
    </div>
  )
}
