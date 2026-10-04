import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { SoundNode, Soundscape } from '../types';

interface SoundscapeState {
  currentSoundscape: Soundscape | null;
  isPlaying: boolean;
  selectedNodeId: string | null;
  
  // Actions
  initializeNew: () => void;
  loadSoundscape: (soundscape: Soundscape) => void;
  togglePlayback: () => void;
  selectNode: (id: string | null) => void;
  
  // Node manipulation
  addNode: (type: SoundNode['type'], position?: [number, number, number]) => void;
  updateNodePosition: (id: string, position: [number, number, number]) => void;
  updateNodeProperties: (id: string, properties: any) => void;
  removeNode: (id: string) => void;
  connectNodes: (sourceId: string, targetId: string) => void;
  disconnectNodes: (sourceId: string, targetId: string) => void;
}

export const useSoundscapeStore = create<SoundscapeState>((set) => ({
  currentSoundscape: null,
  isPlaying: false,
  selectedNodeId: null,

  initializeNew: () => {
    set({
      currentSoundscape: {
        id: uuidv4(),
        title: 'Untitled Nebula',
        description: '',
        nodes: [
          {
            id: 'master-out',
            type: 'master',
            position: [0, 0, 0],
            properties: { volume: 0.8 },
            connections: [],
            name: 'Master Output',
            color: '#fffff'
          }
        ]
      },
      selectedNodeId: null
    });
  },

  loadSoundscape: (soundscape) => {
    // In a real app we'd need to clear audio graph here
    set({ currentSoundscape: soundscape, selectedNodeId: null, isPlaying: false });
  },

  togglePlayback: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  selectNode: (id) => {
    set({ selectedNodeId: id });
  },

  addNode: (type, position = [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * -2 - 1]) => {
    set((state) => {
      if (!state.currentSoundscape) return state;
      
      let color = '#ffffff';
      if (type === 'synth') color = '#ff3366';
      if (type === 'sampler') color = '#33ccff';
      if (type === 'effect') color = '#cc33ff';
      
      const newNode: SoundNode = {
        id: uuidv4(),
        type,
        position,
        properties: {},
        connections: [],
        color
      };

      // Set some sensible default properties based on type
      if (type === 'synth') {
        newNode.properties = { oscillator: 'sine', attack: 0.1, release: 1 };
      } else if (type === 'effect') {
        newNode.properties = { type: 'reverb', mix: 0.5 };
      }

      return {
        currentSoundscape: {
          ...state.currentSoundscape,
          nodes: [...state.currentSoundscape.nodes, newNode]
        }
      };
    });
  },

  updateNodePosition: (id, position) => {
    set((state) => {
      if (!state.currentSoundscape) return state;
      return {
        currentSoundscape: {
          ...state.currentSoundscape,
          nodes: state.currentSoundscape.nodes.map(n => 
            n.id === id ? { ...n, position } : n
          )
        }
      };
    });
  },

  updateNodeProperties: (id, properties) => {
    set((state) => {
      if (!state.currentSoundscape) return state;
      return {
        currentSoundscape: {
          ...state.currentSoundscape,
          nodes: state.currentSoundscape.nodes.map(n => 
            n.id === id ? { ...n, properties: { ...n.properties, ...properties } } : n
          )
        }
      };
    });
  },

  removeNode: (id) => {
    if (id === 'master-out') return; // Can't remove master
    
    set((state) => {
      if (!state.currentSoundscape) return state;
      
      const newNodes = state.currentSoundscape.nodes.filter(n => n.id !== id);
      
      // Also remove all connections leading TO this node
      const updatedNodes = newNodes.map(node => ({
        ...node,
        connections: node.connections.filter(cId => cId !== id)
      }));

      return {
        currentSoundscape: {
          ...state.currentSoundscape,
          nodes: updatedNodes
        },
        selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId
      };
    });
  },

  connectNodes: (sourceId, targetId) => {
    set((state) => {
      if (!state.currentSoundscape) return state;
      if (sourceId === targetId) return state;
      
      // Basic validation: target shouldn't connect to source (prevent loops, simple check)
      const targetNode = state.currentSoundscape.nodes.find(n => n.id === targetId);
      if (targetNode?.connections.includes(sourceId)) return state;

      return {
        currentSoundscape: {
          ...state.currentSoundscape,
          nodes: state.currentSoundscape.nodes.map(n => {
            if (n.id === sourceId) {
              if (n.connections.includes(targetId)) return n;
              return { ...n, connections: [...n.connections, targetId] };
            }
            return n;
          })
        }
      };
    });
  },

  disconnectNodes: (sourceId, targetId) => {
    set((state) => {
      if (!state.currentSoundscape) return state;
      
      return {
        currentSoundscape: {
          ...state.currentSoundscape,
          nodes: state.currentSoundscape.nodes.map(n => {
            if (n.id === sourceId) {
              return { ...n, connections: n.connections.filter(id => id !== targetId) };
            }
            return n;
          })
        }
      };
    });
  }
}));
