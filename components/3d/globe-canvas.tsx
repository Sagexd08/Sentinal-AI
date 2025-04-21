"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import SimpleGlobe from "./simple-globe"
import { Suspense } from "react"

export default function GlobeCanvas() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <SimpleGlobe />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate />
        </Suspense>
      </Canvas>
    </div>
  )
}
