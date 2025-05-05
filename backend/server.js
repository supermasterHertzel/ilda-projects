import express from 'express';
import path from 'path';
import fs from 'fs-extra';

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

// 1) Parser le JSON des requêtes POST
app.use(express.json());

// 2) Routes API

// GET /api/projects/:slug
app.get('/api/projects/:slug', (req, res) => {
  const slug = req.params.slug;
  const file = path.join(__dirname, '..', 'projects', slug, 'project.json');
  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: 'Project not found' });
  }
  const data = fs.readFileSync(file, 'utf-8');
  res.json(JSON.parse(data));
});

// POST /api/projects/:slug
app.post('/api/projects/:slug', async (req, res) => {
  const slug = req.params.slug;
  const data = req.body;
  const projDir = path.join(__dirname, '..', 'projects', slug);

  await fs.ensureDir(projDir);
  await fs.writeJSON(path.join(projDir, 'project.json'), data, { spaces: 2 });

  res.json({ ok: true, slug });
});

// 3) Servir les fichiers statiques du build React
const frontDist = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontDist));

// 4) Catch‑all pour les routes client-side (Admin, /projects/:slug, etc.)
app.get('/*', (req, res) => {
  // Si c’est une route API, on ignore (sinon cette route captera tout)
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(frontDist, 'index.html'));
});

// 5) Démarrage du serveur
app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
