// Serviços de integração com a API para itens e upload de imagem
import { getToken } from './auth';

function apiBase() {
  const base = import.meta.env?.VITE_API_URL || '';
  // Se VITE_API_URL incluir '/api', usamos direto; senão, caímos em '/api'
  return base ? base.replace(/\/$/, '') : '/api';
}

function authHeaders(token) {
  const t = token || getToken();
  const headers = {};
  if (t) headers['Authorization'] = `Bearer ${t}`;
  return headers;
}

export async function uploadImage(file, token) {
  if (!file) throw new Error('Arquivo de imagem é obrigatório');
  const fd = new FormData();
  fd.append('file', file);
  const endpoint = `${apiBase()}/upload/image`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: authHeaders(token),
    body: fd,
  });
  if (!res.ok) {
    let detail = 'Falha ao fazer upload da imagem';
    try { const err = await res.json(); detail = err?.detail || detail; } catch {}
    throw new Error(detail);
  }
  const data = await res.json();
  return data?.url;
}

export async function createItem(payload, token) {
  const endpoint = `${apiBase()}/items`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let detail = 'Erro ao criar item';
    try { const err = await res.json(); detail = err?.detail || detail; } catch {}
    throw new Error(detail);
  }
  return await res.json();
}

export async function listItems({ status, skip = 0, limit = 50 } = {}) {
  const params = new URLSearchParams();
  if (status && status !== 'all') params.set('status', status);
  if (skip) params.set('skip', String(skip));
  if (limit) params.set('limit', String(limit));
  const endpoint = `${apiBase()}/items${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    let detail = 'Erro ao listar itens';
    try { const err = await res.json(); detail = err?.detail || detail; } catch {}
    throw new Error(detail);
  }
  return await res.json();
}

export async function getItemById(id) {
  const endpoint = `${apiBase()}/items/${id}`;
  const res = await fetch(endpoint);
  if (!res.ok) {
    let detail = 'Item não encontrado';
    try { const err = await res.json(); detail = err?.detail || detail; } catch {}
    throw new Error(detail);
  }
  return await res.json();
}
