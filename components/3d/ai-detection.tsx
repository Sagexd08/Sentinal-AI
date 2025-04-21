"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import { MathUtils } from "three"

export default function AIDetection({ scroll }) {
  const groupRef = useRef()
  const screensRef = useRef([])

  useFrame((state, delta) => {
    if (groupRef.current) {
      const scrollOffset = scroll.offset
      const sectionStart = 1 / 8
      const sectionEnd = 2 / 8

      // Calculate section progress (0 to 1)
      const sectionProgress = MathUtils.clamp((scrollOffset - sectionStart) / (sectionEnd - sectionStart), 0, 1)

      // Animate section in and out
      if (sectionProgress > 0 && sectionProgress < 1) {
        // Fade in
        groupRef.current.position.z = MathUtils.lerp(20, 0, Math.min(sectionProgress * 2, 1))
        groupRef.current.opacity = MathUtils.lerp(0, 1, Math.min(sectionProgress * 2, 1))

        // Fade out
        if (sectionProgress > 0.8) {
          groupRef.current.position.z = MathUtils.lerp(0, -20, (sectionProgress - 0.8) * 5)
        }
      } else {
        // Hide when out of view
        groupRef.current.position.z = 20
      }

      // Animate screens
      screensRef.current.forEach((screen, i) => {
        if (screen) {
          screen.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.1
          screen.position.y = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.1
        }
      })
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 20]}>
      <Text
        position={[0, 3, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist_Bold.json"
      >
        Real-Time Detection
      </Text>

      <Text
        position={[0, 2.2, 0]}
        fontSize={0.25}
        color="#a5a5a5"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist_Regular.json"
        maxWidth={8}
        textAlign="center"
      >
        Advanced AI systems scanning live digital feeds
      </Text>

      {/* Screens showing content detection */}
      <group position={[0, 0, 0]}>
        {/* Text content screen */}
        <group position={[-3, 0, 0]} ref={(el) => (screensRef.current[0] = el)}>
          <mesh>
            <planeGeometry args={[2.5, 1.5]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>

          <Text
            position={[0, 0.5, 0.01]}
            fontSize={0.1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Regular.json"
            maxWidth={2}
          >
            Text Analysis
          </Text>

          <Html position={[0, 0, 0.01]} transform scale={0.15}>
            <div className="w-[400px] h-[200px] p-4 font-mono text-sm overflow-hidden">
              <div className="mb-2 text-gray-400">Scanning content...</div>
              <div className="mb-1">This is normal content that passes moderation checks.</div>
              <div className="mb-1 bg-red-500/20 p-1 rounded">
                <span className="text-red-400">FLAGGED:</span> This content contains harmful language.
              </div>
              <div className="mb-1">More normal content that is acceptable.</div>
              <div className="mb-1 bg-yellow-500/20 p-1 rounded">
                <span className="text-yellow-400">WARNING:</span> This content may contain misinformation.
              </div>
              <div className="text-cyan-400 mt-4">AI Confidence: 94.2%</div>
            </div>
          </Html>

          <Text
            position={[0, -0.9, 0.01]}
            fontSize={0.08}
            color="#4cc9f0"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Regular.json"
          >
            Hate Speech & Misinformation Detection
          </Text>
        </group>

        {/* Image content screen */}
        <group position={[0, 0, 0]} ref={(el) => (screensRef.current[1] = el)}>
          <mesh>
            <planeGeometry args={[2.5, 1.5]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>

          <Text
            position={[0, 0.5, 0.01]}
            fontSize={0.1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Regular.json"
            maxWidth={2}
          >
            Image Analysis
          </Text>

          <Html position={[0, 0, 0.01]} transform scale={0.15}>
            <div className="w-[400px] h-[200px] p-4 font-mono text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800 rounded p-2 h-[80px] flex items-center justify-center">
                  <div className="text-green-400 text-xs">✓ Safe Content</div>
                </div>
                <div className="bg-gray-800 rounded p-2 h-[80px] flex items-center justify-center">
                  <div className="text-red-400 text-xs">⚠ Harmful Content</div>
                </div>
                <div className="bg-gray-800 rounded p-2 h-[80px] flex items-center justify-center">
                  <div className="text-yellow-400 text-xs">⚠ Needs Review</div>
                </div>
                <div className="bg-gray-800 rounded p-2 h-[80px] flex items-center justify-center">
                  <div className="text-green-400 text-xs">✓ Safe Content</div>
                </div>
              </div>
              <div className="text-purple-400 mt-4">AI Confidence: 89.7%</div>
            </div>
          </Html>

          <Text
            position={[0, -0.9, 0.01]}
            fontSize={0.08}
            color="#7209b7"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Regular.json"
          >
            Visual Content Classification
          </Text>
        </group>

        {/* Video content screen */}
        <group position={[3, 0, 0]} ref={(el) => (screensRef.current[2] = el)}>
          <mesh>
            <planeGeometry args={[2.5, 1.5]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>

          <Text
            position={[0, 0.5, 0.01]}
            fontSize={0.1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Regular.json"
            maxWidth={2}
          >
            Video Analysis
          </Text>

          <Html position={[0, 0, 0.01]} transform scale={0.15}>
            <div className="w-[400px] h-[200px] p-4 font-mono text-sm">
              <div className="bg-gray-800 rounded p-2 h-[120px] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-xs">Video Content</div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "45%" }}></div>
                </div>
                <div className="absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded">LIVE</div>
                <div className="absolute bottom-8 left-2 bg-yellow-500/80 text-white text-xs px-2 py-1 rounded">
                  AI Scanning
                </div>
              </div>
              <div className="text-blue-400 mt-4">Frame-by-frame analysis in progress</div>
              <div className="text-xs text-gray-400 mt-1">Detecting: violence, explicit content, harmful speech</div>
            </div>
          </Html>

          <Text
            position={[0, -0.9, 0.01]}
            fontSize={0.08}
            color="#4361ee"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Regular.json"
          >
            Real-time Video Monitoring
          </Text>
        </group>
      </group>

      {/* AI Processing visualization */}
      <group position={[0, -2.5, 0]}>
        <mesh>
          <torusGeometry args={[1, 0.1, 16, 100]} />
          <meshStandardMaterial color="#4cc9f0" emissive="#4cc9f0" emissiveIntensity={0.5} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.1, 16, 100]} />
          <meshStandardMaterial color="#7209b7" emissive="#7209b7" emissiveIntensity={0.5} />
        </mesh>

        <Text
          position={[0, 0, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Bold.json"
        >
          AI Core
        </Text>
      </group>
    </group>
  )
}
