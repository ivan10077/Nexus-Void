import { useEffect, useState } from 'react';
import { SoundscapeScene } from '../components/three/SoundscapeScene';
import { StudioSidebar } from '../components/layout/StudioSidebar';
import { KeyboardHelp } from '../components/ui/KeyboardHelp';
import { useSoundscapeStore } from '../stores/useSoundscapeStore';

export function StudioRender() {
  const initializeNew = useSoundscapeStore(s => s.initializeNew);
  const currentSoundscape = useSoundscapeStore(s => s.currentSoundscape);
  const selectedNodeId = useSoundscapeStore(s => s.selectedNodeId);
  const connectNodes = useSoundscapeStore(s => s.connectNodes);

  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);

  useEffect(() => {
    if (!currentSoundscape) {
      initializeNew();
    }
  }, [currentSoundscape, initializeNew]);

  // Handle connection logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c' && selectedNodeId) {
        if (!connectingFrom) {
          setConnectingFrom(selectedNodeId);
        } else if (connectingFrom !== selectedNodeId) {
          connectNodes(connectingFrom, selectedNodeId);
          setConnectingFrom(null);
        } else {
          setConnectingFrom(null);
        }
      }
      if (e.key === 'Escape') {
        setConnectingFrom(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, connectingFrom, connectNodes]);

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="flex-1 relative cursor-crosshair">
        <SoundscapeScene />

        {/* Interaction Overlay Info */}
        <div className="absolute top-6 left-6 pointer-events-none z-10 text-white/50 text-xs space-y-1 font-mono">
          <p>NEXUS VOID // STUDIO</p>
          <p>Left Click: Select/Drag Node</p>
          <p>Scroll: Zoom</p>
          <p>Right Click: Rotate Camera</p>
          <br/>
          {connectingFrom ? (
            <p className="text-[#33ccff] font-bold animate-pulse">CONNECTING... SELECT TARGET NODE OR PRESS ESC</p>
          ) : (
            <p className="text-white/80">Press 'C' when a node is selected to connect it to another</p>
          )}
        </div>

        <KeyboardHelp />
      </div>
      <StudioSidebar />
    </div>
  );
}
