import { useState } from 'react';
import { db, ItemStatus } from '../services/db';
import CategoryChips from '../components/CategoryChips';
import { X } from 'lucide-react';

export default function ReportLostModal({ onClose }) {
  const categories = db.getCategories();
  const locations = db.getLocations();
  const currentUserId = db.getCurrentUserId();
  const [form, setForm] = useState({ name: '', description: '', category_id: categories[0]?.id ?? 1, location_id: locations[0]?.id ?? 1, event_date: '' });
  const [saving, setSaving] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.event_date) return alert('Informe a data do evento');
    try {
      setSaving(true);
      db.createItem({
        name: form.name,
        description: form.description,
        status: ItemStatus.lost,
        category_id: Number(form.category_id),
        location_id: Number(form.location_id),
        reported_by_id: currentUserId,
        handler_id: null,
        event_date: form.event_date,
      });
      onClose?.();
    } catch (err) {
      alert(err.message || 'Erro ao criar item');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Reportar item perdido</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Fechar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form className="mt-3 space-y-3" onSubmit={submit}>
          <label className="block">
            <span className="text-sm text-gray-700">Título</span>
            <input className="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3" required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
          </label>
          <label className="block">
            <span className="text-sm text-gray-700">Categoria</span>
            <CategoryChips
              categories={categories}
              value={form.category_id}
              onChange={(val)=>setForm(f=>({...f,category_id: val}))}
              size="sm"
              className="mt-2"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-700">Local</span>
            <select className="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3" value={form.location_id} onChange={e=>setForm(f=>({...f,location_id:e.target.value}))}>
              {locations.map(l=> <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-700">Data do evento</span>
            <input type="date" className="mt-1 w-full h-10 rounded-lg border border-gray-200 px-3" required value={form.event_date} onChange={e=>setForm(f=>({...f,event_date:e.target.value}))} />
          </label>
          <label className="block">
            <span className="text-sm text-gray-700">Descrição</span>
            <textarea className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2" rows={3} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="h-10 px-3 rounded-lg border border-gray-200">Cancelar</button>
            <button type="submit" disabled={saving} className="h-10 px-3 rounded-lg bg-brand text-white">{saving? 'Enviando...' : 'Enviar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}