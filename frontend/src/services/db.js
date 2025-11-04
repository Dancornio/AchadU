import { users as seedUsers, items as seedItems, claims as seedClaims, categories as seedCategories, locations as seedLocations, currentUserId as seedCurrentUserId } from '../data/mock';

const STORAGE_KEY = 'achadu-db';

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }
  return null;
}

const initial = {
  users: seedUsers.slice(),
  items: seedItems.slice(),
  claims: seedClaims.slice(),
  categories: seedCategories.slice(),
  locations: seedLocations.slice(),
  currentUserId: seedCurrentUserId,
};

let store = loadStore() ?? initial;

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); } catch (e) { /* ignore */ }
}

const listeners = { items: new Set(), claims: new Set() };
function notify(type) { listeners[type]?.forEach(fn => { try { fn(); } catch {} }); }

// Enums conforme db.sql
export const ItemStatus = { lost: 'lost', found: 'found', claimed: 'claimed', archived: 'archived' };
export const ClaimStatus = { pending: 'pending', approved: 'approved', rejected: 'rejected' };

// Utilidades
function nextId(list) { return (list.reduce((max, x) => Math.max(max, Number(x.id)), 0) || 0) + 1; }

// ITEMS
function listItems({ status, categoryId, locationId, reportedById, handlerId, limit, sort = 'recent' } = {}) {
  let arr = store.items.slice();
  if (status && status !== 'all') arr = arr.filter(i => i.status === status);
  if (categoryId && categoryId !== 'all') arr = arr.filter(i => String(i.category_id) === String(categoryId));
  if (locationId && locationId !== 'all') arr = arr.filter(i => String(i.location_id) === String(locationId));
  if (reportedById) arr = arr.filter(i => Number(i.reported_by_id) === Number(reportedById));
  if (handlerId) arr = arr.filter(i => Number(i.handler_id) === Number(handlerId));
  if (sort === 'recent') arr.sort((a, b) => new Date(b.reported_at) - new Date(a.reported_at));
  if (typeof limit === 'number') arr = arr.slice(0, limit);
  return arr;
}

function createItem({ name, description, status, category_id, location_id, reported_by_id, handler_id = null, event_date, item_image_url = null }) {
  if (!name || !description || !status || !category_id || !location_id || !reported_by_id || !event_date) {
    throw new Error('Dados obrigatórios faltando para criar item');
  }
  const id = nextId(store.items);
  const item = { id, name, description, status, category_id, location_id, reported_by_id, handler_id, reported_at: new Date().toISOString(), event_date, item_image_url };
  store.items.push(item);
  persist();
  notify('items');
  return item;
}

function updateItem(id, patch) {
  const idx = store.items.findIndex(i => i.id === id);
  if (idx < 0) throw new Error('Item não encontrado');
  store.items[idx] = { ...store.items[idx], ...patch };
  persist();
  notify('items');
  return store.items[idx];
}

// CLAIMS
function listClaims({ status, itemId, claimantId, limit, sort = 'recent' } = {}) {
  let arr = store.claims.slice();
  if (status && status !== 'all') arr = arr.filter(c => c.status === status);
  if (itemId) arr = arr.filter(c => Number(c.item_id) === Number(itemId));
  if (claimantId) arr = arr.filter(c => Number(c.claimant_id) === Number(claimantId));
  if (sort === 'recent') arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  if (typeof limit === 'number') arr = arr.slice(0, limit);
  return arr;
}

function createClaim({ item_id, claimant_id, description }) {
  if (!item_id || !claimant_id || !description) throw new Error('Dados obrigatórios faltando para criar reivindicação');
  const id = nextId(store.claims);
  const claim = { id, item_id, claimant_id, description, status: ClaimStatus.pending, created_at: new Date().toISOString(), resolved_at: null, resolved_by_id: null };
  store.claims.push(claim);
  persist();
  notify('claims');
  return claim;
}

function resolveClaim(id, { status, resolved_by_id }) {
  const idx = store.claims.findIndex(c => c.id === id);
  if (idx < 0) throw new Error('Reivindicação não encontrada');
  store.claims[idx] = { ...store.claims[idx], status, resolved_by_id: resolved_by_id ?? store.claims[idx].resolved_by_id, resolved_at: new Date().toISOString() };
  persist();
  notify('claims');
  return store.claims[idx];
}

// Lookups
function getCategories() { return store.categories.slice(); }
function getLocations() { return store.locations.slice(); }
function getCurrentUserId() { return store.currentUserId; }
function getUserById(id) { return store.users.find(u => u.id === id); }

// Subscriptions
function subscribeItems(cb) { listeners.items.add(cb); return () => listeners.items.delete(cb); }
function subscribeClaims(cb) { listeners.claims.add(cb); return () => listeners.claims.delete(cb); }

export const db = {
  listItems,
  createItem,
  updateItem,
  listClaims,
  createClaim,
  resolveClaim,
  getCategories,
  getLocations,
  getCurrentUserId,
  getUserById,
  subscribeItems,
  subscribeClaims,
};