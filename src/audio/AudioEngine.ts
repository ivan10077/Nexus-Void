import * as Tone from 'tone';
import type { SoundNode } from '../types';

class AudioEngine {
  private nodes: Map<string, Tone.ToneAudioNode> = new Map();
  private initialized = false;
  private loops: Tone.Loop[] = [];

  async init() {
    if (this.initialized) return;
    await Tone.start();
    this.initialized = true;
  }

  // Sync the tone.js graph with our state graph
  syncGraph(stateNodes: SoundNode[]) {
    // 1. Create or update nodes
    const currentStateNodeIds = new Set(stateNodes.map(n => n.id));
    
    // Remove deleted nodes
    for (const [id, toneNode] of this.nodes.entries()) {
      if (!currentStateNodeIds.has(id) && id !== 'master-out') {
        toneNode.dispose();
        this.nodes.delete(id);
      }
    }

    // Add or update nodes
    stateNodes.forEach(node => {
      let toneNode = this.nodes.get(node.id);
      
      if (!toneNode) {
        toneNode = this.createToneNode(node);
        if (toneNode) {
          this.nodes.set(node.id, toneNode);
        }
      } else {
        this.updateToneNode(toneNode, node);
      }
    });

    // 2. Sync connections
    this.applyConnections(stateNodes);
  }

  private createToneNode(node: SoundNode): Tone.ToneAudioNode | undefined {
    try {
      switch (node.type) {
        case 'master':
          return Tone.getDestination();
        case 'synth':
          const synth = new Tone.PolySynth(Tone.Synth);
          synth.set({
            oscillator: { type: node.properties.oscillator || 'sine' }
          });

          const loop = new Tone.Loop(time => {
            const notes = ["C4", "E4", "G4", "B4", "C5"];
            const note = notes[Math.floor(Math.random() * notes.length)];
            synth.triggerAttackRelease(note, "8n", time);
          }, "4n");

          loop.start(0);
          this.loops.push(loop);
          return synth;
        case 'effect':
          if (node.properties.type === 'reverb') {
            const reverb = new Tone.Reverb(4);
            reverb.wet.value = node.properties.mix !== undefined ? node.properties.mix : 0.5;
            return reverb;
          } else if (node.properties.type === 'delay') {
            const delay = new Tone.FeedbackDelay("8n", 0.5);
            delay.wet.value = node.properties.mix !== undefined ? node.properties.mix : 0.5;
            return delay;
          }
          return new Tone.Filter(2000, "lowpass");
        default:
          return undefined;
      }
    } catch (e) {
      console.error("Failed to create tone node for", node, e);
      return undefined;
    }
  }

  private updateToneNode(toneNode: Tone.ToneAudioNode, stateNode: SoundNode) {
    if (stateNode.type === 'synth') {
      const synth = toneNode as Tone.PolySynth;
      if (stateNode.properties.oscillator) {
        synth.set({ oscillator: { type: stateNode.properties.oscillator } });
      }
    } else if (stateNode.type === 'effect') {
      if (stateNode.properties.mix !== undefined && 'wet' in toneNode) {
        (toneNode as any).wet.value = stateNode.properties.mix;
      }
    }
  }

  private applyConnections(stateNodes: SoundNode[]) {
    // First disconnect all existing custom connections
    for (const [id, toneNode] of this.nodes.entries()) {
      if (id !== 'master-out') {
        try {
          toneNode.disconnect();
        } catch (e) {}
      }
    }

    // Reapply connections
    stateNodes.forEach(node => {
      const sourceToneNode = this.nodes.get(node.id);
      if (!sourceToneNode) return;

      node.connections.forEach(targetId => {
        const targetToneNode = this.nodes.get(targetId);
        if (targetToneNode) {
          try {
            sourceToneNode.connect(targetToneNode);
          } catch(e) {}
        }
      });
    });
  }

  start() {
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }
  
  dispose() {
    this.stop();
    this.loops.forEach(l => l.dispose());
    for (const [_, node] of this.nodes.entries()) {
      node.dispose();
    }
    this.nodes.clear();
  }
}

export const engine = new AudioEngine();
