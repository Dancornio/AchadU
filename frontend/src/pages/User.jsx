import Header from '../components/Header';
import Footer from '../components/Footer';
import { db } from '../services/db';
import { useEffect, useMemo, useState } from 'react';
import { User as UserIcon } from 'lucide-react';

export default function User() {
  const currentUserId = db.getCurrentUserId();
  const user = db.getUserById(currentUserId);
  const categories = db.getCategories();
  const locations = db.getLocations();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recent');
  const [tab, setTab] = useState('reportados'); // reportados | encontrados | reivindicacoes
  const [editItem, setEditItem] = useState(null);

  const [itemsList, setItemsList] = useState(db.listItems());
  const [claimsList, setClaimsList] = useState(db.listClaims({ claimantId: currentUserId }));
  useEffect(() => {
    const loadItems = () => setItemsList(db.listItems());
    const loadClaims = () => setClaimsList(db.listClaims({ claimantId: currentUserId }));
    loadItems(); loadClaims();
    const offItems = db.subscribeItems(loadItems);
    const offClaims = db.subscribeClaims(loadClaims);
    return () => { offItems(); offClaims(); };
  }, [currentUserId]);

  const myReported = useMemo(() => itemsList.filter(i => i.reported_by_id === currentUserId), [itemsList, currentUserId]);
  const myHandled = useMemo(() => itemsList.filter(i => i.handler_id === currentUserId), [itemsList, currentUserId]);
  const myClaims = useMemo(() => claimsList, [claimsList]);

  const filtered = useMemo(() => {
    const base = tab === 'reportados' ? myReported : tab === 'encontrados' ? myHandled : myClaims;
    const asItems = tab === 'reivindicacoes'
      ? myClaims.map(c => ({
          id: c.id,
          item_id: c.item_id,
          name: itemsList.find(i => i.id === c.item_id)?.name ?? 'Item',
          status: c.status,
          description: c.description,
          type: 'claim',
          created_at: c.created_at,
        }))
      : base.map(i => ({ ...i, type: 'item' }));
    const q = query.toLowerCase().trim();
    const match = i => `${i.name} ${i.description ?? ''}`.toLowerCase().includes(q);
    const list = q ? asItems.filter(match) : asItems;
    if (sort === 'recent') return list.sort((a,b) => new Date(b.reported_at ?? b.created_at) - new Date(a.reported_at ?? a.created_at));
    if (sort === 'status') return list.sort((a,b) => String(a.status).localeCompare(String(b.status)));
    return list;
  }, [tab, query, sort, myReported, myHandled, myClaims]);

  return (
    <div className="min-h-dvh flex flex-col bg-linear-to-b from-brand/10 via-fuchsia-50 to-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader user={user} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Tabs tab={tab} setTab={setTab} />
            <Controls query={query} setQuery={setQuery} sort={sort} setSort={setSort} onExport={() => exportCSV(filtered)} />
            <List data={filtered} onEdit={setEditItem} categories={categories} locations={locations} />
          </div>
          <div className="space-y-4">
            <UserStats items={itemsList} claims={claimsList} />
            <Tips />
          </div>
        </div>
      </main>
      <Footer />
      {editItem && <EditModal item={editItem} onClose={() => setEditItem(null)} />}
    </div>
  );
}

