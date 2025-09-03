"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { type Mesh, type ShaderMaterial, Vector2 } from "three"

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Function to create octagon shape
  float octagon(vec2 p, float r) {
    const vec2 k = vec2(-0.9238795325, 0.3826834324); // cos(pi/8), sin(pi/8)
    p = abs(p);
    p -= 2.0 * min(dot(vec2(k.x, k.y), p), 0.0) * vec2(k.x, k.y);
    p -= 2.0 * min(dot(vec2(-k.x, k.y), p), 0.0) * vec2(-k.x, k.y);
    return length(p - vec2(clamp(p.x, -r * k.x, r * k.x), r)) * sign(p.y - r);
  }

  void main() {
    vec2 st = vUv * 2.0 - 1.0; // Convert to -1 to 1 range
    vec2 mouse = uMouse * 2.0 - 1.0;
    
    // Create main octagon
    float mainOctagon = octagon(st, 0.9);
    
    // Create inner octagon for border effect
    float innerOctagon = octagon(st, 0.85);
    
    // Create border by subtracting inner from outer
    float border = step(0.0, -mainOctagon) - step(0.0, -innerOctagon);
    
    // Mouse interaction - subtle glow
    float mouseInfluence = 1.0 - length(st - mouse) * 1.5;
    mouseInfluence = max(0.0, mouseInfluence) * 0.3;
    
    // Color scheme - deep space purple/blue
    vec3 backgroundColor = vec3(0.05, 0.05, 0.15); // Very dark blue
    vec3 borderColor = vec3(0.3, 0.1, 0.6); // Purple border
    vec3 glowColor = vec3(0.5, 0.2, 1.0); // Bright purple glow
    
    // Animate border color
    float pulse = sin(uTime * 1.5) * 0.3 + 0.7;
    borderColor *= pulse;
    
    // Combine colors
    vec3 finalColor = backgroundColor;
    finalColor = mix(finalColor, borderColor, border);
    finalColor += glowColor * mouseInfluence;
    
    // Add subtle gradient from center
    float distFromCenter = length(st);
    finalColor += vec3(0.1, 0.05, 0.2) * (1.0 - distFromCenter) * 0.3;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export default function OctagonBackground() {
  const meshRef = useRef<Mesh>(null)
  const { size, mouse } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2() },
      uResolution: { value: new Vector2(size.width, size.height) },
    }),
    [size],
  )

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
      material.uniforms.uMouse.value.set((mouse.x + 1) / 2, (mouse.y + 1) / 2)
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -4]} scale={[15, 15, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent />
    </mesh>
  )
}
