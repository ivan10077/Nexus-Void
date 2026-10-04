import type { Soundscape } from '../types';

export const SOUNDSCAPE_TEMPLATES: Soundscape[] = [
  {
    id: 'template-ambient-1',
    title: 'Ambient Dream',
    description: 'Ethereal pads with subtle reverb',
    nodes: [
      {
        id: 'synth-pad-1',
        type: 'synth',
        position: [-2, 1, -2],
        properties: { oscillator: 'sine', attack: 0.5, release: 2 },
        connections: ['effect-reverb-1'],
        name: 'Pad 1',
        color: '#33ccff'
      },
      {
        id: 'synth-pad-2',
        type: 'synth',
        position: [2, 1, -2],
        properties: { oscillator: 'sine', attack: 0.5, release: 2 },
        connections: ['effect-reverb-1'],
        name: 'Pad 2',
        color: '#cc33ff'
      },
      {
        id: 'effect-reverb-1',
        type: 'effect',
        position: [0, -1, -1],
        properties: { type: 'reverb', mix: 0.6 },
        connections: ['master-out'],
        name: 'Reverb',
        color: '#ffcc33'
      },
      {
        id: 'master-out',
        type: 'master',
        position: [0, 0, 0],
        properties: { volume: 0.8 },
        connections: [],
        name: 'Master Output',
        color: '#ffffff'
      }
    ]
  },
  {
    id: 'template-synthwave-1',
    title: 'Synthwave Vibes',
    description: 'Retro synth leads with delay',
    nodes: [
      {
        id: 'synth-lead-1',
        type: 'synth',
        position: [-2, 1, -2],
        properties: { oscillator: 'square', attack: 0.02, release: 0.8 },
        connections: ['effect-delay-1'],
        name: 'Lead',
        color: '#ff3366'
      },
      {
        id: 'synth-bass-1',
        type: 'synth',
        position: [2, -1, -2],
        properties: { oscillator: 'sawtooth', attack: 0.1, release: 1.5 },
        connections: ['effect-reverb-1'],
        name: 'Bass',
        color: '#3366ff'
      },
      {
        id: 'effect-delay-1',
        type: 'effect',
        position: [-1, 0, 0],
        properties: { type: 'delay', mix: 0.4 },
        connections: ['master-out'],
        name: 'Delay',
        color: '#ffcc33'
      },
      {
        id: 'effect-reverb-1',
        type: 'effect',
        position: [1, 0, 0],
        properties: { type: 'reverb', mix: 0.3 },
        connections: ['master-out'],
        name: 'Reverb',
        color: '#33ccff'
      },
      {
        id: 'master-out',
        type: 'master',
        position: [0, 0, 2],
        properties: { volume: 0.8 },
        connections: [],
        name: 'Master Output',
        color: '#ffffff'
      }
    ]
  },
  {
    id: 'template-minimal-1',
    title: 'Minimal Loop',
    description: 'Simple repeating pattern',
    nodes: [
      {
        id: 'synth-beep-1',
        type: 'synth',
        position: [0, 0, -2],
        properties: { oscillator: 'triangle', attack: 0.005, release: 0.2 },
        connections: ['master-out'],
        name: 'Beep',
        color: '#33ff99'
      },
      {
        id: 'master-out',
        type: 'master',
        position: [0, 0, 0],
        properties: { volume: 0.8 },
        connections: [],
        name: 'Master Output',
        color: '#ffffff'
      }
    ]
  }
];
