export default function CTABlock({ onLost, onFound, onSearch }) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onLost}
          className="inline-flex items-center justify-center h-12 px-4 rounded-lg bg-linear-to-r from-brand to-brand-dark text-white hover:shadow-md focus:ring-2 focus:ring-brand/50"
          aria-label="Reportar item perdido"
        >
          Reportar Perdido
        </button>
        <button
          onClick={onFound}
          className="inline-flex items-center justify-center h-12 px-4 rounded-lg bg-linear-to-r from-brand to-brand-dark text-white hover:shadow-md focus:ring-2 focus:ring-brand/50"
          aria-label="Reportar item encontrado"
        >
          Reportar Encontrado
        </button>
        <button
          onClick={onSearch}
          className="inline-flex items-center justify-center h-12 px-4 rounded-lg border border-brand text-brand hover:bg-brand/10 focus:ring-2 focus:ring-brand/40"
          aria-label="Buscar itens"
        >
          Buscar Itens
        </button>
      </div>
    </section>
  );
}