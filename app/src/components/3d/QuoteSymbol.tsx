import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface QuoteSymbolProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  floatSpeed?: number;
}

export function QuoteSymbol({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = '#00f0ff',
  floatSpeed = 1.5,
}: QuoteSymbolProps) {
  const symbolRef = useRef<THREE.Group>(null);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.95,
    });
  }, [color]);

  useFrame((state) => {
    if (symbolRef.current) {
      symbolRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  // Create quote mark shape
  const createQuoteShape = () => {
    const shape = new THREE.Shape();
    const width = 0.3;
    const height = 0.5;
    const thickness = 0.08;

    // Draw a stylized quote mark
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0, height, width, height, width, height * 0.6);
    shape.bezierCurveTo(width, height * 0.3, width * 0.5, height * 0.2, width * 0.3, 0);
    shape.lineTo(width * 0.3 + thickness, 0);
    shape.bezierCurveTo(width * 0.5 + thickness, height * 0.2, width + thickness, height * 0.3, width + thickness, height * 0.6);
    shape.bezierCurveTo(width + thickness, height * 1.1, 0, height * 1.1, 0, height * 0.4);
    shape.lineTo(0, 0);

    return shape;
  };

  const extrudeSettings = {
    steps: 2,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  };

  const shape = createQuoteShape();
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.4}
      floatIntensity={0.6}
      floatingRange={[-0.15, 0.15]}
    >
      <group 
        ref={symbolRef} 
        position={position} 
        rotation={rotation} 
        scale={scale}
      >
        <mesh geometry={geometry} material={material} />
        {/* Glow effect */}
        <mesh geometry={geometry} scale={1.1}>
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}