function ProfileHeader({ user }) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="absolute inset-0 bg-linear-to-r from-brand/20 via-indigo-100 to-fuchsia-100" />
      <div className="relative p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-brand text-white flex items-center justify-center shadow-sm">
            <UserIcon className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Bem-vindo(a)</p>
            <h1 className="text-xl font-semibold text-gray-900">{user.full_name}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tabs({ tab, setTab }) {
  const tabs = [
    { id: 'reportados', label: 'Meus reportes' },
    { id: 'encontrados', label: 'Itens que encontrei' },
    { id: 'reivindicacoes', label: 'Minhas reivindicações' },
  ];
  return (
    <div className="flex gap-2 overflow-x-auto whitespace-nowrap -mx-1 px-1 sm:mx-0 sm:px-0">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          aria-pressed={tab === t.id}
          className={`h-9 sm:h-10 px-2.5 sm:px-3 text-sm sm:text-base rounded-lg border shrink-0 ${tab===t.id? 'bg-brand text-white border-brand shadow-sm':'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Controls({ query, setQuery, sort, setSort, onExport }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input value={query} onChange={e=>setQuery(e.target.value)}
        placeholder="Filtrar por nome/descrição"
        className="flex-1 h-10 rounded-lg border border-gray-200 px-3" />
      <select value={sort} onChange={e=>setSort(e.target.value)} className="h-10 rounded-lg border border-gray-200 px-3">
        <option value="recent">Mais recentes</option>
        <option value="status">Por status</option>
      </select>
      <button onClick={onExport} className="h-10 px-3 rounded-lg bg-linear-to-r from-brand to-brand-dark text-white">Exportar CSV</button>
    </div>
  );
}

function List({ data, onEdit, categories, locations }) {
  if (!data.length) return <p className="text-gray-600">Nada por aqui ainda.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.map((it) => (
        <article key={(it.type==='claim'?`c-`:'')+it.id} className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-sm transition">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{it.name}</h3>
            <StatusBadge status={it.status} />
          </div>
          <p className="text-sm text-gray-600 mt-1">{it.description}</p>
          {it.type !== 'claim' && (
            <p className="text-xs text-gray-500 mt-1">Categoria: {labelById(categories, it.category_id)} • Local: {labelById(locations, it.location_id)}</p>
          )}
          <div className="mt-3 flex gap-2">
            {it.type !== 'claim' && <button onClick={()=>onEdit(it)} className="h-9 px-3 rounded-lg border border-gray-200">Editar</button>}
            {it.type !== 'claim' && <button onClick={()=>db.updateItem(it.id,{ status:'archived' })} className="h-9 px-3 rounded-lg bg-gray-900 text-white">Arquivar</button>}
            <button onClick={()=>navigator.clipboard.writeText(window.location.origin+`/item/${it.item_id??it.id}`)} className="h-9 px-3 rounded-lg bg-linear-to-r from-fuchsia-600 to-pink-600 text-white">Compartilhar</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    lost: 'bg-yellow-100 text-yellow-800',
    found: 'bg-green-100 text-green-800',
    claimed: 'bg-blue-100 text-blue-800',
    archived: 'bg-gray-100 text-gray-700',
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800',
  };
  return <span className={`text-xs rounded-full px-2 py-1 ${map[status] ?? 'bg-gray-100 text-gray-700'}`}>{status}</span>;
}

function UserStats({ items, claims }) {
  const currentId = db.getCurrentUserId();
  const reported = items.filter(i=>i.reported_by_id===currentId).length;
  const handled = items.filter(i=>i.handler_id===currentId).length;
  const approved = claims.filter(c=>c.claimant_id===currentId && c.status==='approved').length;
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="font-semibold text-gray-900">Suas estatísticas</h3>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <StatCard label="Reportes" value={reported} color="from-brand to-indigo-600" />
        <StatCard label="Encontrados" value={handled} color="from-emerald-600 to-teal-600" />
        <StatCard label="Reivindicados" value={approved} color="from-fuchsia-600 to-pink-600" />
      </div>
    </section>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`rounded-lg p-3 bg-linear-to-r ${color} text-white`}>
      <p className="text-xs">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Tips() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="font-semibold text-gray-900">Dicas</h3>
      <ul className="mt-2 text-sm text-gray-700 space-y-1">
        <li>Use filtros para achar rapidamente.</li>
        <li>Compartilhe o link do item com um clique.</li>
        <li>Arquive itens antigos para manter tudo organizado.</li>
      </ul>
    </section>
  );
}

function EditModal({ item, onClose }) {
  const [form, setForm] = useState({ name: item.name, description: item.description });
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Editar item</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Fechar">✕</button>
        </div>
        <form className="mt-3 space-y-3" onSubmit={(e)=>{e.preventDefault(); db.updateItem(item.id,{ name: form.name, description: form.description }); onClose();}}>
          <label className="block">
            <span className="text-sm text-gray-700">Título</span>
            <input className="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
          </label>
          <label className="block">
            <span className="text-sm text-gray-700">Descrição</span>
            <textarea className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2" rows={3} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="h-10 px-3 rounded-lg border border-gray-200">Cancelar</button>
            <button type="submit" className="h-10 px-3 rounded-lg bg-brand text-white">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function exportCSV(data) {
  const rows = data.map(d => ({
    id: d.id,
    nome: d.name,
    status: d.status,
    descricao: d.description,
    tipo: d.type,
  }));
  const header = Object.keys(rows[0] ?? { id:'', nome:'', status:'', descricao:'', tipo:'' });
  const csv = [header.join(','), ...rows.map(r=>header.map(h=>`"${String(r[h]).replaceAll('"','""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'historico.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function labelById(list, id) {
  return list.find(x=>x.id===id)?.name ?? '—';
}