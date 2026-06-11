import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { FloatingBook } from './FloatingBook';
import { QuoteSymbol } from './QuoteSymbol';
import { FloatingIcosahedron, FloatingTorus, FloatingSphere } from './GeometricShapes';

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle parallax based on mouse position
      const mouseX = (state.mouse.x * 0.1);
      const mouseY = (state.mouse.y * 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.02);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY, 0.02);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Neon blue point light */}
      <pointLight 
        position={[5, 5, 5]} 
        intensity={1} 
        color="#00f0ff"
        distance={20}
        decay={2}
      />
      
      {/* Purple accent light */}
      <pointLight 
        position={[-5, -3, 3]} 
        intensity={0.6} 
        color="#8b5cf6"
        distance={15}
        decay={2}
      />
      
      {/* Rim light */}
      <spotLight
        position={[0, 10, -5]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#ffffff"
      />

      {/* Floating Books */}
      <FloatingBook
        position={[-3, 1, -2]}
        rotation={[0.2, 0.5, -0.1]}
        scale={0.8}
        color="#00f0ff"
        floatSpeed={0.8}
        rotationSpeed={0.3}
      />
      
      <FloatingBook
        position={[3.5, -0.5, -3]}
        rotation={[-0.1, -0.3, 0.1]}
        scale={0.6}
        color="#8b5cf6"
        floatSpeed={1}
        rotationSpeed={0.4}
      />

      {/* Quote Symbols */}
      <QuoteSymbol
        position={[-2, 2.5, 0]}
        rotation={[0, 0.3, -0.2]}
        scale={0.8}
        color="#00f0ff"
        floatSpeed={1.2}
      />
      
      <QuoteSymbol
        position={[2.5, 2, -1]}
        rotation={[0, -0.2, 0.2]}
        scale={0.7}
        color="#8b5cf6"
        floatSpeed={1}
      />

      {/* Geometric Shapes */}
      <FloatingIcosahedron
        position={[4, 2, -2]}
        scale={0.5}
        color="#00f0ff"
        floatSpeed={0.9}
      />
      
      <FloatingTorus
        position={[-4, -1.5, -1]}
        scale={0.4}
        color="#8b5cf6"
        floatSpeed={0.7}
      />
      
      <FloatingSphere
        position={[0, -2.5, -2]}
        scale={0.5}
        color="#00f0ff"
        floatSpeed={1.1}
      />

      {/* Stars background */}
      <Stars
        radius={50}
        depth={50}
        count={200}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
    </group>
  );
}

interface Scene3DProps {
  className?: string;
}

export function Scene3D({ className }: Scene3DProps) {
  return (
    <div className={`${className} bg-transparent`}>
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
          <SceneContent />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.3}
            autoRotate
            autoRotateSpeed={0.2}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
