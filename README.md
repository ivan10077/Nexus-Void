# 🌌 NEXUS VOID

**Create. Connect. Compose.**

An interactive 3D sound universe where you build modular audio experiences by connecting glowing nodes in infinite space.

## 🎯 Concept

NEXUS VOID is a premium, immersive web application that transforms music production into a spatial, visual adventure. Instead of traditional linear interfaces, users navigate through a 3D nebula where sound nodes float in space. By connecting these nodes, users create modular audio synthscapes—no music theory required.

**The core experience:**
- Enter a stunning 3D environment filled with glowing particles and stars
- Click to add sound nodes (synths, effects, samplers)
- Drag nodes through space to position them
- Connect nodes together by selecting them and pressing 'C'
- Adjust node properties via the sidebar
- Hear your creation in real-time as Tone.js synthesizes audio
- Save and share soundscapes (backend-ready)

## ✨ Key Features

- **Stunning 3D Visualization**: WebGL-powered space environment with particle effects, bloom, and real-time camera control
- **Interactive Node Graph**: Visual, drag-and-drop modular audio synthesis
- **Real-Time Audio**: Tone.js integration for live synthesis and effects
- **Dark, Premium Aesthetic**: Cyan/white color scheme inspired by high-end audio equipment and space exploration
- **Responsive Design**: Works on desktop, tablet, and mobile (with optimized 3D rendering)
- **Full-Stack**: React + Three.js frontend + Express + SQLite backend
- **Zero Configuration**: Works immediately after `npm install` and `npm run dev`

## 🏗️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite (fast build tooling)
- Three.js + React Three Fiber (3D rendering)
- Framer Motion (animations)
- Tailwind CSS v4 (styling)
- Zustand (state management)
- React Router (navigation)
- Tone.js (audio synthesis)

**Backend:**
- Node.js + Express
- Better-SQLite3 (embedded database)
- TypeScript

**Development:**
- Concurrently (run frontend + backend)
- tsx (TypeScript execution)
- Vite HMR (hot module replacement)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repo
cd Website

# Install dependencies
npm install

# Start development environment (Vite + Express)
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:5175 (or next available port)
- **Backend**: http://localhost:3001

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 How to Use

### 1. Landing Page (`/`)
- See an animated hero section with particle effects
- Click **"Enter Studio"** to start creating
- Or explore the **"Gallery"** to see existing soundscapes

### 2. Studio (`/studio`)

**Controls:**
- **Left Click**: Select a node (highlights in white, shows details in sidebar)
- **Scroll**: Zoom camera in/out
- **Right Click + Drag**: Rotate 3D view
- **Middle Click + Drag**: Pan camera
- **Scroll/Wheel**: Orbit with OrbitControls

**Create & Connect:**
1. In the sidebar, click **"Add Synth"** or **"Add Effect"** to create new nodes
2. Nodes appear in 3D space around the Master Output (center white sphere)
3. Click a node to select it
4. Press **'C'** to enter connection mode (text shows "CONNECTING...")
5. Click another node to connect source → target
6. Press **'Escape'** to cancel connection mode

**Play Audio:**
1. Click the **Play button** (top-right of sidebar)
2. Synthethizers will begin generating notes based on their waveform settings
3. Audio flows from synths → effects → Master Output

**Adjust Properties:**
- Select a node to see its properties in the sidebar
- **Synths**: Change waveform (sine, square, sawtooth, triangle)
- **Effects**: Select type (reverb/delay) and adjust mix level
- **Master**: Adjust master volume

### 3. Gallery (`/gallery`)
- Browse soundscapes created and saved
- Click a soundscape to explore it in the studio
- Create your own and save (backend integration ready)

## 🎮 Recommended 3-Minute Hackathon Demo Flow

1. **Landing (0:00-0:10)**
   - Show the landing page hero animation with particles
   - Explain: "This is NEXUS VOID—a 3D sound universe"

2. **Enter Studio (0:10-0:15)**
   - Click "Enter Studio"
   - Show the 3D environment, rotate camera
   - Highlight the glowing Master Output node in center

3. **Create Nodes (0:15-0:45)**
   - Add 2-3 synths by clicking "Add Synth" in sidebar
   - Add 1-2 effects by clicking "Add Effect"
   - Scroll to zoom, drag to rotate camera
   - Show the floating nodes with different colors

4. **Connect Nodes (0:45-1:30)**
   - Select a synth node (demonstrates selection highlight)
   - Press 'C' to start connecting
   - Select Master Output to connect
   - Do this 2-3 times to show connection logic
   - Show the glowing curved lines connecting nodes in 3D

