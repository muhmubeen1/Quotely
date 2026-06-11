import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingBookProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  floatSpeed?: number;
  rotationSpeed?: number;
}

export function FloatingBook({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = '#00f0ff',
  floatSpeed = 1,
  rotationSpeed = 0.5,
}: FloatingBookProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bookRef = useRef<THREE.Mesh>(null);

  const bookMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.2,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.9,
    });
  }, [color]);

  const pageMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: color,
      emissiveIntensity: 0.1,
      roughness: 0.8,
      metalness: 0.1,
    });
  }, [color]);

  useFrame((state) => {
    if (bookRef.current) {
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.1;
    }
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.2, 0.2]}
    >
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Book cover - front */}
        <mesh position={[0, 0, 0.05]} material={bookMaterial}>
          <boxGeometry args={[1.4, 2, 0.05]} />
        </mesh>
        
        {/* Book cover - back */}
        <mesh position={[0, 0, -0.05]} material={bookMaterial}>
          <boxGeometry args={[1.4, 2, 0.05]} />
        </mesh>
        
        {/* Spine */}
        <mesh position={[-0.7, 0, 0]} material={bookMaterial}>
          <boxGeometry args={[0.1, 2, 0.15]} />
        </mesh>
        
        {/* Pages */}
        <mesh position={[0.05, 0, 0]} material={pageMaterial}>
          <boxGeometry args={[1.25, 1.9, 0.08]} />
        </mesh>
        
        {/* Decorative lines on cover */}
        <mesh position={[0, 0.3, 0.08]}>
          <boxGeometry args={[0.8, 0.03, 0.01]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, 0.1, 0.08]}>
          <boxGeometry args={[0.6, 0.02, 0.01]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}
