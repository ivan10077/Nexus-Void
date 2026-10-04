export interface Vector3Range {
  x: [number, number];
  y: [number, number];
  z: [number, number];
}

export interface SoundNode {
  id: string;
  position: [number, number, number];
  type: 'synth' | 'sampler' | 'effect' | 'master';
  properties: Record<string, any>;
  connections: string[]; // IDs of nodes this connects TO
  color?: string;
  name?: string;
}

export interface Soundscape {
  id: string;
  userId?: string;
  title: string;
  description: string;
  nodes: SoundNode[];
  createdAt?: string;
  updatedAt?: string;
  isPublic?: boolean;
}

export interface User {
  id: string;
  username: string;
  createdAt: string;
}
