"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { MathUtils, Group, Mesh, Vector3 } from "three"

export default function SimpleGlobe() {
  const globeRef = useRef<Group>(null)
  const dotsRef = useRef<Mesh[]>([])
  const meteoroidsRef = useRef<Mesh[]>([])

  // Create dots around the globe
  const dots = useMemo(() => {
    const temp = []
    const count = 200

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi

      const x = 4 * Math.cos(theta) * Math.sin(phi)
      const y = 4 * Math.sin(theta) * Math.sin(phi)
      const z = 4 * Math.cos(phi)

      temp.push({ position: [x, y, z], size: Math.random() * 0.05 + 0.02 })
    }

    return temp
  }, [])

  // Create meteoroids
  const meteoroids = useMemo(() => {
    const temp = []
    const count = 20

    for (let i = 0; i < count; i++) {
      const position = new Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      )
      const velocity = new Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      )
      temp.push({ position, velocity, size: Math.random() * 0.08 + 0.02 })
    }
    return temp
  }, [])

  // Animate globe rotation
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1
    }

    // Animate dots
    dotsRef.current.forEach((dot, i) => {
      if (dot) {
        const time = state.clock.elapsedTime
        const offset = i * 0.01
        dot.scale.setScalar(MathUtils.lerp(0.8, 1.2, (Math.sin(time + offset) + 1) / 2))
      }
    })

    // Animate meteoroids
    meteoroidsRef.current.forEach((meteoroid, i) => {
      if (meteoroid) {
        const pos = meteoroid.position
        const vel = meteoroids[i].velocity

        pos.add(vel)

        // Reset position when out of bounds
        if (pos.length() > 20) {
          pos.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40
          )
        }

        // Add slight rotation for effect
        meteoroid.rotation.x += delta * 0.5
        meteoroid.rotation.z += delta * 0.3
      }
    })
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Meteoroids */}
      {meteoroids.map((meteoroid, i) => (
        <group key={`meteoroid-${i}`}>
          {/* Meteoroid core */}
          <mesh
            position={meteoroid.position}
            ref={(el) => (meteoroidsRef.current[i] = el as Mesh)}
          >
            <octahedronGeometry args={[meteoroid.size, 0]} />
            <meshStandardMaterial
              color="#f72585"
              emissive="#f72585"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
          {/* Meteoroid trail */}
          <mesh position={meteoroid.position}>
            <cylinderGeometry args={[0, meteoroid.size / 2, meteoroid.size * 4, 8]} />
            <meshBasicMaterial
              color="#f72585"
              transparent
              opacity={0.2}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}

      <group ref={globeRef}>
        {/* Globe wireframe with increased visibility */}
        <mesh>
          <sphereGeometry args={[4, 64, 32]} />
          <meshStandardMaterial
            color="#1a1a2e"
            wireframe
            emissive="#0f3460"
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Dots with improved visibility */}
        {dots.map((dot, i) => (
          <mesh key={i} position={dot.position} ref={(el) => (dotsRef.current[i] = el as Mesh)}>
            <sphereGeometry args={[dot.size, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#4cc9f0" : "#7209b7"}
              emissive={i % 2 === 0 ? "#4cc9f0" : "#7209b7"}
              emissiveIntensity={1.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
