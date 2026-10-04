import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors"
        >
          <span className="text-xl font-bold">🌌 NEXUS VOID</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/studio')}
            className={`px-4 py-2 rounded transition-all ${
              location.pathname === '/studio'
                ? 'bg-white text-black font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => navigate('/gallery')}
            className={`px-4 py-2 rounded transition-all ${
              location.pathname === '/gallery'
                ? 'bg-white text-black font-semibold'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Gallery
          </button>
        </div>
      </div>
    </motion.div>
  );
}
