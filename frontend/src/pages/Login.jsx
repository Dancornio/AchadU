import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { login as apiLogin, getToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff, Sparkles, ShieldCheck, Clock, MapPin, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error'|'info', text }
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const showEmailInvalid = email.length > 0 && !emailIsValid;
  const showEmailValid = email.length > 0 && emailIsValid;

  async function onSubmit(e) {
    e.preventDefault();
    setMessage(null);
    if (!emailIsValid) {
      setMessage({ type: 'error', text: 'Informe um e-mail válido.' });
      return;
    }
    setLoading(true);
    const res = await apiLogin({ email, password });
    setLoading(false);
    if (res.ok) {
      // token é persistido pelo serviço (achadu-token)
      if (res.user) try { localStorage.setItem('achadu_user', JSON.stringify(res.user)); } catch {}
      setMessage({ type: 'success', text: 'Login realizado com sucesso.' });
      // Redireciona após breve delay
      setTimeout(() => {
        const t = getToken();
        if (t) navigate('/itens');
      }, 300);
    } else {
      setMessage({ type: 'error', text: res.error || 'Não foi possível entrar. Verifique suas credenciais.' });
    }
  }

  return (
    <div className="login-page min-h-dvh flex flex-col bg-linear-to-b from-brand/10 via-indigo-50 to-white lg:bg-none">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
        {/* Acenos de cor suaves no fundo */}
        <div className="pointer-events-none absolute inset-x-0 -top-6 hidden md:flex justify-center md:justify-end" aria-hidden="true">
          <div className="h-40 w-40 rounded-full bg-brand/20 blur-3xl" />
          <div className="h-24 w-24 rounded-full bg-indigo-300/20 blur-[48px]" />
        </div>
        <section className="max-w-7xl mx-auto relative grid grid-cols-1 md:grid-cols-12 gap-10 items-center min-h-[60vh] md:min-h-[70vh] py-6" aria-labelledby="login-title" role="region">
          {/* Coluna do formulário com estética glass e microinterações */}
          <div className="md:col-span-5 xl:col-span-5 max-w-md md:max-w-none mx-auto md:mx-0 relative rounded-2xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-xl transition-transform min-h-[420px] sm:min-h-[500px] md:min-h-[560px]">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-1.5 w-20 rounded-full bg-linear-to-r from-brand to-brand-dark" aria-hidden="true" />
            <div className="p-6 sm:p-8">
              <h1 id="login-title" className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">Entrar</h1>
              <p className="mt-1 text-sm text-gray-700">Acesse sua conta com e-mail e senha.</p>

              <form onSubmit={onSubmit} noValidate className="mt-4 sm:mt-5 space-y-4 sm:space-y-6">
                <label className="block">
                  <span className="text-sm text-gray-700">E-mail</span>
                  <div className="mt-1 flex items-center gap-3 rounded-2xl border border-gray-200 px-4 bg-white/80 shadow-sm">
                    <Mail className="h-5 w-5 text-gray-500" aria-hidden="true" />
                    <input
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      type="email"
                      autoComplete="username"
                      placeholder="seuemail@exemplo.com"
                      className="flex-1 h-12 sm:h-14 bg-transparent outline-none placeholder:text-gray-400 focus:ring-0 focus:shadow-none focus-visible:outline-none"
                      aria-invalid={showEmailInvalid ? 'true' : 'false'}
                      aria-describedby={showEmailInvalid ? 'email-error' : undefined}
                      required
                    />
                    {showEmailValid && <CheckCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />}
                    {showEmailInvalid && <XCircle className="h-5 w-5 text-rose-600" aria-hidden="true" />}
                  </div>
                  <div className="mt-1 h-6">
                    {showEmailInvalid && (
                      <p id="email-error" className="text-xs text-rose-700  rounded-md px-2 py-[2px]" role="alert" aria-live="polite">
                        Informe um e-mail válido
                      </p>
                    )}
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm text-gray-700">Senha</span>
                  <div className="mt-1 flex items-center gap-3 rounded-2xl border border-gray-200 px-4 bg-white/80 shadow-sm">
                    <Lock className="h-5 w-5 text-gray-500" aria-hidden="true" />
                    <input
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••"
                      className="flex-1 h-12 sm:h-14 bg-transparent outline-none placeholder:text-gray-400 focus:ring-0 focus:shadow-none focus-visible:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-gray-700"
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                    </button>
                  </div>
                </label>

                <div className="relative mt-3 sm:mt-24">
                  <div className="pointer-events-none absolute -top-9 left-0 right-0 flex justify-center" aria-live="polite" aria-atomic="true">
                    {message && (
                      <p className={`text-xs sm:text-sm rounded-md px-3 py-1 ${message.type==='success' ? 'text-emerald-700' : message.type==='error' ? 'bg-none ring-rose-200 text-rose-700' : 'bg-indigo-50 ring-indigo-200 text-indigo-700'}`}>{message.text}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-12 sm:h-14 w-full px-5 rounded-2xl bg-linear-to-r from-brand to-brand-dark text-white inline-flex items-center justify-center gap-2 hover:shadow-md disabled:opacity-70"
                  >
                    <LogIn className="h-5 w-5" aria-hidden="true" />
                    {loading ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>
              </form>


            </div>
          </div>

          {/* Painel visual criativo com arte em camadas e highlights */}
          <aside className="hidden md:block md:col-span-7 xl:col-span-7 relative overflow-hidden rounded-3xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-xl min-h-[420px] sm:min-h-[500px] md:min-h-[560px]">
            {/* Arte de fundo com blobs e barras de gradiente */}
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute bottom-[-40px] right-[-40px] w-80 h-80 rounded-full bg-linear-to-r from-blue-100 to-blue-500 blur-[96px] opacity-30" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_60%)]" />
            </div>

            {/* Conteúdo acima da arte */}
            <div className="relative p-8 sm:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-3 py-1 ring-1 ring-white/50 text-brand">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Bem-vindo ao AchadU</span>
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Encontre, reporte e recupere itens no campus</h2>
              <p className="mt-2 text-gray-700">O AchadU procura sempre ser o mais amigável e inclusivo possível.</p>

              <div className="mt-24 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 shadow-sm">
                  <Clock className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                  <span className="text-sm text-gray-800">Rápido</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  <span className="text-sm text-gray-800">Seguro</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 shadow-sm">
                  <MapPin className="h-4 w-4 text-pink-600" aria-hidden="true" />
                  <span className="text-sm text-gray-800">Campus</span>
                </div>
              </div>

              <a
                href="/como-funciona"
                className="mt-6 group inline-flex items-center gap-2 h-11 px-4 rounded-2xl border border-gray-200 bg-white/70 text-gray-900 shadow-sm transform transition-all duration-200 hover:bg-white hover:shadow-md hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              >
                Conheça como funciona
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}
