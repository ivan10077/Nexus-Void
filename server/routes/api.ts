import { Router, Request, Response } from 'express';
import db from '../db/schema.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Healthcheck endpoint
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Soundscapes list endpoint
router.get('/soundscapes', (req: Request, res: Response) => {
  try {
    const stmt = db.prepare('SELECT * FROM soundscapes');
    const soundscapes = stmt.all();
    res.json(soundscapes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Save a soundscape
router.post('/soundscapes', (req: Request, res: Response) => {
  try {
    const { id, title, description, nodes } = req.body;

    if (!id || !title) {
      return res.status(400).json({ error: 'Missing required fields: id, title' });
    }

    // Use demo user for now (in production, would use authenticated user)
    const demoUserId = 'demo-user-' + Date.now();

    // Ensure user exists
    const userExists = db.prepare('SELECT id FROM users WHERE id = ?').get(demoUserId);
    if (!userExists) {
      const insertUser = db.prepare('INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)');
      insertUser.run(demoUserId, 'user_' + Date.now(), 'hashed_pass');
    }

    // Check if soundscape exists
    const existing = db.prepare('SELECT id FROM soundscapes WHERE id = ?').get(id);

    if (existing) {
      // Update existing
      const updateStmt = db.prepare(
        'UPDATE soundscapes SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      );
      updateStmt.run(title, description || '', id);
    } else {
      // Insert new
      const insertStmt = db.prepare(
        'INSERT INTO soundscapes (id, user_id, name, description, created_at, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)'
      );
      insertStmt.run(id, demoUserId, title, description || '');
    }

    // Save nodes
    if (nodes && Array.isArray(nodes)) {
      // Delete old nodes for this soundscape
      db.prepare('DELETE FROM nodes WHERE soundscape_id = ?').run(id);

      // Insert new nodes
      const insertNodeStmt = db.prepare(
        'INSERT INTO nodes (id, soundscape_id, type, position_x, position_y, position_z, settings_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)'
      );

      for (const node of nodes) {
        insertNodeStmt.run(
          node.id,
          id,
          node.type,
          node.position[0],
          node.position[1],
          node.position[2],
          JSON.stringify(node.properties || {})
        );
      }
    }

    res.json({
      success: true,
      message: 'Soundscape saved successfully',
      id,
      title
    });
  } catch (error: any) {
    console.error('Save error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single soundscape
router.get('/soundscapes/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('SELECT * FROM soundscapes WHERE id = ?');
    const soundscape = stmt.get(id);

    if (!soundscape) {
      return res.status(404).json({ error: 'Soundscape not found' });
    }

    // Get nodes for this soundscape
    const nodesStmt = db.prepare('SELECT * FROM nodes WHERE soundscape_id = ?');
    const nodes = nodesStmt.all(id);

    res.json({ ...soundscape, nodes });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete soundscape
router.delete('/soundscapes/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM soundscapes WHERE id = ?');
    stmt.run(id);
    res.json({ success: true, message: 'Soundscape deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Demo seed route to populate sample user, soundscape, and node
router.post('/demo/init', (req: Request, res: Response) => {
  try {
    const userId = 'demo-user-' + Date.now();
    const soundscapeId = 'demo-scape-' + Date.now();
    const nodeId = 'demo-node-' + Date.now();

    const insertUser = db.prepare('INSERT INTO users (id, username, password_hash) VALUES (?, ?, ?)');
    insertUser.run(userId, 'demo_user_' + Date.now(), 'hashed_pass');

    const insertScape = db.prepare('INSERT INTO soundscapes (id, user_id, name, description) VALUES (?, ?, ?, ?)');
    insertScape.run(soundscapeId, userId, 'Demo Soundscape', 'A test soundscape');

    const insertNode = db.prepare('INSERT INTO nodes (id, soundscape_id, type, position_x, position_y, position_z, settings_json) VALUES (?, ?, ?, ?, ?, ?, ?)');
    insertNode.run(nodeId, soundscapeId, 'oscillator', 0, 0, 0, JSON.stringify({ frequency: 440 }));

    res.json({ message: 'Demo data initialized successfully', userId, soundscapeId, nodeId });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;