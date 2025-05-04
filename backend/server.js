import express from 'express';
import path from 'path';
import fs from 'fs-extra';

const app = express();
const PORT = 3001;

// Enable JSON body parsing
app.use(express.json());

// Serve static visuals and JSON under /projects
app.use('/projects', express.static(path.resolve('../projects')));

// GET a project by slug
app.get('/api/projects/:slug', (req, res) => {
  const slug = req.params.slug;
  const file = path.resolve('../projects', slug, 'project.json');

  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  res.json(data);
});

// POST to create or update a project
app.post('/api/projects/:slug', async (req, res) => {
  const { slug } = req.params;
  const data = req.body;
  const projDir = path.resolve('../projects', slug);

  // Ensure directory exists
  await fs.ensureDir(projDir);

  // Write project.json with 2‑space indentation
  await fs.writeJSON(path.join(projDir, 'project.json'), data, { spaces: 2 });

  res.json({ ok: true, slug });
});

// Start server
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
