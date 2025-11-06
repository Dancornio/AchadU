import Header from '../components/Header';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';
import { CheckCircle } from 'lucide-react';

export default function How() {
  return (
    <div className="min-h-dvh flex flex-col bg-linear-to-b from-brand/10 via-fuchsia-50 to-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm p-4 sm:p-6" aria-labelledby="como-funciona-title" aria-describedby="como-funciona-intro" role="region">
          <h1 id="como-funciona-title" className="text-2xl sm:text-3xl font-semibold text-gray-900">Como funciona</h1>
          <p id="como-funciona-intro" className="mt-1 text-sm sm:text-base text-gray-700">Guia em linguagem simples para reportar e reencontrar itens no campus. Leia com calma, um passo de cada vez.</p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="flex items-start gap-2 rounded-xl bg-white/70 ring-1 ring-gray-200 px-3 py-2">
              <CheckCircle className="mt-[2px] h-5 w-5 text-emerald-600" aria-hidden="true" />
              <span className="text-sm text-gray-800">Use frases curtas e palavras simples.</span>
            </li>
            <li className="flex items-start gap-2 rounded-xl bg-white/70 ring-1 ring-gray-200 px-3 py-2">
              <CheckCircle className="mt-[2px] h-5 w-5 text-emerald-600" aria-hidden="true" />
              <span className="text-sm text-gray-800">Se precisar, peça ajuda de um colega ou servidor.</span>
            </li>
            <li className="flex items-start gap-2 rounded-xl bg-white/70 ring-1 ring-gray-200 px-3 py-2">
              <CheckCircle className="mt-[2px] h-5 w-5 text-emerald-600" aria-hidden="true" />
              <span className="text-sm text-gray-800">Você pode voltar e revisar as informações com tranquilidade.</span>
            </li>
          </ul>
        </section>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}