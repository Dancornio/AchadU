export default function HowItWorks() {
  const steps = [
    {
      title: 'Reporte',
      text: 'Descreva o item com palavras simples. Ex.: “mochila preta com chaveiro”. Se precisar, peça ajuda a alguém.',
      icon: (
        // Clipboard para representar o reporte/descrição
        <IconClipboardList className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      ),
    },
    {
      title: 'Confirme',
      text: 'Você recebe mensagens claras sobre o andamento. Se algo ficar difícil, peça explicação em linguagem simples.',
      icon: (
        // Confirmação com check-circle
        <IconCheckCircle className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      ),
    },
    {
      title: 'Reencontre',
      text: 'Combine um local calmo e seguro para devolver/pegar o item. Leve um acompanhante se preferir.',
      icon: (
        // Reencontro representado por aperto de mãos
        <IconHandshake className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      ),
    },
  ];
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="como-funciona" aria-describedby="como-funciona-descricao" role="region">
      <h2 id="como-funciona" className="text-xl font-semibold text-gray-900">Como funciona</h2>
      <p id="como-funciona-descricao" className="mt-1 text-sm text-gray-700">Guia rápido em linguagem simples. Siga um passo de cada vez.</p>
      <ol className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4" role="list">
        {steps.map((s, i) => (
          <li key={i} role="listitem" aria-label={`Passo ${i + 1}: ${s.title}`} className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 text-gray-900">
              <span className="inline-flex items-center justify-center h-10 w-10 aspect-square shrink-0 rounded-md bg-linear-to-r from-brand to-brand-dark text-white" aria-hidden="true">
                {s.icon}
              </span>
              <div>
                <p className="font-medium">{s.title}</p>
                <p className="text-sm text-gray-600">{s.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
import { ClipboardList as IconClipboardList, CheckCircle as IconCheckCircle, Handshake as IconHandshake } from 'lucide-react';