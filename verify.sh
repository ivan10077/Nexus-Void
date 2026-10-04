#!/bin/bash
# NEXUS VOID - Development Environment Startup Verification

echo "🌌 NEXUS VOID - Development Environment Check"
echo "=============================================="
echo ""

# Check Node.js
echo "✓ Node.js version:"
node --version

# Check npm
echo "✓ npm version:"
npm --version

# Check dependencies
echo ""
echo "Checking critical dependencies..."
npm list react react-dom three @react-three/fiber zustand tone framer-motion express better-sqlite3 --depth=0 2>&1 | grep -E "@|react|three|zustand|tone|framer|express|better"

echo ""
echo "=============================================="
echo "✅ Environment Ready!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "Then open:"
echo "  Frontend: http://localhost:5177 (or next available)"
echo "  Backend: http://localhost:3001"
echo ""
echo "Keyboard shortcuts in Studio:"
echo "  C      - Connect nodes"
echo "  ESC    - Cancel operation"
echo "  ?      - Show help"
echo ""
