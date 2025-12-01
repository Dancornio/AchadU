export async function login({ email, password }) {
  const API_URL = import.meta.env?.VITE_API_URL || '';
  const endpoint = API_URL ? `${API_URL.replace(/\/$/, '')}/login` : '/api/login';
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      // Persistir token
      if (data?.access_token) {
        try { localStorage.setItem('achadu-token', data.access_token); } catch {}
      }
      return { ok: true, ...data };
    }
    // Fallback de desenvolvimento quando API não está configurada
    if (!API_URL) {
      try { localStorage.setItem('achadu-token', 'demo-token'); } catch {}
      return { ok: true, token: 'demo-token', user: { email } };
    }
    return { ok: false, error: 'Credenciais inválidas' };
  } catch (err) {
    // Fallback de desenvolvimento quando API não está acessível
    if (!API_URL) {
      try { localStorage.setItem('achadu-token', 'demo-token'); } catch {}
      return { ok: true, token: 'demo-token', user: { email } };
    }
    return { ok: false, error: 'Erro de rede. Tente novamente.' };
  }
}

export function getToken() {
  try { return localStorage.getItem('achadu-token') || ''; } catch { return ''; }
}

export function clearToken() {
  try { localStorage.removeItem('achadu-token'); } catch {}
}

export function getAuthHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}
