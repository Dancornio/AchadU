import ItemCard from './ItemCard';
import SkeletonItemCard from './SkeletonItemCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/db';

export default function RecentFeed() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const load = () => {
      const locations = db.getLocations();
      const arr = db.listItems({ status: 'found', sort: 'recent', limit: 6 });
      setItems(
        arr.map(i => ({
          id: i.id,
          title: i.name,
          location: labelById(locations, i.location_id),
          time: relativeFromISO(i.reported_at),
          imageUrl: i.item_image_url ?? null,
        }))
      );
    };
    load();
    const off = db.subscribeItems(load);
    return off;
  }, []);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="recentes">
      <div className="flex items-center justify-between">
        <h2 id="recentes" className="text-xl font-semibold text-gray-900">Recentemente encontrados</h2>
        <Link to="/itens" className="text-sm text-brand hover:text-brand-dark">Ver todos</Link>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items
          ? items.map((it, i) => <ItemCard key={i} {...it} />)
          : Array.from({ length: 6 }).map((_, i) => <SkeletonItemCard key={i} />)}
      </div>
    </section>
  );
}

function labelById(list, id) {
  return list.find(x=>x.id===id)?.name ?? '—';
}
function relativeFromISO(iso) {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const min = Math.floor(diffMs / 60000);
  const h = Math.floor(min / 60);
  const dys = Math.floor(h / 24);
  if (min < 60) return `há ${min} min`;
  if (h < 24) return `há ${h} h`;
  return `há ${dys} d`;
}