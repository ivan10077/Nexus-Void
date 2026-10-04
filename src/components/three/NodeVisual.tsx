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

  // Basic floating animation
  useFrame(({ clock }) => {
    if (meshRef.current && node.id !== 'master-out') {
      meshRef.current.position.y += Math.sin(clock.elapsedTime * 2 + node.position[0]) * 0.002;
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

  return (
    <group position={node.position as [number, number, number]}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={node.color || '#ffffff'}
          emissive={node.color || '#ffffff'}
          emissiveIntensity={hovered ? 2 : isSelected ? 1 : 0.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={node.type === 'effect'}
        />
        {isSelected && <Outlines thickness={0.05} color="white" />}
      </mesh>

      {/* Node Label */}
      <Html position={[0, size + 0.2, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div className={`px-2 py-1 bg-black/80 backdrop-blur-md text-xs font-mono rounded border flex items-center gap-2 transition-all ${
          isSelected ? 'border-white text-white opacity-100 scale-110' : 'border-white/20 text-white/70 opacity-30 scale-100'
        }`}>
          {node.name || node.type}
        </div>
      </Html>
    </group>
  );
}
