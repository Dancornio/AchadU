// frontend/src/services/api.js


const API_URL = import.meta.env.VITE_API_URL || 'https://listatelefonica-9cr4.onrender.com';

// Função auxiliar para pegar o token salvo
function getHeaders() {
  const token = localStorage.getItem('achadu_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

export const api = {
  // Buscar itens (com filtros opcionais)
  async getItems({ status, reported_by_id, limit } = {}) {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (reported_by_id) params.append('reported_by_id', reported_by_id);
    if (limit) params.append('limit', limit);

    const res = await fetch(`${API_URL}/items?${params.toString()}`, {
      headers: getHeaders()
    });
    
    if (!res.ok) throw new Error('Falha ao buscar itens');
    return res.json();
  },

  // Buscar detalhes de um item
  async getItemById(id) {
    const res = await fetch(`${API_URL}/items/${id}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Item não encontrado');
    return res.json();
  },

  // Criar novo item
  async createItem(itemData) {
    const res = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(itemData)
    });
    if (!res.ok) throw new Error('Erro ao criar item');
    return res.json();
  }
};