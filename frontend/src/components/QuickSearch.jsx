import { useState } from 'react';

export default function QuickSearch({ onSubmit }) {
  const [q, setQ] = useState('');
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(q);
        }}
        className="flex gap-2"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          placeholder="Ex.: mochila preta, chaves, carteira"
          className="flex-1 md:max-w-[520px] h-12 rounded-xl border border-gray-200 px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:ring-2 focus:ring-brand/50"
          aria-label="Buscar itens encontrados"
        />
        <button
          className="h-12 px-5 rounded-xl bg-linear-to-r from-brand to-brand-dark text-white shadow-sm hover:shadow-md transition-shadow"
          type="submit"
        >
          Buscar
        </button>
      </form>
    </section>
  );
}