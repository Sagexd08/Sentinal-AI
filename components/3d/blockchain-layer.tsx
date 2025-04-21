"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import { MathUtils } from "three"

export default function BlockchainLayer({ scroll }) {
  const groupRef = useRef()
  const blocksRef = useRef([])

  useFrame((state) => {
    if (groupRef.current) {
      const scrollOffset = scroll.offset
      const sectionStart = 3 / 8
      const sectionEnd = 4 / 8

      // Calculate section progress (0 to 1)
      const sectionProgress = MathUtils.clamp((scrollOffset - sectionStart) / (sectionEnd - sectionStart), 0, 1)

      // Animate section in and out
      if (sectionProgress > 0 && sectionProgress < 1) {
        // Fade in
        groupRef.current.position.z = MathUtils.lerp(20, 0, Math.min(sectionProgress * 2, 1))

        // Fade out
        if (sectionProgress > 0.8) {
          groupRef.current.position.z = MathUtils.lerp(0, -20, (sectionProgress - 0.8) * 5)
        }
      } else {
        // Hide when out of view
        groupRef.current.position.z = 20
      }

      // Animate blockchain blocks
      blocksRef.current.forEach((block, i) => {
        if (block) {
          // Subtle floating animation
          block.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.5) * 0.05

          // Subtle rotation
          block.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + i * 0.5) * 0.05
        }
      })
    }
  })

  // Create blockchain blocks
  const blocks = Array(7)
    .fill()
    .map((_, i) => ({
      id: i,
      x: -3 + i,
      y: 0,
      z: 0,
      color: i % 2 === 0 ? "#4361ee" : "#7209b7",
    }))

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
        Blockchain Transparency
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
        Immutable record of moderation decisions
      </Text>

      {/* Blockchain visualization */}
      <group position={[0, 0, 0]}>
        {blocks.map((block, i) => (
          <group key={block.id} position={[block.x, block.y, block.z]} ref={(el) => (blocksRef.current[i] = el)}>
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial color={block.color} emissive={block.color} emissiveIntensity={0.2} />
            </mesh>

            {/* Connection line to next block */}
            {i < blocks.length - 1 && (
              <line>
                <bufferGeometry attach="geometry">
                  <bufferAttribute
                    attachObject={["attributes", "position"]}
                    count={2}
                    array={new Float32Array([0.4, 0, 0, 0.6, 0, 0])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial attach="material" color="#4cc9f0" linewidth={2} />
              </line>
            )}
          </group>
        ))}
      </group>

      {/* Blockchain ledger details */}
      <Html position={[0, -1.5, 0]} transform scale={0.2}>
        <div className="w-[800px] font-mono bg-gray-900/80 p-6 rounded-lg border border-blue-500/30">
          <div className="text-blue-400 font-bold mb-4">Moderation Ledger</div>

          <div className="space-y-3">
            <div className="bg-gray-800/80 p-3 rounded border border-gray-700 flex">
              <div className="text-purple-400 mr-4">Block #4928</div>
              <div className="text-gray-300">
                Content ID: <span className="text-cyan-400">0x7a2b...</span>
              </div>
              <div className="ml-auto text-green-400">Verified ✓</div>
            </div>

            <div className="bg-gray-800/80 p-3 rounded border border-gray-700 flex">
              <div className="text-purple-400 mr-4">Block #4927</div>
              <div className="text-gray-300">
                Content ID: <span className="text-cyan-400">0x3f1c...</span>
              </div>
              <div className="ml-auto text-green-400">Verified ✓</div>
            </div>

            <div className="bg-gray-800/80 p-3 rounded border border-gray-700 flex">
              <div className="text-purple-400 mr-4">Block #4926</div>
              <div className="text-gray-300">
                Content ID: <span className="text-cyan-400">0x9e5d...</span>
              </div>
              <div className="ml-auto text-green-400">Verified ✓</div>
            </div>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            All moderation decisions are permanently recorded on the blockchain, ensuring transparency and
            accountability.
          </div>

          <div className="mt-4 flex space-x-3">
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">View Full Ledger</button>
            <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm">Verify Decision</button>
          </div>
        </div>
      </Html>

      {/* Key features */}
      <group position={[0, 1, -2]}>
        <Text
          position={[-3, 0, 0]}
          fontSize={0.15}
          color="#4cc9f0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
          maxWidth={1.5}
          textAlign="center"
        >
          Immutable Records
        </Text>

        <Text
          position={[0, 0, 0]}
          fontSize={0.15}
          color="#7209b7"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
          maxWidth={1.5}
          textAlign="center"
        >
          Public Verification
        </Text>

        <Text
          position={[3, 0, 0]}
          fontSize={0.15}
          color="#4361ee"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
          maxWidth={1.5}
          textAlign="center"
        >
          Smart Contracts
        </Text>
      </group>
    </group>
  )
}
