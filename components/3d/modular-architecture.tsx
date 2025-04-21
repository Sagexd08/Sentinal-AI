"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import { MathUtils } from "three"

export default function ModularArchitecture({ scroll }) {
  const groupRef = useRef()
  const layersRef = useRef([])

  useFrame((state) => {
    if (groupRef.current) {
      const scrollOffset = scroll.offset
      const sectionStart = 5 / 8
      const sectionEnd = 6 / 8

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

      // Animate layers
      layersRef.current.forEach((layer, i) => {
        if (layer) {
          // Subtle floating animation
          layer.position.y = Math.sin(state.clock.elapsedTime * 0.3 + i * 0.5) * 0.05

          // Subtle rotation
          layer.rotation.y = Math.sin(state.clock.elapsedTime * 0.1 + i * 0.5) * 0.05
        }
      })
    }
  })

  // Create architecture layers
  const layers = [
    { id: 0, y: 1, name: "Client Layer", color: "#4cc9f0", width: 4, height: 0.5 },
    { id: 1, y: 0, name: "Server Layer", color: "#7209b7", width: 5, height: 0.8 },
    { id: 2, y: -1, name: "Blockchain Layer", color: "#4361ee", width: 6, height: 0.5 },
  ]

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
        Modular Architecture
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
        Flexible, scalable system design
      </Text>

      {/* Architecture visualization */}
      <group position={[0, 0, 0]}>
        {layers.map((layer, i) => (
          <group key={layer.id} position={[0, layer.y, 0]} ref={(el) => (layersRef.current[i] = el)}>
            {/* Layer */}
            <mesh>
              <boxGeometry args={[layer.width, layer.height, 0.2]} />
              <meshStandardMaterial color={layer.color} emissive={layer.color} emissiveIntensity={0.3} />
            </mesh>

            <Text
              position={[0, 0, 0.15]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Geist_Bold.json"
            >
              {layer.name}
            </Text>

            {/* Connection lines between layers */}
            {i < layers.length - 1 && (
              <>
                <line>
                  <bufferGeometry attach="geometry">
                    <bufferAttribute
                      attachObject={["attributes", "position"]}
                      count={2}
                      array={new Float32Array([-0.5, -layer.height / 2, 0, -0.5, -0.5, 0])}
                      itemSize={3}
                    />
                  </bufferGeometry>
                  <lineBasicMaterial attach="material" color="#ffffff" opacity={0.5} transparent />
                </line>

                <line>
                  <bufferGeometry attach="geometry">
                    <bufferAttribute
                      attachObject={["attributes", "position"]}
                      count={2}
                      array={new Float32Array([0.5, -layer.height / 2, 0, 0.5, -0.5, 0])}
                      itemSize={3}
                    />
                  </bufferGeometry>
                  <lineBasicMaterial attach="material" color="#ffffff" opacity={0.5} transparent />
                </line>
              </>
            )}
          </group>
        ))}
      </group>

      {/* Architecture details */}
      <Html position={[0, -2.5, 0]} transform scale={0.15}>
        <div className="w-[1000px] font-sans bg-gray-900/80 p-6 rounded-lg border border-blue-500/30">
          <div className="text-blue-400 font-bold mb-4">System Architecture</div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-cyan-900/30 p-4 rounded border border-cyan-500/30">
              <div className="text-cyan-400 font-medium mb-2">Client Layer</div>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  Browser Extensions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  Mobile Applications
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  Platform Integrations
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                  User Interfaces
                </li>
              </ul>
            </div>

            <div className="bg-purple-900/30 p-4 rounded border border-purple-500/30">
              <div className="text-purple-400 font-medium mb-2">Server Layer</div>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  AI Processing Engine
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Content Analysis
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  API Services
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Data Management
                </li>
              </ul>
            </div>

            <div className="bg-blue-900/30 p-4 rounded border border-blue-500/30">
              <div className="text-blue-400 font-medium mb-2">Blockchain Layer</div>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Smart Contracts
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Governance DAO
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Transparency Ledger
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Token Economy
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            Our modular architecture allows for flexible deployment, easy scaling, and seamless integration with
            existing platforms and services.
          </div>
        </div>
      </Html>
    </group>
  )
}
