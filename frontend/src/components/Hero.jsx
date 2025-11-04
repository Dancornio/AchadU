import bg1 from '../assets/IMG/background-l1.jpg';
import bg2 from '../assets/IMG/background-l2.jpg';
import bg3 from '../assets/IMG/background-l3.jpg';
import bg4 from '../assets/IMG/background-l4.jpg';
import bg5 from '../assets/IMG/background-l5.jpg';
import Typewriter from './Typewriter.jsx';



export default function Hero() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-gray-200 min-h-[320px] sm:min-h-[400px] md:min-h-[480px]"
      >
        {/* Camadas de fundo com crossfade suave */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fade-1"
            style={{ backgroundImage: `url(${bg1})` }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fade-2"
            style={{ backgroundImage: `url(${bg2})` }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fade-3"
            style={{ backgroundImage: `url(${bg3})` }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fade-4"
            style={{ backgroundImage: `url(${bg4})` }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fade-5"
            style={{ backgroundImage: `url(${bg5})` }}
          />
        </div>
        <div className="relative z-10 max-w-prose mx-auto p-8 sm:p-10 text-center">
          <h1 className="josefin-sans-test whitespace-nowrap text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Perdeu ou encontrou? Resolva agora.
          </h1>
          <p className="mt-3 text-gray-700">
            <Typewriter
              text="AchadU é o sistema moderno e leve de achados e perdidos do campus. Em poucos segundos, reporte um item ou busque por registros."
              speed={35}
            />
          </p>
        </div>
      </div>
    </section>
  );
}