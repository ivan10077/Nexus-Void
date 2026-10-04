import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SoundscapePreview {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  preview_color?: string;
}

export function Gallery() {
  const navigate = useNavigate();
  const [soundscapes, setSoundscapes] = useState<SoundscapePreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch soundscapes from backend
    fetch('http://localhost:3001/api/soundscapes')
      .then(r => r.json())
      .then(data => {
        setSoundscapes(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback demo data
        setSoundscapes([
          {
            id: '1',
            title: 'Cosmic Meditation',
            description: 'A deep, ambient exploration of space',
            createdAt: new Date().toISOString(),
            preview_color: 'from-cyan-500 to-blue-500'
          },
          {
            id: '2',
            title: 'Neon Dreams',
            description: 'Synthwave-inspired soundscape',
            createdAt: new Date().toISOString(),
            preview_color: 'from-pink-500 to-purple-500'
          },
          {
            id: '3',
            title: 'Digital Forest',
            description: 'Glitchy, nature-inspired audio art',
            createdAt: new Date().toISOString(),
            preview_color: 'from-green-500 to-emerald-500'
          },
          {
            id: '4',
            title: 'Void Echo',
            description: 'An exploration of silence and resonance',
            createdAt: new Date().toISOString(),
            preview_color: 'from-violet-500 to-indigo-500'
          },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <motion.div
        className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Gallery</h1>
            <p className="text-white/50 text-sm">Explore soundscapes created by the community</p>
          </div>
          <button
            onClick={() => navigate('/studio')}
            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:scale-105 transition-transform"
          >
            Create New
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 bg-white/5 rounded-lg border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {soundscapes.map((scape, idx) => (
              <motion.div
                key={scape.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate('/studio')}
              >
                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black hover:border-white/30 transition-colors">
                  {/* Gradient background */}
                  <div className={`h-32 bg-gradient-to-br ${scape.preview_color || 'from-cyan-500 to-blue-500'} opacity-20 group-hover:opacity-30 transition-opacity`} />

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {scape.title}
                    </h3>
                    <p className="text-xs text-white/50 line-clamp-2">
                      {scape.description}
                    </p>
                    <p className="text-xs text-white/30 pt-2">
                      {new Date(scape.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <button className="w-full py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors text-sm">
                      Explore
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="text-center py-12 text-white/30 text-sm">
        <p>💡 Create your own soundscape and share it with the community</p>
      </div>
    </div>
  );
}
