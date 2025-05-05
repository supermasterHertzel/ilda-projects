import express from 'express';
import path from 'path';
import fs from 'fs-extra';

const app = express();
const PORT = process.env.PORT || 3001;

// 1) Parser le JSON reçu en POST
app.use(express.json());

// 2) API GET pour récupérer un projet
app.get('/api/projects/:slug', (req, res) => {
  const slug = req.params.slug;
  const file = path.resolve('../projects', slug, 'project.json');
  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: 'Project not found' });
  }
  const data = fs.readFileSync(file, 'utf-8');
  res.json(JSON.parse(data));
});

// 3) API POST pour créer/mettre à jour un projet
app.post('/api/projects/:slug', async (req, res) => {
  const slug = req.params.slug;
  const data = req.body;
  const projDir = path.resolve('../projects', slug);
  await fs.ensureDir(projDir);
  await fs.writeJSON(path.join(projDir, 'project.json'), data, { spaces: 2 });
  res.json({ ok: true, slug });
});

// 4) Servir le build React (dossier frontend/dist/public)
const publicDir = path.resolve('../frontend/dist/public');
app.use(express.static(publicDir));

// 5) Catch‑all pour React Router (Admin, /projects/:slug…)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(publicDir, 'index.html'));
});

// 6) Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
