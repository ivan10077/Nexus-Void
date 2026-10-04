export const SYNTH_PRESETS = [
  {
    name: 'Warm Piano',
    oscillator: 'sine',
    attack: 0.05,
    decay: 0.2,
    sustain: 0.6,
    release: 1,
    description: 'Smooth, warm tones'
  },
  {
    name: 'Bright Lead',
    oscillator: 'square',
    attack: 0.01,
    decay: 0.1,
    sustain: 0.8,
    release: 0.5,
    description: 'Sharp, bright sound'
  },
  {
    name: 'Deep Bass',
    oscillator: 'sawtooth',
    attack: 0.1,
    decay: 0.3,
    sustain: 0.4,
    release: 1.5,
    description: 'Rich, resonant bass'
  },
  {
    name: 'Digital Beep',
    oscillator: 'triangle',
    attack: 0.005,
    decay: 0.08,
    sustain: 0,
    release: 0.2,
    description: 'Crisp, digital tones'
  },
  {
    name: 'Ethereal Pad',
    oscillator: 'sine',
    attack: 0.5,
    decay: 0.4,
    sustain: 0.8,
    release: 2,
    description: 'Floating, ambient'
  },
  {
    name: 'Punchy Synth',
    oscillator: 'square',
    attack: 0.02,
    decay: 0.15,
    sustain: 0.5,
    release: 0.8,
    description: 'Percussive, punchy'
  }
];

export const EFFECT_PRESETS = [
  {
    name: 'Small Room',
    type: 'reverb',
    mix: 0.3,
    description: 'Tight reverb'
  },
  {
    name: 'Large Hall',
    type: 'reverb',
    mix: 0.7,
    description: 'Spacious reverb'
  },
  {
    name: 'Slapback',
    type: 'delay',
    mix: 0.5,
    description: 'Echo effect'
  },
  {
    name: 'Ambient',
    type: 'reverb',
    mix: 0.9,
    description: 'Lush, ambient'
  }
];
