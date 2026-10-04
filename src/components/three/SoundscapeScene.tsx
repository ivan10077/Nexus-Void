import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

import { useSoundscapeStore } from '../../stores/useSoundscapeStore';
import { engine } from '../../audio/AudioEngine';
import { NodeVisual } from './NodeVisual';
import { Connections } from './Connections';

// A dynamic background taking cues from the audio graph
function Nebula() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[30, 64, 64]} />
      <meshBasicMaterial 
        color="#050510" 
        side={THREE.BackSide}
        fog={true}
      />
    </mesh>
  );
}

export function SoundscapeScene() {
  const currentSoundscape = useSoundscapeStore(s => s.currentSoundscape);
  
  useEffect(() => {
    if (currentSoundscape) {
      engine.syncGraph(currentSoundscape.nodes);
    }
  }, [currentSoundscape]);

  if (!currentSoundscape) return null;

  return (
    <div className="w-full h-full bg-black">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <color attach="background" args={['#020205']} />
        <fog attach="fog" args={['#020205', 5, 30]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        
        <Nebula />
        <Stars radius={20} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

        <group position={[0, -1, 0]}>
          {currentSoundscape.nodes.map(node => (
            <NodeVisual key={node.id} node={node} />
          ))}
          <Connections nodes={currentSoundscape.nodes} />
        </group>

        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={20}
          minDistance={2}
          dampingFactor={0.05}
        />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
