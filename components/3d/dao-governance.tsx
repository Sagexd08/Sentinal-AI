"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import { MathUtils } from "three"

export default function DaoGovernance({ scroll }) {
  const groupRef = useRef()
  const avatarsRef = useRef([])

  useFrame((state) => {
    if (groupRef.current) {
      const scrollOffset = scroll.offset
      const sectionStart = 4 / 8
      const sectionEnd = 5 / 8

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

      // Animate avatars
      avatarsRef.current.forEach((avatar, i) => {
        if (avatar) {
          // Subtle floating animation
          avatar.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.5) * 0.05

          // Subtle rotation
          avatar.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + i * 0.5) * 0.1
        }
      })
    }
  })

  // Create circular arrangement of avatars
  const avatarCount = 8
  const radius = 2.5
  const avatars = Array(avatarCount)
    .fill()
    .map((_, i) => {
      const angle = (i / avatarCount) * Math.PI * 2
      return {
        id: i,
        x: Math.sin(angle) * radius,
        z: Math.cos(angle) * radius,
        color: i % 3 === 0 ? "#4cc9f0" : i % 3 === 1 ? "#7209b7" : "#4361ee",
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
        DAO Governance
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
        Community-driven policy and decision making
      </Text>

      {/* DAO visualization */}
      <group position={[0, 0, 0]}>
        {/* Central governance hub */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.2, 32]} />
          <meshStandardMaterial color="#1a1a2e" emissive="#4361ee" emissiveIntensity={0.2} />
        </mesh>

        <Text
          position={[0, 0.2, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Bold.json"
        >
          DAO
        </Text>

        {/* Avatars in circle */}
        {avatars.map((avatar, i) => (
          <group
            key={avatar.id}
            position={[avatar.x, 0, avatar.z]}
            ref={(el) => (avatarsRef.current[i] = el)}
            lookAt={[0, 0, 0]}
          >
            {/* Avatar */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color={avatar.color} emissive={avatar.color} emissiveIntensity={0.3} />
            </mesh>

            {/* Connection line to center */}
            <line>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attachObject={["attributes", "position"]}
                  count={2}
                  array={new Float32Array([0, 0, 0, -avatar.x, 0, -avatar.z])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial attach="material" color={avatar.color} opacity={0.5} transparent />
            </line>
          </group>
        ))}
      </group>

      {/* Governance interface */}
      <Html position={[0, -2, 0]} transform scale={0.2}>
        <div className="w-[800px] font-sans bg-gray-900/80 p-6 rounded-lg border border-purple-500/30">
          <div className="text-purple-400 font-bold mb-4">Active Governance Proposals</div>

          <div className="space-y-3">
            <div className="bg-gray-800/80 p-3 rounded border border-gray-700">
              <div className="flex justify-between">
                <div className="text-white font-medium">Update Hate Speech Policy</div>
                <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Voting Active</div>
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Proposal to expand hate speech detection to include emerging coded language.
              </div>
              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">Votes: 1,245</div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500" style={{ width: "72%" }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <div>For: 72%</div>
                  <div>Against: 28%</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 p-3 rounded border border-gray-700">
              <div className="flex justify-between">
                <div className="text-white font-medium">Add New Content Category</div>
                <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">Discussion</div>
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Proposal to add new category for AI-generated misinformation.
              </div>
              <div className="mt-2">
                <div className="text-xs text-gray-500">Comments: 87</div>
              </div>
            </div>

            <div className="bg-gray-800/80 p-3 rounded border border-gray-700">
              <div className="flex justify-between">
                <div className="text-white font-medium">Adjust Appeal Process</div>
                <div className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">Drafting</div>
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Proposal to streamline the content moderation appeal process for users.
              </div>
              <div className="mt-2">
                <div className="text-xs text-gray-500">Contributors: 24</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex space-x-3">
            <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm">Submit Proposal</button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">View All Proposals</button>
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
          Token-Based Voting
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
          Policy Development
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
          Dispute Resolution
        </Text>
      </group>
    </group>
  )
}
