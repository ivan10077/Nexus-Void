import { SOUNDSCAPE_TEMPLATES } from '../../lib/templates';
import { useSoundscapeStore } from '../../stores/useSoundscapeStore';
import { useState } from 'react';

export function TemplateLoader() {
  const [showTemplates, setShowTemplates] = useState(false);
  const loadSoundscape = useSoundscapeStore(s => s.loadSoundscape);

  const handleLoadTemplate = (template: any) => {
    loadSoundscape({ ...template });
    setShowTemplates(false);
  };

  return (
    <div className="mb-6 space-y-2">
      <button
        onClick={() => setShowTemplates(!showTemplates)}
        className="w-full px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-sm font-semibold text-white hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
      >
        {showTemplates ? '✕ Close Templates' : '🎼 Load Template'}
      </button>

      {showTemplates && (
        <div className="grid grid-cols-1 gap-2 bg-black/30 p-3 rounded-lg border border-white/10 max-h-64 overflow-y-auto">
          {SOUNDSCAPE_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleLoadTemplate(template)}
              className="text-left px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
            >
              <div className="font-semibold text-white text-sm">{template.title}</div>
              <div className="text-white/50 text-xs">{template.description}</div>
              <div className="text-white/30 text-xs mt-1">{template.nodes.length - 1} nodes</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
