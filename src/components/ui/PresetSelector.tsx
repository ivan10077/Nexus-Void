import { useState } from 'react';
import { SYNTH_PRESETS, EFFECT_PRESETS } from '../../lib/presets';
import { useSoundscapeStore } from '../../stores/useSoundscapeStore';

export function PresetSelector() {
  const [showPresets, setShowPresets] = useState(false);
  const selectedNodeId = useSoundscapeStore(s => s.selectedNodeId);
  const currentSoundscape = useSoundscapeStore(s => s.currentSoundscape);
  const updateNodeProperties = useSoundscapeStore(s => s.updateNodeProperties);

  const selectedNode = currentSoundscape?.nodes.find(n => n.id === selectedNodeId);

  if (!selectedNode) return null;

  const presets = selectedNode.type === 'synth' ? SYNTH_PRESETS : EFFECT_PRESETS;

  const handlePresetClick = (preset: any) => {
    const { name, description, ...properties } = preset;
    updateNodeProperties(selectedNodeId!, properties);
    setShowPresets(false);
  };

  return (
    <div className="space-y-2 mb-4">
      <button
        onClick={() => setShowPresets(!showPresets)}
        className="w-full px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg text-sm font-semibold text-white hover:from-cyan-500/30 hover:to-purple-500/30 transition-all"
      >
        {showPresets ? '✕ Close Presets' : '⭐ Load Preset'}
      </button>

      {showPresets && (
        <div className="grid grid-cols-1 gap-2 bg-black/30 p-3 rounded-lg border border-white/10">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handlePresetClick(preset)}
              className="text-left px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all text-xs"
            >
              <div className="font-semibold text-white">{preset.name}</div>
              <div className="text-white/50 text-xs">{preset.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
