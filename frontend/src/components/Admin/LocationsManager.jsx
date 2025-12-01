import { useEffect, useState } from 'react';
import { listLocations, createLocation, updateLocation, deleteLocation } from '../../services/admin';

export default function LocationsManager() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newLocation, setNewLocation] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });

  useEffect(() => {
    loadLocations();
  }, []);

  async function loadLocations() {
    try {
      const data = await listLocations();
      setLocations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    try {
      const created = await createLocation(newLocation);
      setLocations([...locations, created]);
      setNewLocation({ name: '', description: '' });
    } catch (err) {
      alert('Erro ao criar local: ' + err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza?')) return;
    try {
      await deleteLocation(id);
      setLocations(locations.filter(l => l.id !== id));
    } catch (err) {
      alert('Erro ao remover: ' + err.message);
    }
  }

  function startEdit(loc) {
    setEditingId(loc.id);
    setEditForm({ name: loc.name, description: loc.description || '' });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const updated = await updateLocation(editingId, editForm);
      setLocations(locations.map(l => l.id === editingId ? updated : l));
      setEditingId(null);
    } catch (err) {
      alert('Erro ao atualizar: ' + err.message);
    }
  }

  if (loading) return <div>Carregando locais...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Gerenciar Locais</h2>
      
      {/* Form de Adição */}
      <form onSubmit={handleAdd} className="mb-6 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Novo Local</h3>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Nome do local" 
            value={newLocation.name}
            onChange={e => setNewLocation({...newLocation, name: e.target.value})}
            className="border p-2 rounded flex-1"
            required
          />
          <input 
            type="text" 
            placeholder="Descrição (opcional)" 
            value={newLocation.description}
            onChange={e => setNewLocation({...newLocation, description: e.target.value})}
            className="border p-2 rounded flex-1"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Adicionar
          </button>
        </div>
      </form>

      {/* Lista */}
      <ul className="divide-y divide-gray-200">
        {locations.map(loc => (
          <li key={loc.id} className="py-4 flex items-center justify-between">
            {editingId === loc.id ? (
              <form onSubmit={handleUpdate} className="flex gap-2 w-full">
                 <input 
                    type="text" 
                    value={editForm.name}
                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                    className="border p-1 rounded flex-1"
                    required
                  />
                  <input 
                    type="text" 
                    value={editForm.description}
                    onChange={e => setEditForm({...editForm, description: e.target.value})}
                    className="border p-1 rounded flex-1"
                  />
                  <button type="submit" className="text-blue-600">Salvar</button>
                  <button type="button" onClick={() => setEditingId(null)} className="text-gray-500">Cancelar</button>
              </form>
            ) : (
              <>
                <div>
                  <p className="font-medium">{loc.name}</p>
                  <p className="text-sm text-gray-500">{loc.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(loc)} className="text-blue-600 hover:text-blue-800">Editar</button>
                  <button onClick={() => handleDelete(loc.id)} className="text-red-600 hover:text-red-800">Remover</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
