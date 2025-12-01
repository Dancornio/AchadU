import ItemCard from './ItemCard';
import SkeletonItemCard from './SkeletonItemCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api'; // <--- Use o novo serviço
import { db } from '../services/db'; // Mantemos apenas para getLocations (se ainda não tiver endpoint)

export default function RecentFeed() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        // Busca apenas itens com status 'found' (encontrados), limite 6
        const data = await api.getItems({ status: 'found', limit: 6 });
        
        // Mapeia os dados da API para o formato do Card
        const locations = db.getLocations(); // Usando mock para locations por enquanto
        
        setItems(data.map(i => ({
          id: i.id,
          title: i.name,
          // Tenta achar o nome do local pelo ID, ou mostra "Desconhecido"
          location: locations.find(l => l.id === i.location_id)?.name || 'Local ID ' + i.location_id,
          time: new Date(i.reported_at).toLocaleDateString('pt-BR'),
          imageUrl: i.item_image_url
        })));
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    load();
  }, []);

  if (error) return <p className="text-center py-10 text-gray-500">Não foi possível carregar os itens recentes.</p>;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="recentes">
      <div className="flex items-center justify-between">
        <h2 id="recentes" className="text-xl font-semibold text-gray-900">Recentemente encontrados</h2>
        <Link to="/itens" className="text-sm text-brand hover:text-brand-dark">Ver todos</Link>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items
          ? items.map((it) => <ItemCard key={it.id} {...it} />)
          : Array.from({ length: 6 }).map((_, i) => <SkeletonItemCard key={i} />)}
      </div>
    </section>
  );
}