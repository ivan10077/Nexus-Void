import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Hero } from './pages/Hero';
import { StudioRender } from './pages/StudioRender';
import { Gallery } from './pages/Gallery';
import { Navigation } from './components/layout/Navigation';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/studio" element={<StudioRender />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
