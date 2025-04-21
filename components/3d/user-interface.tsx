"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import { MathUtils } from "three"

export default function UserInterface({ scroll }) {
  const groupRef = useRef()
  const browserRef = useRef()
  const mobileRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      const scrollOffset = scroll.offset
      const sectionStart = 2 / 8
      const sectionEnd = 3 / 8

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

      // Animate browser and mobile
      if (browserRef.current) {
        browserRef.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1
      }

      if (mobileRef.current) {
        mobileRef.current.rotation.y = Math.sin(Date.now() * 0.0005 + 1) * 0.1
      }
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
        User Empowerment
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
        Intuitive interfaces for content moderation
      </Text>

      {/* Browser Extension */}
      <group position={[-2.5, 0, 0]} ref={browserRef}>
        <mesh>
          <boxGeometry args={[4, 2.5, 0.1]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        {/* Browser header */}
        <mesh position={[0, 1.05, 0.06]}>
          <planeGeometry args={[3.9, 0.4]} />
          <meshStandardMaterial color="#0f0f1e" />
        </mesh>

        <Text
          position={[-1.7, 1.05, 0.07]}
          fontSize={0.15}
          color="#4cc9f0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Bold.json"
        >
          ModGuard
        </Text>

        <Html position={[0, 0, 0.06]} transform scale={0.2}>
          <div className="w-[500px] h-[300px] p-4 font-sans">
            <div className="bg-gray-900/80 p-4 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Content Alert</h3>
                <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded">Active</div>
              </div>

              <div className="space-y-3">
                <div className="bg-red-500/20 p-3 rounded-md border border-red-500/30">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-red-400 font-medium">Harmful Content Detected</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">
                    This page contains content that may violate community guidelines.
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-gray-700 text-white text-xs px-2 py-1 rounded">View Anyway</button>
                    <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Report</button>
                  </div>
                </div>

                <div className="bg-gray-800/80 p-3 rounded-md border border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">Protection Level</span>
                    <span className="text-cyan-400">High</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full mt-2">
                    <div className="w-3/4 h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div className="bg-gray-800/80 p-2 rounded-md border border-gray-700 flex-1">
                    <div className="text-xs text-gray-400">Blocked Today</div>
                    <div className="text-white font-bold">24</div>
                  </div>
                  <div className="bg-gray-800/80 p-2 rounded-md border border-gray-700 flex-1">
                    <div className="text-xs text-gray-400">Reports Sent</div>
                    <div className="text-white font-bold">7</div>
                  </div>
                  <div className="bg-gray-800/80 p-2 rounded-md border border-gray-700 flex-1">
                    <div className="text-xs text-gray-400">AI Confidence</div>
                    <div className="text-white font-bold">92%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Html>

        <Text
          position={[0, -1.5, 0]}
          fontSize={0.2}
          color="#4cc9f0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
        >
          Browser Extension
        </Text>
      </group>

      {/* Mobile App */}
      <group position={[2.5, 0, 0]} ref={mobileRef}>
        <mesh>
          <boxGeometry args={[2, 3.5, 0.1]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        {/* Phone notch */}
        <mesh position={[0, 1.65, 0.06]}>
          <boxGeometry args={[0.5, 0.15, 0.05]} />
          <meshStandardMaterial color="#0f0f1e" />
        </mesh>

        <Html position={[0, 0, 0.06]} transform scale={0.15}>
          <div className="w-[320px] h-[600px] font-sans">
            <div className="bg-gray-900 p-4 h-full rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">ModGuard</h3>
                <div className="bg-purple-600 w-3 h-3 rounded-full"></div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Feed Protection</span>
                    <div className="w-10 h-5 bg-purple-600 rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Message Filtering</span>
                    <div className="w-10 h-5 bg-purple-600 rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-white font-medium">Protection Level</span>
                  <div className="w-full h-2 bg-gray-700 rounded-full mt-2">
                    <div className="w-3/4 h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></div>
                  </div>
                </div>

                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-white font-medium">Recent Activity</span>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-gray-300">Blocked harmful message</span>
                      <span className="text-gray-500 text-xs ml-auto">2m ago</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-gray-300">Flagged suspicious link</span>
                      <span className="text-gray-500 text-xs ml-auto">15m ago</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-300">Protected image shared</span>
                      <span className="text-gray-500 text-xs ml-auto">1h ago</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-3 rounded-lg">
                  <span className="text-white font-medium">AI Learning</span>
                  <p className="text-white text-sm mt-1">Help improve moderation by providing feedback</p>
                  <button className="bg-white text-purple-600 text-sm px-3 py-1 rounded mt-2">Contribute</button>
                </div>
              </div>
            </div>
          </div>
        </Html>

        <Text
          position={[0, -2, 0]}
          fontSize={0.2}
          color="#7209b7"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
        >
          Mobile App
        </Text>
      </group>
    </group>
  )
}
