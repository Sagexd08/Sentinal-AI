"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import { Vector3, MathUtils } from "three"
// Remove this import if it exists
import { Button } from "@/components/ui/button"

export default function Globe({ scroll }) {
  const globeRef = useRef()
  const nodesRef = useRef([])
  const linesRef = useRef([])

  // Create nodes around the globe
  const nodes = useMemo(() => {
    const temp = []
    const count = 20

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi

      const x = 3 * Math.cos(theta) * Math.sin(phi)
      const y = 3 * Math.sin(theta) * Math.sin(phi)
      const z = 3 * Math.cos(phi)

      temp.push(new Vector3(x, y, z))
    }

    return temp
  }, [])

  // Create connections between nodes
  const connections = useMemo(() => {
    const temp = []
    const threshold = 2.5

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < threshold) {
          temp.push({
            start: nodes[i],
            end: nodes[j],
          })
        }
      }
    }

    return temp
  }, [nodes])

  // Animate globe rotation
  useFrame((state, delta) => {
    if (globeRef.current) {
      const offset = scroll.offset

      // Rotate globe based on scroll position
      globeRef.current.rotation.y += delta * 0.1

      // Scale globe down as user scrolls away
      globeRef.current.scale.setScalar(MathUtils.lerp(1, 0.5, Math.min(offset * 2, 1)))

      // Move globe up as user scrolls
      globeRef.current.position.y = MathUtils.lerp(0, 5, Math.min(offset * 2, 1))
    }

    // Animate nodes
    nodesRef.current.forEach((node, i) => {
      if (node) {
        node.scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.2)
      }
    })
  })

  return (
    <group position={[0, 0, 0]}>
      <group ref={globeRef}>
        {/* Globe wireframe */}
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial color="#1a1a2e" wireframe emissive="#0f3460" emissiveIntensity={0.5} />
        </mesh>

        {/* Nodes */}
        {nodes.map((position, i) => (
          <mesh key={i} position={position} ref={(el) => (nodesRef.current[i] = el)}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#4cc9f0" : "#7209b7"}
              emissive={i % 2 === 0 ? "#4cc9f0" : "#7209b7"}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}

        {/* Connections */}
        {connections.map((connection, i) => (
          <line key={i} ref={(el) => (linesRef.current[i] = el)}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attachObject={["attributes", "position"]}
                count={2}
                array={
                  new Float32Array([
                    connection.start.x,
                    connection.start.y,
                    connection.start.z,
                    connection.end.x,
                    connection.end.y,
                    connection.end.z,
                  ])
                }
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color="#4361ee" opacity={0.4} transparent linewidth={1} />
          </line>
        ))}
      </group>

      {/* Title */}
      <group position={[0, 1.5, 0]}>
        <Text
          position={[0, 2, 0]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Bold.json"
        >
          AI Meets Web3
        </Text>

        <Text
          position={[0, 1.2, 0]}
          fontSize={0.3}
          color="#a5a5a5"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
          maxWidth={6}
          textAlign="center"
        >
          Rebuilding Trust Online
        </Text>
      </group>

      {/* Subtitle */}
      <group position={[0, -1.5, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.2}
          color="#a5a5a5"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
          maxWidth={8}
          textAlign="center"
        >
          An intelligent, transparent, and community-driven system to combat online harm at scale.
        </Text>

        <Html position={[0, -1, 0]} center transform>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-purple-900/30">
            Enter the Ecosystem
          </Button>
        </Html>
      </group>

      {/* Floating keywords */}
      <group>
        <Text
          position={[-4, 0.5, -2]}
          rotation={[0, 0.3, 0]}
          fontSize={0.25}
          color="#4cc9f0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
        >
          Real-Time AI Detection
        </Text>

        <Text
          position={[4, 0, -1]}
          rotation={[0, -0.3, 0]}
          fontSize={0.25}
          color="#7209b7"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
        >
          Transparency
        </Text>

        <Text
          position={[-3, -0.5, -2]}
          rotation={[0, 0.2, 0]}
          fontSize={0.25}
          color="#4361ee"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
        >
          Blockchain Governance
        </Text>

        <Text
          position={[3.5, -1, -1.5]}
          rotation={[0, -0.2, 0]}
          fontSize={0.25}
          color="#f72585"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist_Regular.json"
        >
          Community Moderation
        </Text>
      </group>
    </group>
  )
}
