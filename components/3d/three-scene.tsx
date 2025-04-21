"use client"

import { Canvas } from "@react-three/fiber"
import { Stars, OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import SimpleGlobe from "./simple-globe"

export default function ThreeScene() {
  return (
    <div className="fixed inset-0 bg-black">
      <Canvas
        className="bg-black"
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 0, 80]} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <SimpleGlobe />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  )
}
