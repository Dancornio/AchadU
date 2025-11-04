// Usando logo remota diretamente no atributo src, sem importar arquivo local

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <p>AchadU • Serviço de achados e perdidos da Undf.</p>
          <img
            src="https://academico.undf.edu.br/miolo20//cliente/iReport/basic/images/logopequeno.png"
            alt="Logo Undf"
            className="h-10 w-auto object-contain select-none place-self-center"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            referrerPolicy="no-referrer"
            draggable="false"
          />
        </div>
        <p className="mt-2">Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}