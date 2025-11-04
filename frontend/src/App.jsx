import { useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CTABlock from './components/CTABlock';
import QuickSearch from './components/QuickSearch';
import LazySection from './components/LazySection';
import Footer from './components/Footer';

const ReportLostModal = lazy(() => import('./modals/ReportLostModal'));
const ReportFoundModal = lazy(() => import('./modals/ReportFoundModal'));

export default function App() {
  const [showLost, setShowLost] = useState(false);
  const [showFound, setShowFound] = useState(false);

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 space-y-4">
        <Hero />
        <CTABlock
          onLost={() => setShowLost(true)}
          onFound={() => setShowFound(true)}
          onSearch={() => {
            const el = document.getElementById('recentes');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <QuickSearch onSubmit={(q) => console.log('buscar:', q)} />

        {/* Lazy abaixo da dobra */}
        <LazySection
          loader={() => import('./components/HowItWorks')}
          fallback={<SectionSkeleton title="Como funciona" />}
          className=""
        />
        <LazySection
          loader={() => import('./components/RecentFeed')}
          fallback={<SectionSkeleton title="Recentemente encontrados" cards={6} />}
          className=""
        />
      </main>

      <Footer />

      {/* Modais com code-splitting */}
      <Suspense fallback={<ModalSkeleton />}>
        {showLost && <ReportLostModal onClose={() => setShowLost(false)} />}
        {showFound && <ReportFoundModal onClose={() => setShowFound(false)} />}
      </Suspense>
    </div>
  );
}

function SectionSkeleton({ title, cards = 3 }) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="mt-2 h-3 w-1/2 bg-gray-200 rounded" />
            <div className="mt-2 h-2 w-1/3 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ModalSkeleton() {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
        <div className="mt-3 space-y-3">
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