5. **Adjust Properties (1:30-1:45)**
   - Select a synth, show the sidebar
   - Change waveform from sine to sawtooth
   - Select a Master node, adjust volume

6. **Play Audio (1:45-2:00)**
   - Click the Play button
   - Explain: "Now Tone.js is synthesizing audio based on our graph"
   - Let it play for 10 seconds (ambient, glitchy notes)

7. **Showcase Gallery (2:00-2:15)**
   - Click back to home, then Gallery
   - Show the gallery cards with different colors
   - Mention: "Users can save and share soundscapes"

8. **Close (2:15-3:00)**
   - Re-emphasize the 3D aspect ("Not a typical grid-based interface")
   - Mention tech stack (Three.js, Tone.js, React, WebGL)
   - Invite judges to try it themselves

## 🌐 Environment Variables

Create a `.env` file in the root (optional—app works without it):

```
PORT=3001
NODE_ENV=development
```

## 🗄️ Database

The backend uses **Better-SQLite3** for a zero-configuration embedded database:
- Automatically creates `database.sqlite` on first run
- Tables: `users`, `soundscapes`, `nodes`
- No external database setup required

To reset data:
```bash
rm server/db/database.sqlite
```

## 📁 Project Structure

```
F:/Ivan/Github/Website/
├── src/
│   ├── components/
│   │   ├── three/           # 3D React components
│   │   │   ├── SoundscapeScene.tsx
│   │   │   ├── NodeVisual.tsx
│   │   │   └── Connections.tsx
│   │   ├── layout/
│   │   │   └── StudioSidebar.tsx
│   │   └── audio/
│   ├── pages/
│   │   ├── Hero.tsx         # Landing page
│   │   ├── StudioRender.tsx # Main editor
│   │   └── Gallery.tsx      # Soundscape gallery
│   ├── stores/
│   │   └── useSoundscapeStore.ts  # Zustand state
│   ├── audio/
│   │   └── AudioEngine.ts   # Tone.js wrapper
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── App.tsx              # Router
│   └── main.tsx             # Entry point
├── server/
│   ├── index.ts             # Express app
│   ├── routes/
│   │   └── api.ts           # API endpoints
│   └── db/
│       └── schema.ts        # SQLite schema
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Design Philosophy

- **Premium First**: Inspired by high-end audio workstations and luxury tech products
- **Dark Mode Always**: Pure black backgrounds with cyan/white accents
- **Meaningful 3D**: The 3D space isn't decorative—it's the primary interface
- **Smooth Motion**: Every interaction has carefully-designed animations
- **Accessibility**: Semantic HTML, keyboard navigation, focus states
- **Performance**: Optimized Three.js rendering, lazy loading, code splitting

## 🚧 Known Limitations & Future Work

- **Polyphony**: Current synths play notes sequentially; future version could support true polyphony
- **MIDI Support**: Could add MIDI input for hardware controllers
- **Collaboration**: Backend endpoints exist for multi-user soundscapes
- **Save/Share**: UI ready; backend endpoints need frontend integration
- **Mobile 3D**: Works on mobile but with reduced particle count for performance
- **Audio Presets**: Currently all nodes start with defaults; could add preset library

## 🔧 Troubleshooting

**Vite port already in use?**
- Vite automatically tries next available port (5173 → 5174 → 5175, etc.)
- Check terminal output for actual port

**No sound on play?**
- Ensure browser allows audio autoplay (may need user gesture first)
- Check browser console for errors
- Verify Tone.js initialized (it does on first play click)

**Database errors?**
- Delete `server/db/database.sqlite` and restart
- Run `npm run dev` to reinitialize schema

**3D not rendering?**
- Check browser console for WebGL errors
- Ensure GPU acceleration enabled in browser
- Try a different browser (Chrome/Edge > Firefox)

## 🎓 Learning & Development

This project showcases:
- **Modern React** (hooks, Router, TypeScript)
- **3D Web Graphics** (Three.js, WebGL, post-processing)
- **Real-Time Audio** (Web Audio API via Tone.js)
- **Full-Stack** (frontend + backend + database)
- **UI/UX Design** (animations, responsiveness, accessibility)
- **State Management** (Zustand for complex nested state)

Perfect for hackathons, portfolios, or as a foundation for a music tech startup.

## 📝 License

MIT

---

**Made with ❤️ for the hackathon. Good luck!**
