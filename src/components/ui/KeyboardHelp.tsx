import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function KeyboardHelp() {
  const [open, setOpen] = useState(false);

  const shortcuts = [
    { key: 'C', description: 'Connect: Select a node, press C, then select target' },
    { key: 'DELETE', description: 'Delete selected node (not Master Output)' },
    { key: 'CTRL+D / CMD+D', description: 'Duplicate selected node' },
    { key: 'ESC', description: 'Cancel any operation' },
    { key: 'SCROLL', description: 'Zoom in/out' },
    { key: 'RIGHT CLICK + DRAG', description: 'Rotate camera' },
    { key: 'MIDDLE CLICK + DRAG', description: 'Pan camera' },
    { key: '?', description: 'Show this help menu' },
  ];

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 z-40"
        title="Keyboard Shortcuts"
      >
        <span className="text-lg">?</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black border border-white/20 rounded-xl p-6 z-50 max-h-96 overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>

                <div className="space-y-2">
                  {shortcuts.map((shortcut, idx) => (
                    <div key={idx} className="flex gap-3 text-sm">
                      <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white font-mono text-xs whitespace-nowrap">
                        {shortcut.key}
                      </kbd>
                      <p className="text-white/70 flex-1 leading-relaxed">{shortcut.description}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="w-full mt-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
