import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import type { SoundNode } from '../../types';

export function Connections({ nodes }: { nodes: SoundNode[] }) {
  // Generate connection pairs
  const pairs = useMemo(() => {
    const list: { source: SoundNode, target: SoundNode }[] = [];
    nodes.forEach(source => {
      source.connections.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (target) list.push({ source, target });
      });
    });
    return list;
  }, [nodes]);

  // Animate dashed lines
  useFrame(() => {
    // Animation loop for connection effects
  });

  return (
    <>
      {pairs.map((pair, _) => {
        const start = new THREE.Vector3(...pair.source.position);
        const end = new THREE.Vector3(...pair.target.position);

        // Control point for a nice curve
        const midPoint = start.clone().lerp(end, 0.5);
        midPoint.y += start.distanceTo(end) * 0.2;

        return (
          <QuadraticBezierLine
            key={`conn-${pair.source.id}-${pair.target.id}`}
            start={start}
            end={end}
            mid={midPoint}
            color={pair.source.color || 'white'}
            lineWidth={2}
            dashed={true}
            dashScale={50}
            opacity={0.6}
            transparent
          />
        );
      })}
    </>
  );
}
