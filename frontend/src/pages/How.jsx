import Header from '../components/Header';
import Footer from '../components/Footer';
import HowItWorks from '../components/HowItWorks';

export default function How() {
  return (
    <div className="min-h-dvh flex flex-col bg-linear-to-b from-brand/10 via-fuchsia-50 to-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-6" aria-labelledby="como-funciona-title" aria-describedby="como-funciona-intro" role="region">
          <h1 id="como-funciona-title" className="text-xl font-semibold text-gray-900">Como funciona</h1>
          <p id="como-funciona-intro" className="mt-1 text-sm text-gray-700">Guia em linguagem simples para reportar e reencontrar itens no campus. Leia com calma, um passo de cada vez.</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Use frases curtas e palavras simples.</li>
            <li>Se precisar, peça ajuda de um colega ou servidor.</li>
            <li>Você pode voltar e revisar as informações com tranquilidade.</li>
          </ul>
        </section>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}