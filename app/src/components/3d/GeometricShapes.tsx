import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface IcosahedronProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  floatSpeed?: number;
}

export function FloatingIcosahedron({
  position = [0, 0, 0],
  scale = 1,
  color = '#00f0ff',
  floatSpeed = 1,
}: IcosahedronProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
  }, [color]);

  const solidMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.1,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.2,
    });
  }, [color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.3, 0.3]}
    >
      <group position={position} scale={scale}>
        {/* Wireframe */}
        <mesh ref={meshRef} material={material}>
          <icosahedronGeometry args={[1, 1]} />
        </mesh>
        {/* Solid inner */}
        <mesh material={solidMaterial} scale={0.7}>
          <icosahedronGeometry args={[1, 0]} />
        </mesh>
      </group>
    </Float>
  );
}

interface TorusProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  floatSpeed?: number;
}

export function FloatingTorus({
  position = [0, 0, 0],
  scale = 1,
  color = '#8b5cf6',
  floatSpeed = 0.8,
}: TorusProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.3,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.9,
    });
  }, [color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.2}
      floatIntensity={0.4}
      floatingRange={[-0.25, 0.25]}
    >
      <mesh ref={meshRef} position={position} scale={scale} material={material}>
        <torusGeometry args={[1, 0.3, 16, 50]} />
      </mesh>
    </Float>
  );
}

interface SphereProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  floatSpeed?: number;
}

export function FloatingSphere({
  position = [0, 0, 0],
  scale = 1,
  color = '#00f0ff',
  floatSpeed = 1.2,
}: SphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.8,
    });
  }, [color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.2}
      floatIntensity={0.6}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={position} scale={scale} material={material}>
        <sphereGeometry args={[0.6, 32, 32]} />
      </mesh>
    </Float>
  );
}
