import { useState } from 'react';
import { useSoundscapeStore } from '../../stores/useSoundscapeStore';
import { engine } from '../../audio/AudioEngine';
import { api } from '../../services/api';

export function StudioSidebar() {
  const currentSoundscape = useSoundscapeStore(s => s.currentSoundscape);
  const selectedNodeId = useSoundscapeStore(s => s.selectedNodeId);
  const addNode = useSoundscapeStore(s => s.addNode);
  const removeNode = useSoundscapeStore(s => s.removeNode);
  const isPlaying = useSoundscapeStore(s => s.isPlaying);
  const togglePlayback = useSoundscapeStore(s => s.togglePlayback);
  const updateNodeProperties = useSoundscapeStore(s => s.updateNodeProperties);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const selectedNode = currentSoundscape?.nodes.find(n => n.id === selectedNodeId);

  const handlePlayToggle = async () => {
    // Need user gesture to start AudioContext
    await engine.init();

    if (isPlaying) {
      engine.stop();
    } else {
      engine.start();
    }
    togglePlayback();
  };

  const handleSave = async () => {
    if (!currentSoundscape) return;
    setSaving(true);
    try {
      await api.saveSoundscape(currentSoundscape);
      setSaveMessage('✓ Saved!');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch (err) {
      setSaveMessage('✗ Save failed');
      setTimeout(() => setSaveMessage(''), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-80 h-full bg-black/60 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col text-white z-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold tracking-tight">Studio</h2>
        <button 
          onClick={handlePlayToggle}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-xs uppercase tracking-wider text-white/50 font-semibold mb-2">Add Nodes</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => addNode('synth')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 text-sm text-left transition-colors flex flex-col gap-1"
          >
            <span className="w-3 h-3 rounded-full bg-[#ff3366]"></span>
            Synth
          </button>

          <button
            onClick={() => addNode('effect')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 text-sm text-left transition-colors flex flex-col gap-1"
          >
            <span className="w-3 h-3 rounded-full bg-[#cc33ff]"></span>
            Effect
          </button>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : saveMessage || '💾 Save'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {selectedNode ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">{selectedNode.name || selectedNode.type}</h3>
                {selectedNode.type !== 'master' && (
                  <button 
                    onClick={() => removeNode(selectedNode.id)}
                    className="text-white/40 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-xs text-white/50 font-mono">{selectedNode.id.slice(0,8)}</p>
            </div>

            <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
              {selectedNode.type === 'synth' && (
                <div className="space-y-2">
                  <label className="text-xs text-white/60">Waveform</label>
                  <select 
                    className="w-full bg-black border border-white/10 rounded-md p-2 text-sm focus:outline-none focus:border-white/30"
                    value={selectedNode.properties.oscillator || 'sine'}
                    onChange={(e) => updateNodeProperties(selectedNode.id, { oscillator: e.target.value })}
                  >
                    <option value="sine">Sine</option>
                    <option value="square">Square</option>
                    <option value="sawtooth">Sawtooth</option>
                    <option value="triangle">Triangle</option>
                  </select>
                </div>
              )}

              {selectedNode.type === 'effect' && (
                <div className="space-y-2">
                  <label className="text-xs text-white/60">Effect Type</label>
                  <select 
                    className="w-full bg-black border border-white/10 rounded-md p-2 text-sm focus:outline-none focus:border-white/30"
                    value={selectedNode.properties.type || 'reverb'}
                    onChange={(e) => updateNodeProperties(selectedNode.id, { type: e.target.value })}
                  >
                    <option value="reverb">Reverb</option>
                    <option value="delay">Delay</option>
                  </select>

                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Mix</span>
                      <span>{Math.round((selectedNode.properties.mix || 0.5) * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="1" step="0.01" 
                      className="w-full accent-white"
                      value={selectedNode.properties.mix || 0.5}
                      onChange={(e) => updateNodeProperties(selectedNode.id, { mix: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              )}
              
              {selectedNode.type === 'master' && (
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Master Volume</span>
                    <span>{Math.round((selectedNode.properties.volume || 0.8) * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="1" step="0.01" 
                    className="w-full accent-white"
                    value={selectedNode.properties.volume || 0.8}
                    onChange={(e) => updateNodeProperties(selectedNode.id, { volume: parseFloat(e.target.value) })}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-white/30 space-y-2 animate-in fade-in duration-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
            <p className="text-sm">Select a node to edit properties</p>
          </div>
        )}
      </div>
    </div>
  );
}
