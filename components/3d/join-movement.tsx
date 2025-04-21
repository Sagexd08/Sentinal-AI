"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import { MathUtils } from "three"
import { Button } from "@/components/ui/button"

export default function JoinMovement({ scroll }) {
  const groupRef = useRef()
  const tokensRef = useRef([])

  useFrame((state) => {
    if (groupRef.current) {
      const scrollOffset = scroll.offset
      const sectionStart = 7 / 8
      const sectionEnd = 8 / 8

      // Calculate section progress (0 to 1)
      const sectionProgress = MathUtils.clamp((scrollOffset - sectionStart) / (sectionEnd - sectionStart), 0, 1)

      // Animate section in and out
      if (sectionProgress > 0 && sectionProgress < 1) {
        // Fade in
        groupRef.current.position.z = MathUtils.lerp(20, 0, Math.min(sectionProgress * 2, 1))
      } else {
        // Hide when out of view
        groupRef.current.position.z = 20
      }

      // Animate tokens
      tokensRef.current.forEach((token, i) => {
        if (token) {
          // Floating animation
          token.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2

          // Rotation
          token.rotation.y += 0.01
          token.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.1
        }
      })
    }
  })

  // Create floating tokens
  const tokenCount = 8
  const tokens = Array(tokenCount)
    .fill()
    .map((_, i) => {
      const angle = (i / tokenCount) * Math.PI * 2
      const radius = 3 + Math.random() * 1.5
      return {
        id: i,
        x: Math.sin(angle) * radius,
        y: Math.random() * 4 - 2,
        z: Math.cos(angle) * radius,
        color: i % 3 === 0 ? "#4cc9f0" : i % 3 === 1 ? "#7209b7" : "#4361ee",
        scale: 0.3 + Math.random() * 0.3,
      }
    })

  return (
    <group ref={groupRef} position={[0, 0, 20]}>
      <Text
        position={[0, 2, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist_Bold.json"
      >
        Join the Movement
      </Text>

      <Text
        position={[0, 1.2, 0]}
        fontSize={0.25}
        color="#a5a5a5"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist_Regular.json"
        maxWidth={8}
        textAlign="center"
      >
        Shape the future of online safety
      </Text>

      {/* Floating tokens */}
      {tokens.map((token, i) => (
        <mesh
          key={token.id}
          position={[token.x, token.y, token.z]}
          scale={[token.scale, token.scale, token.scale]}
          ref={(el) => (tokensRef.current[i] = el)}
        >
          <cylinderGeometry args={[1, 1, 0.2, 32]} />
          <meshStandardMaterial color={token.color} emissive={token.color} emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Central portal */}
      <group position={[0, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.1, 16, 100]} />
          <meshStandardMaterial color="#7209b7" emissive="#7209b7" emissiveIntensity={0.8} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.5, 32]} />
          <meshStandardMaterial color="#4cc9f0" emissive="#4cc9f0" emissiveIntensity={0.5} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Call to action */}
      <Html position={[0, -1.5, 0]} transform>
        <div className="text-center">
          <p className="text-gray-300 mb-4 max-w-md">
            Join our community of developers, moderators, and users building a safer internet through AI and Web3
            technologies.
          </p>

          <div className="flex space-x-4 justify-center">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-purple-900/30">
              Get Started
            </Button>

            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-900/20 px-6 py-2 rounded-full font-medium"
            >
              Learn More
            </Button>
          </div>
        </div>
      </Html>

      {/* Social proof */}
      <Html position={[0, -3, 0]} transform scale={0.15}>
        <div className="w-[800px] font-sans">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-900/80 p-4 rounded-lg border border-cyan-500/30">
              <div className="text-cyan-400 font-bold mb-2">Developers</div>
              <div className="text-3xl font-bold text-white">1,200+</div>
              <p className="text-gray-400 text-sm mt-1">Contributing to our open-source ecosystem</p>
            </div>

            <div className="bg-gray-900/80 p-4 rounded-lg border border-purple-500/30">
              <div className="text-purple-400 font-bold mb-2">Communities</div>
              <div className="text-3xl font-bold text-white">350+</div>
              <p className="text-gray-400 text-sm mt-1">Using our moderation tools</p>
            </div>

            <div className="bg-gray-900/80 p-4 rounded-lg border border-blue-500/30">
              <div className="text-blue-400 font-bold mb-2">Content</div>
              <div className="text-3xl font-bold text-white">10M+</div>
              <p className="text-gray-400 text-sm mt-1">Pieces of content moderated daily</p>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}
