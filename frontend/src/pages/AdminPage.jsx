import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const [slug, setSlug] = useState('');
  const [json, setJson] = useState('{}');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    let data;
    try {
      data = JSON.parse(json);
    } catch (err) {
      return alert('JSON invalide : ' + err.message);
    }
    const res = await fetch(`/api/projects/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      return alert('Erreur serveur : ' + (await res.text()));
    }
    navigate(`/projects/${slug}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin – Gérer un projet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Slug (URL)</label>
          <input
            type="text"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            required
            className="w-full border p-2 rounded"
            placeholder="haifa-nord-2028"
          />
        </div>
        <div>
          <label className="block mb-1">Contenu JSON</label>
          <textarea
            rows="10"
            value={json}
            onChange={e => setJson(e.target.value)}
            className="w-full border p-2 font-mono rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sauvegarder et afficher
        </button>
      </form>
    </div>
  );
}
