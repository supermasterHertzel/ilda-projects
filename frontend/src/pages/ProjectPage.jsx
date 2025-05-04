import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/${slug}`)
      .then(res => res.json())
      .then(setProject)
      .catch(console.error);
  }, [slug]);

  if (!project) return <p>Loading project…</p>;

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-6">{project.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.properties.map((p, idx) => (
          <div key={idx} className="border rounded-lg shadow p-4">
            <img
              src={`/projects/${project.slug}/visuals/${p.name.replace(/ /g,'-').toLowerCase()}.jpg`}
              alt={p.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{p.name}</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Surface : {p.area} m²</li>
              <li>Terrasse : {p.terrace} m²</li>
              <li>Cellier : {p.cellar} m²</li>
              <li>Parking : {p.parking ? 'Oui' : 'Non'}</li>
              <li>Prix total : {p.price.toLocaleString()} NIS</li>
              <li>{p.depositLabel} : {p.depositAmount.toLocaleString()} NIS</li>
              <li>Contrat : {p.contractType}</li>
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
