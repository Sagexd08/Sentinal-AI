"use client"

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the ThreeScene component with no SSR
const ThreeScene = dynamic(() => import('./three-scene'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black flex items-center justify-center text-white">
      <p>Loading 3D experience...</p>
    </div>
  )
})

export default function ThreeSceneWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full h-full bg-black flex items-center justify-center text-white">
        <p>Loading 3D experience...</p>
      </div>
    }>
      <ThreeScene />
    </Suspense>
  )
}
