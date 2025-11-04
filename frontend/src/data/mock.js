// Mock baseado em db.sql
export const users = [
  { id: 1, full_name: 'Ana Souza', email: 'ana@campus.edu', user_role: 'student_staff' },
  { id: 2, full_name: 'Coordenação Campus', email: 'admin@campus.edu', user_role: 'admin' },
];

export const categories = [
  { id: 1, name: 'Mochilas' },
  { id: 2, name: 'Chaves' },
  { id: 3, name: 'Eletrônicos' },
  { id: 4, name: 'Livros' },
];

export const locations = [
  { id: 1, name: 'Biblioteca' },
  { id: 2, name: 'Hall central' },
  { id: 3, name: 'Cantina' },
  { id: 4, name: 'Laboratório' },
  { id: 5, name: 'Quadra' },
];

export const items = [
  { id: 101, name: 'Mochila preta', description: 'Com caderno e garrafa', status: 'lost', category_id: 1, location_id: 1, reported_by_id: 1, handler_id: null, reported_at: new Date().toISOString(), event_date: '2025-10-28', item_image_url: 'https://placehold.co/600x400?text=Mochila+preta' },
  { id: 102, name: 'Chaves com chaveiro azul', description: '3 chaves', status: 'found', category_id: 2, location_id: 2, reported_by_id: 2, handler_id: 1, reported_at: new Date().toISOString(), event_date: '2025-10-29', item_image_url: 'https://placehold.co/600x400?text=Chaves+azuis' },
  { id: 103, name: 'Carteira marrom', description: 'Sem documentos', status: 'claimed', category_id: 3, location_id: 3, reported_by_id: 2, handler_id: 1, reported_at: new Date().toISOString(), event_date: '2025-10-25', item_image_url: 'https://placehold.co/600x400?text=Carteira+marrom' },
  { id: 104, name: 'Livro Cálculo I', description: 'Com post-its', status: 'archived', category_id: 4, location_id: 1, reported_by_id: 1, handler_id: null, reported_at: new Date().toISOString(), event_date: '2025-10-20', item_image_url: 'https://placehold.co/600x400?text=Livro+Calculo+I' },
  // Extensão de perdidos
  { id: 105, name: 'Mochila azul', description: 'Etiqueta com nome', status: 'lost', category_id: 1, location_id: 2, reported_by_id: 1, handler_id: null, reported_at: new Date(Date.now()-15*60000).toISOString(), event_date: '2025-10-29', item_image_url: 'https://placehold.co/600x400?text=Mochila+azul' },
  { id: 106, name: 'Mochila vermelha', description: 'Compartimento quebrado', status: 'lost', category_id: 1, location_id: 5, reported_by_id: 2, handler_id: null, reported_at: new Date(Date.now()-45*60000).toISOString(), event_date: '2025-10-29', item_image_url: 'https://placehold.co/600x400?text=Mochila+vermelha' },
  { id: 107, name: 'Chaves do laboratório', description: 'Com chave inglesa pequena', status: 'lost', category_id: 2, location_id: 4, reported_by_id: 1, handler_id: null, reported_at: new Date(Date.now()-90*60000).toISOString(), event_date: '2025-10-28', item_image_url: 'https://placehold.co/600x400?text=Chaves+lab' },
  { id: 108, name: 'Chaves do carro', description: 'Chave do carro com controle', status: 'lost', category_id: 2, location_id: 3, reported_by_id: 2, handler_id: null, reported_at: new Date(Date.now()-130*60000).toISOString(), event_date: '2025-10-28', item_image_url: 'https://placehold.co/600x400?text=Chaves+carro' },
  { id: 109, name: 'Fone de ouvido', description: 'Bluetooth, cor preta', status: 'lost', category_id: 3, location_id: 1, reported_by_id: 1, handler_id: null, reported_at: new Date(Date.now()-180*60000).toISOString(), event_date: '2025-10-27', item_image_url: 'https://placehold.co/600x400?text=Fone+preto' },
  { id: 110, name: 'Pendrive 32GB', description: 'Etiqueta "Trabalho"', status: 'lost', category_id: 3, location_id: 2, reported_by_id: 2, handler_id: null, reported_at: new Date(Date.now()-220*60000).toISOString(), event_date: '2025-10-27', item_image_url: 'https://placehold.co/600x400?text=Pendrive+32GB' },
  { id: 111, name: 'Calculadora científica', description: 'Casio, com arranhão', status: 'lost', category_id: 3, location_id: 4, reported_by_id: 1, handler_id: null, reported_at: new Date(Date.now()-260*60000).toISOString(), event_date: '2025-10-26', item_image_url: 'https://placehold.co/600x400?text=Calculadora' },
  { id: 112, name: 'Cabo USB-C', description: 'Cabo trançado', status: 'lost', category_id: 3, location_id: 5, reported_by_id: 2, handler_id: null, reported_at: new Date(Date.now()-300*60000).toISOString(), event_date: '2025-10-26', item_image_url: 'https://placehold.co/600x400?text=Cabo+USB-C' },
  { id: 113, name: 'Livro Álgebra Linear', description: 'Capa verde', status: 'lost', category_id: 4, location_id: 1, reported_by_id: 1, handler_id: null, reported_at: new Date(Date.now()-340*60000).toISOString(), event_date: '2025-10-25', item_image_url: 'https://placehold.co/600x400?text=Algebra+Linear' },
  { id: 114, name: 'Livro Física II', description: 'Anotações nas páginas', status: 'lost', category_id: 4, location_id: 3, reported_by_id: 2, handler_id: null, reported_at: new Date(Date.now()-380*60000).toISOString(), event_date: '2025-10-25', item_image_url: 'https://placehold.co/600x400?text=Fisica+II' },
  { id: 115, name: 'Caderno de notas', description: 'Espiral 100 folhas', status: 'lost', category_id: 4, location_id: 2, reported_by_id: 1, handler_id: null, reported_at: new Date(Date.now()-420*60000).toISOString(), event_date: '2025-10-24', item_image_url: 'https://placehold.co/600x400?text=Caderno' },
  { id: 116, name: 'Mochila cinza', description: 'Com chave do armário', status: 'lost', category_id: 1, location_id: 4, reported_by_id: 2, handler_id: null, reported_at: new Date(Date.now()-460*60000).toISOString(), event_date: '2025-10-24', item_image_url: 'https://placehold.co/600x400?text=Mochila+cinza' },
  { id: 117, name: 'Chave do armário', description: 'Etiqueta 203', status: 'lost', category_id: 2, location_id: 1, reported_by_id: 1, handler_id: null, reported_at: new Date(Date.now()-500*60000).toISOString(), event_date: '2025-10-23', item_image_url: 'https://placehold.co/600x400?text=Chave+armario' },
  { id: 118, name: 'Mouse sem fio', description: 'Logitech', status: 'lost', category_id: 3, location_id: 4, reported_by_id: 2, handler_id: null, reported_at: new Date(Date.now()-540*60000).toISOString(), event_date: '2025-10-23', item_image_url: 'https://placehold.co/600x400?text=Mouse' },
  { id: 119, name: 'Livro Cálculo II', description: 'Com marcador azul', status: 'lost', category_id: 4, location_id: 5, reported_by_id: 1, handler_id: null, reported_at: new Date(Date.now()-580*60000).toISOString(), event_date: '2025-10-22', item_image_url: 'https://placehold.co/600x400?text=Calculo+II' },
  { id: 120, name: 'Mochila roxa', description: 'Zíper lateral', status: 'lost', category_id: 1, location_id: 3, reported_by_id: 2, handler_id: null, reported_at: new Date(Date.now()-620*60000).toISOString(), event_date: '2025-10-22', item_image_url: 'https://placehold.co/600x400?text=Mochila+roxa' },
];

export const claims = [
  { id: 201, item_id: 103, claimant_id: 1, description: 'Proprietário confirmou marcações internas', status: 'approved', created_at: new Date().toISOString() },
  { id: 202, item_id: 102, claimant_id: 1, description: 'Provável dono das chaves', status: 'pending', created_at: new Date().toISOString() },
];

export const currentUserId = 1;