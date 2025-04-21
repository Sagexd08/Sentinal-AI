"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import { MathUtils } from "three"

export default function LearningLoop({ scroll }) {
  const groupRef = useRef()
  const circleRef = useRef()
  const nodesRef = useRef([])

  useFrame((state) => {
    if (groupRef.current) {
      const scrollOffset = scroll.offset
      const sectionStart = 6 / 8
      const sectionEnd = 7 / 8

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

      // Rotate circle
      if (circleRef.current) {
        circleRef.current.rotation.z += 0.002
      }

      // Animate nodes
      nodesRef.current.forEach((node, i) => {
        if (node) {
          // Pulse effect
          const scale = 0.8 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1
          node.scale.set(scale, scale, scale)
        }
      })
    }
  })

  // Create nodes for the learning loop
  const nodeCount = 6
  const radius = 2
  const nodes = Array(nodeCount)
    .fill()
    .map((_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2
      return {
        id: i,
        x: Math.sin(angle) * radius,
        y: Math.cos(angle) * radius,
        color: i % 3 === 0 ? "#4cc9f0" : i % 3 === 1 ? "#7209b7" : "#4361ee",
        label: [
          "Content Detection",
          "User Feedback",
          "Model Training",
          "Policy Updates",
          "Implementation",
          "Verification",
        ][i],
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
        Continuous Learning
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
        Adaptive intelligence through feedback loops
      </Text>

      {/* Learning loop visualization */}
      <group position={[0, 0, 0]} ref={circleRef}>
        {/* Circle path */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.03, 16, 100]} />
          <meshStandardMaterial color="#4361ee" emissive="#4361ee" emissiveIntensity={0.5} />
        </mesh>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <group key={node.id} position={[node.x, node.y, 0]} ref={(el) => (nodesRef.current[i] = el)}>
            <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.5} />
            </mesh>

            <Text
              position={[node.x * 0.3, node.y * 0.3, 0]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Geist_Regular.json"
            >
              {node.label}
            </Text>
          </group>
        ))}

        {/* Directional arrows */}
        {nodes.map((node, i) => {
          const nextIndex = (i + 1) % nodes.length
          const nextNode = nodes[nextIndex]
          const midX = (node.x + nextNode.x) / 2
          const midY = (node.y + nextNode.y) / 2
          const angle = Math.atan2(nextNode.y - node.y, nextNode.x - node.x)

          return (
            <mesh key={`arrow-${i}`} position={[midX, midY, 0]} rotation={[0, 0, angle]}>
              <coneGeometry args={[0.1, 0.2, 8]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
            </mesh>
          )
        })}
      </group>

      {/* Learning metrics */}
      <Html position={[0, -2, 0]} transform scale={0.15}>
        <div className="w-[800px] font-sans bg-gray-900/80 p-6 rounded-lg border border-purple-500/30">
          <div className="text-purple-400 font-bold mb-4">System Learning Metrics</div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/80 p-3 rounded border border-gray-700">
              <div className="text-white font-medium">Detection Accuracy</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <div>Initial</div>
                  <div>Current</div>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    <div className="absolute left-[65%] top-0 bottom-0 w-0.5 bg-white"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <div className="text-blue-400">65%</div>
                  <div className="text-purple-400">92%</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 p-3 rounded border border-gray-700">
              <div className="text-white font-medium">False Positive Rate</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <div>Initial</div>
                  <div>Current</div>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-green-500 relative">
                    <div className="absolute left-[35%] top-0 bottom-0 w-0.5 bg-white"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-full" style={{ width: "8%" }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <div className="text-red-400">35%</div>
                  <div className="text-green-400">8%</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 p-3 rounded border border-gray-700">
              <div className="text-white font-medium">User Feedback</div>
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="text-gray-300 text-sm">Positive: 78%</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="text-gray-300 text-sm">Neutral: 15%</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="text-gray-300 text-sm">Negative: 7%</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/80 p-3 rounded border border-gray-700">
              <div className="text-white font-medium">Model Iterations</div>
              <div className="mt-2">
                <div className="text-3xl font-bold text-cyan-400">24</div>
                <div className="text-gray-400 text-sm">Major updates since launch</div>
                <div className="text-gray-400 text-xs mt-1">Last update: 3 days ago</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            Our system continuously improves through user feedback, new data, and policy updates, creating a virtuous
            cycle of enhanced moderation capabilities.
          </div>
        </div>
      </Html>
    </group>
  )
}
