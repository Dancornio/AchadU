const API_URL = import.meta.env?.VITE_API_URL || '';
const BASE_URL = API_URL ? API_URL.replace(/\/$/, '') : '/api';

function getHeaders() {
    const token = localStorage.getItem('achadu-token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

export async function listUsers() {
    const res = await fetch(`${BASE_URL}/users`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Erro ao listar usuários');
    return res.json();
}

export async function updateUserRole(userId, role) {
    const res = await fetch(`${BASE_URL}/users/${userId}/role`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ role })
    });
    if (!res.ok) throw new Error('Erro ao atualizar permissão');
    return res.json();
}

export async function listLocations() {
    const res = await fetch(`${BASE_URL}/locations`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Erro ao listar locais');
    return res.json();
}

export async function createLocation(location) {
    const res = await fetch(`${BASE_URL}/locations`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(location)
    });
    if (!res.ok) throw new Error('Erro ao criar local');
    return res.json();
}

export async function updateLocation(id, location) {
    const res = await fetch(`${BASE_URL}/locations/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(location)
    });
    if (!res.ok) throw new Error('Erro ao atualizar local');
    return res.json();
}

export async function deleteLocation(id) {
    const res = await fetch(`${BASE_URL}/locations/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao remover local');
    return res.json();
}
