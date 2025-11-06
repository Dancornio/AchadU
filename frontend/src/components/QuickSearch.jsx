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
        className="mx-auto max-w-[720px] flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-2"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          placeholder="Ex.: mochila preta, chaves, carteira"
          className="w-full sm:flex-1 sm:max-w-[520px] h-12 rounded-2xl border border-gray-200 px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:ring-2 focus:ring-brand/50"
          aria-label="Buscar itens encontrados"
        />
        <button
          className="h-12 w-full sm:w-auto min-w-[140px] px-5 rounded-2xl bg-linear-to-r from-brand to-brand-dark text-white shadow-sm hover:shadow-md transition-shadow"
          type="submit"
        >
          Buscar
        </button>
      </form>
    </section>
  );
}