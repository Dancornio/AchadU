import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../services/db';
import { getItemById } from '../services/items';
import { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ItemDetails() {
  const { id } = useParams();
  const itemId = Number(id);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getItemById(itemId);
        if (mounted) setItem(data);
      } catch (err) {
        if (mounted) setError(err.message || 'Item não encontrado');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [itemId]);
  const categories = db.getCategories();
  const locations = db.getLocations();
  const reporter = item ? db.getUserById(item.reported_by_id) : null;

  const locationLabel = item ? labelById(locations, item.location_id) : '—';
  const categoryLabel = item ? labelById(categories, item.category_id) : '—';

  return (
    <div className="min-h-dvh flex flex-col bg-linear-to-b from-brand/10 via-indigo-50 to-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Detalhes do item</h1>
          <Link to="/itens" className="text-sm text-brand hover:text-brand-dark">Voltar para itens</Link>
        </div>

        {error ? (
          <p className="mt-6 text-rose-700">{error}</p>
        ) : loading ? (
          <p className="mt-6 text-gray-700">Carregando...</p>
        ) : !item ? (
          <p className="mt-6 text-gray-700">Item não encontrado.</p>
        ) : (
          <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white overflow-hidden">
              {item.item_image_url ? (
                <div className="relative w-full aspect-video bg-gray-100">
                  <img src={item.item_image_url} alt={`Imagem do item: ${item.name}`} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full aspect-video bg-gray-100" />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                <p className="mt-2 text-gray-700 whitespace-pre-line">{item.description}</p>
              </div>
            </div>

            <aside className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
              <InfoRow label="Status" value={String(item.status)} />
              <InfoRow label="Categoria" value={categoryLabel} />
              <InfoRow label="Local" value={locationLabel} />
              <InfoRow label="Data do evento" value={formatDate(item.event_date)} />
              <InfoRow label="Reportado" value={reporter?.full_name ?? '—'} />
              <InfoRow label="Reportado há" value={relativeFromISO(item.reported_at)} />
            </aside>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

function labelById(list, id) {
  return list.find(x => x.id === id)?.name ?? '—';
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

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR');
  } catch {
    return String(dateStr);
  }
}
