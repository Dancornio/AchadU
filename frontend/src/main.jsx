import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

const User = lazy(() => import('./pages/User.jsx'));
const Items = lazy(() => import('./pages/Items.jsx'));
const ItemDetails = lazy(() => import('./pages/ItemDetails.jsx'));
const Lost = lazy(() => import('./pages/Lost.jsx'));
const How = lazy(() => import('./pages/How.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/usuario"
          element={
            <Suspense fallback={<div className="p-6">Carregando usuário...</div>}>
              <User />
            </Suspense>
          }
        />
        <Route
          path="/itens"
          element={
            <Suspense fallback={<div className="p-6">Carregando itens...</div>}>
              <Items initialStatus="all" title="Itens do campus" />
            </Suspense>
          }
        />
        <Route
          path="/itens/:id"
          element={
            <Suspense fallback={<div className="p-6">Carregando item...</div>}>
              <ItemDetails />
            </Suspense>
          }
        />
        <Route
          path="/perdidos"
          element={
            <Suspense fallback={<div className="p-6">Carregando perdidos...</div>}>
              <Lost />
            </Suspense>
          }
        />
        <Route
          path="/como-funciona"
          element={
            <Suspense fallback={<div className="p-6">Carregando guia...</div>}>
              <How />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div className="p-6">Carregando login...</div>}>
              <Login />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
