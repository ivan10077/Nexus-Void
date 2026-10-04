import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Particle mesh that responds to scroll/time
function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    const count = 500;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(Math.random() * 0.5 + 0.2);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.getElapsedTime() * 0.5;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < 500; i++) {
      dummy.position.x = Math.sin(t + i * 0.01) * 20 + Math.cos(t * 0.7 + i) * 5;
      dummy.position.y = Math.cos(t * 0.8 + i * 0.02) * 20;
      dummy.position.z = Math.sin(t * 0.6 + i * 0.03) * 20 + Math.cos(t + i * 0.1) * 5;

      dummy.scale.setScalar(
        Math.sin(t * 1.5 + i * 0.05) * 0.3 + 0.4
      );

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial(), 500]}>
      <instancedBufferGeometry>
        <sphereGeometry args={[0.1, 8, 8]} />
      </instancedBufferGeometry>
      <meshBasicMaterial color="#33ccff" fog={false} />
    </instancedMesh>
  );
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
      <color attach="background" args={['#000000']} />
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0.2} fade speed={0.5} />
      <ParticleField />
      <ambientLight intensity={0.1} />
    </Canvas>
  );
}

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-black relative">
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>

      <motion.div
        className="text-center space-y-8 z-10 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="space-y-2">
          <motion.h1
            className="text-7xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            NEXUS VOID
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-cyan-300/60 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Create. Connect. Compose.
          </motion.p>
        </div>

        <motion.p
          className="max-w-lg mx-auto text-base text-white/40 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Step into an interactive 3D universe of sound. Build modular audio experiences by connecting glowing nodes in infinite space. No experience necessary—just curiosity.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center pt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            onClick={() => navigate('/studio')}
            className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 shadow-lg shadow-cyan-500/20"
          >
            Enter Studio
          </button>
          <button
            onClick={() => navigate('/gallery')}
            className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            Explore Gallery
          </button>
        </motion.div>

        <motion.div
          className="pt-12 text-xs text-white/20 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>🎧 Make sound by connecting nodes</p>
          <p>💾 Save and share your creations</p>
          <p>🌌 Explore infinite possibilities</p>
        </motion.div>
      </motion.div>

      {/* Animated background gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(51, 204, 255, 0.05) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
