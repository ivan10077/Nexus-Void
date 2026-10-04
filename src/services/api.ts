import type { Soundscape } from '../types';

const API_BASE = 'http://localhost:3001/api';

export const api = {
  async getSoundscapes(): Promise<Soundscape[]> {
    try {
      const res = await fetch(`${API_BASE}/soundscapes`);
      return res.json();
    } catch (err) {
      console.error('Failed to fetch soundscapes', err);
      return [];
    }
  },

  async saveSoundscape(soundscape: Soundscape): Promise<Soundscape> {
    try {
      const res = await fetch(`${API_BASE}/soundscapes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(soundscape)
      });
      return res.json();
    } catch (err) {
      console.error('Failed to save soundscape', err);
      throw err;
    }
  },

  async deleteSoundscape(id: string): Promise<void> {
    try {
      await fetch(`${API_BASE}/soundscapes/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete soundscape', err);
      throw err;
    }
  },

  async updateSoundscape(id: string, updates: Partial<Soundscape>): Promise<Soundscape> {
    try {
      const res = await fetch(`${API_BASE}/soundscapes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      return res.json();
    } catch (err) {
      console.error('Failed to update soundscape', err);
      throw err;
    }
  }
};
