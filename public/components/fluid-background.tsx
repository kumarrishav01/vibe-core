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

  // Noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = vUv * 2.0 - 1.0; // Convert to -1 to 1 range
    vec2 mouse = uMouse * 2.0 - 1.0;
    
    // Create multiple octagon layers
    float octagon1 = octagon(st, 0.8);
    float octagon2 = octagon(st * 1.2 + vec2(sin(uTime * 0.3), cos(uTime * 0.2)) * 0.1, 0.6);
    float octagon3 = octagon(st * 0.8 + vec2(cos(uTime * 0.4), sin(uTime * 0.3)) * 0.15, 1.0);
    
    // Add noise for organic feel
    float noise1 = snoise(st * 2.0 + uTime * 0.1) * 0.1;
    float noise2 = snoise(st * 4.0 - uTime * 0.15) * 0.05;
    
    // Combine octagons with noise
    float combinedShape = min(min(octagon1, octagon2), octagon3) + noise1 + noise2;
    
    // Mouse interaction
    float mouseInfluence = 1.0 - length(st - mouse) * 0.8;
    mouseInfluence = max(0.0, mouseInfluence);
    combinedShape += mouseInfluence * 0.2;
    
    // Create smooth edges
    float alpha = 1.0 - smoothstep(-0.02, 0.02, combinedShape);
    
    // Color gradient based on distance from center and time
    float distFromCenter = length(st);
    vec3 color1 = vec3(0.1, 0.05, 0.3); // Dark purple
    vec3 color2 = vec3(0.2, 0.1, 0.5);  // Medium purple
    vec3 color3 = vec3(0.4, 0.2, 0.8);  // Bright purple
    vec3 color4 = vec3(0.6, 0.3, 1.0);  // Light purple
    
    // Animate colors
    float colorMix = sin(uTime * 0.5 + distFromCenter * 3.0) * 0.5 + 0.5;
    vec3 baseColor = mix(color1, color2, colorMix);
    baseColor = mix(baseColor, color3, mouseInfluence);
    
    // Add rim lighting
    float rim = 1.0 - smoothstep(-0.1, 0.0, combinedShape);
    baseColor += color4 * rim * 0.3;
    
    // Pulsing effect
    float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
    baseColor *= pulse;
    
    gl_FragColor = vec4(baseColor, alpha * 0.9);
  }
`

export default function FluidBackground() {
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
    <mesh ref={meshRef} position={[0, 0, -3]} scale={[12, 12, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent />
    </mesh>
  )
}
