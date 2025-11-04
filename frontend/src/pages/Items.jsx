import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
import CategoryChips from '../components/CategoryChips';
import { db } from '../services/db';
import { useEffect, useMemo, useState, useCallback } from 'react';

export default function Items({ initialStatus = 'all', title = 'Itens do campus' }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(initialStatus); // all | lost | found | claimed | archived
  const [categoryId, setCategoryId] = useState('all');
  const categories = db.getCategories();
  // Memoizar locations para evitar recriar a referência a cada render
  const locations = useMemo(() => db.getLocations(), []);

  const [list, setList] = useState([]);

  const fetch = useCallback(() => {
    let arr = db.listItems({ status, categoryId: categoryId === 'all' ? undefined : categoryId });
    const q = query.toLowerCase().trim();
    if (q) arr = arr.filter(i => `${i.name} ${i.description ?? ''}`.toLowerCase().includes(q));
    setList(
      arr.map(i => ({
        id: i.id,
        title: i.name,
        location: labelById(locations, i.location_id),
        time: relativeFromISO(i.reported_at),
        imageUrl: i.item_image_url ?? null,
      }))
    );
  }, [status, categoryId, query, locations]);

  useEffect(() => { fetch(); }, [fetch]);
  useEffect(() => {
    const off = db.subscribeItems(() => fetch());
    return off;
  }, [fetch]);

  const statuses = [
    { id: 'all', label: 'Todos' },
    { id: 'lost', label: 'Perdidos' },
    { id: 'found', label: 'Encontrados' },
    { id: 'claimed', label: 'Reivindicados' },
    { id: 'archived', label: 'Arquivados' },
  ];

  return (
    <div className="min-h-dvh flex flex-col ">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>

        <div className="mt-4 flex flex-col lg:flex-row gap-3">
          <div className="flex-1 flex gap-2 overflow-x-auto whitespace-nowrap -mx-1 px-1 sm:mx-0 sm:px-0">
            {statuses.map(s => (
              <button
                key={s.id}
                onClick={() => setStatus(s.id)}
                aria-pressed={status === s.id}
                className={`h-9 sm:h-10 px-2.5 sm:px-3 text-sm sm:text-base rounded-lg border shrink-0 ${status===s.id? 'bg-linear-to-r from-brand to-brand-dark text-white border-transparent shadow-sm':'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <CategoryChips categories={categories} value={categoryId} onChange={setCategoryId} showAll className="w-full lg:w-auto" />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por nome/descrição" className="flex-1 h-10 rounded-lg border border-gray-200 px-3 bg-white/80 backdrop-blur-sm focus:outline-none" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {list.length ? list.map(it => (
            <ItemCard key={it.id} {...it} />
          )) : (
            <p className="text-gray-600">Nenhum item encontrado com os filtros selecionados.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
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