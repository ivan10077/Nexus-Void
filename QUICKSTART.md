# 🚀 QUICK START

## 60-Second Setup

```bash
cd F:/Ivan/Github/Website
npm install
npm run dev
```

Then open **http://localhost:5177** in your browser.

---

## 3-Minute Demo

1. **Land** on the home page (see particles animating)
2. **Click** "Enter Studio"
3. **Click** "Add Synth" to create a sound node
4. **Click** "Add Effect" to create an effect node
5. **Select** the synth node (turns white when selected)
6. **Press 'C'** to connect mode
7. **Click** the effect node to connect them
8. **Click** the Play button (▶️ top right)
9. **Hear** the audio being synthesized in real-time
10. **Explore** the Gallery page

---

## What You're Looking At

- **3D Environment**: Nodes floating in space (Three.js)
- **Glowing Orbs**: Each is a sound generator or effect (Tone.js)
- **Curved Lines**: Audio routing (connections between nodes)
- **Sidebar**: Properties editor for sound parameters
- **Real-Time**: Audio generates as you connect nodes

---

## Key Shortcuts

| Key | Action |
|-----|--------|
| `C` | Connect two nodes |
| `ESC` | Cancel connection |
| `?` | Show help |
| **Right-Click + Drag** | Rotate camera |
| **Scroll** | Zoom in/out |

---

## Backend

- Runs on **http://localhost:3001**
- SQLite database auto-initializes
- REST API endpoints available
- Check `/health` endpoint to verify running

---

## Troubleshooting

**Port already in use?**
- Vite auto-increments (5173 → 5174 → 5175...)
- Check terminal for actual port

**No sound?**
- Click Play button after connecting nodes
- Check browser has audio permission
- Check browser console (F12) for errors

**3D not rendering?**
- Ensure GPU acceleration enabled
- Try Chrome/Edge (better WebGL support)

**Database error?**
- Delete `server/db/database.sqlite`
- Restart dev server (it'll reinitialize)

---

## Tech Stack at a Glance

```
Frontend: React + Three.js + Tone.js
Styling: Tailwind CSS + Framer Motion
State: Zustand
Backend: Express + SQLite
```

---

**Ready?** → `npm run dev` → Open browser → Have fun! 🌌
