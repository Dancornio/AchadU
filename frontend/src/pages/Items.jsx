import Header from '../components/Header';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
import CategoryChips from '../components/CategoryChips';
import { db } from '../services/db';
import { listItems } from '../services/items';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { Search } from 'lucide-react';

export default function Items({ initialStatus = 'all', title = 'Itens do campus' }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(initialStatus); // all | lost | found | claimed | archived
  const [categoryId, setCategoryId] = useState('all');
  const categories = db.getCategories();
  // Memoizar locations para evitar recriar a referência a cada render
  const locations = useMemo(() => db.getLocations(), []);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      let arr = await listItems({ status });
      const q = query.toLowerCase().trim();
      if (q) arr = arr.filter(i => `${i.name} ${i.description ?? ''}`.toLowerCase().includes(q));
      // filtro de categoria (frontend) caso queira
      if (categoryId !== 'all') arr = arr.filter(i => String(i.category_id) === String(categoryId));
      setList(
        arr.map(i => ({
          id: i.id,
          title: i.name,
          location: labelById(locations, i.location_id),
          time: relativeFromISO(i.reported_at),
          imageUrl: i.item_image_url ?? null,
        }))
      );
    } catch (err) {
      setError(err.message || 'Falha ao carregar itens');
    } finally {
      setLoading(false);
    }
  }, [status, categoryId, query, locations]);

  useEffect(() => { fetch(); }, [fetch]);
  // Assinaturas locais removidas; itens vêm da API
  useEffect(() => {}, []);

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
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap -mx-1 px-1 sm:mx-0 sm:px-0">
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
            <div className="flex items-center gap-2 bg-white border  outline-none border-gray-200 rounded-lg px-3 h-10 transition-all duration-300 focus-within:ring-2 focus-within:ring-gray-200 shadow-md w-full sm:w-[220px] sm:focus-within:w-[280px]">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar por "
                className="flex-1 bg-transparent outline-none text-gray-900 focus:ring-0  text-sm sm:text-base"
                aria-label="Buscar itens por nome ou descrição"
              />
              <button
                type="button"
                className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-rose-700">{error}</p>}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {loading ? (
            <p className="text-gray-600">Carregando...</p>
          ) : list.length ? (
            list.map(it => <ItemCard key={it.id} {...it} />)
          ) : (
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
