import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Outlines } from '@react-three/drei';
import * as THREE from 'three';
import type { SoundNode } from '../../types';
import { useSoundscapeStore } from '../../stores/useSoundscapeStore';

export function NodeVisual({ node }: { node: SoundNode }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const selectedNodeId = useSoundscapeStore(s => s.selectedNodeId);
  const selectNode = useSoundscapeStore(s => s.selectNode);

  const isSelected = selectedNodeId === node.id;

  // Enhanced floating animation with rotation
  useFrame(({ clock }) => {
    if (meshRef.current && node.id !== 'master-out') {
      meshRef.current.position.y += Math.sin(clock.elapsedTime * 2 + node.position[0]) * 0.002;
      meshRef.current.rotation.x += 0.0005;
      meshRef.current.rotation.z += 0.0003;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    selectNode(node.id);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
  };

  const size = node.type === 'master' ? 0.8 : node.type === 'synth' ? 0.5 : 0.4;
  const hoverScale = hovered ? 1.3 : 1;

  return (
    <group position={node.position as [number, number, number]}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        scale={hoverScale}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={node.color || '#ffffff'}
          emissive={node.color || '#ffffff'}
          emissiveIntensity={hovered ? 2.5 : isSelected ? 1.8 : 0.6}
          roughness={0.1}
          metalness={0.9}
          wireframe={node.type === 'effect'}
        />
        {isSelected && <Outlines thickness={0.08} color="white" />}
      </mesh>

      {/* Glow halo on hover or select */}
      {(hovered || isSelected) && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[size * 1.5, 32, 32]} />
          <meshBasicMaterial
            color={node.color || '#ffffff'}
            transparent
            opacity={0.15}
          />
        </mesh>
      )}

      {/* Node Label */}
      <Html position={[0, size + 0.3, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div
          className={`px-2 py-1 bg-black/90 backdrop-blur-md text-xs font-mono rounded border transition-all ${
            isSelected
              ? 'border-white text-white opacity-100 scale-110 shadow-lg'
              : hovered
              ? 'border-white/50 text-white/90 opacity-80 scale-105'
              : 'border-white/20 text-white/60 opacity-40 scale-100'
          }`}
          style={isSelected ? { boxShadow: '0 0 20px rgba(51, 204, 255, 0.5)' } : {}}
        >
          {node.name || node.type}
        </div>
      </Html>
    </group>
  );
}
