import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Home, Grid3x3, HelpCircle, User as UserIcon, Plus, Menu, LogIn } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b border-gray-800 backdrop-blur-sm pointer-events-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-brand text-white" aria-label="Início">
            <Plus className="h-4 w-4" strokeWidth={2} />
          </Link>
          <span className="font-semibold text-white">AchadU</span>
        </div>
        {/* Desktop nav */}
        <nav className="text-sm text-white hidden md:flex items-center gap-2">
          <NavItem to="/" end label="Início">
            <Home className="h-4 w-4" strokeWidth={2} />
          </NavItem>
          <NavItem to="/itens" label="Itens">
            <Grid3x3 className="h-4 w-4" strokeWidth={2} />
          </NavItem>
          <NavItem to="/como-funciona" label="Como funciona">
            <HelpCircle className="h-4 w-4" strokeWidth={2} />
          </NavItem>
          <NavItem to="/login" label="Entrar">
            <LogIn className="h-4 w-4" strokeWidth={2} />
          </NavItem>
          <NavLink to="/usuario" className={({isActive}) => `h-9 px-3 rounded-lg inline-flex items-center gap-2 transition-colors border ${isActive? 'bg-linear-to-r from-brand to-brand-dark text-white shadow-sm border-transparent':'bg-white/10 border-white/20 text-white hover:bg-white/15'}`}>
            <UserIcon className="h-4 w-4" strokeWidth={2} />
            <span>Meu histórico</span>
          </NavLink>
        </nav>
        {/* Mobile toggle */}
        <button
          className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(o => !o)}
        >
          <Menu className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      {/* Mobile nav panel */}
      {open && (
        <div id="mobile-menu" className="md:hidden absolute left-0 right-0 top-14 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 grid grid-cols-2 gap-2">
            <NavLink to="/" end onClick={() => setOpen(false)} className={({isActive}) => `h-10 px-3 rounded-lg inline-flex items-center gap-2 border ${isActive? 'bg-linear-to-r from-brand to-indigo-600 text-white shadow-sm border-transparent':'bg-white/10 border-white/20 text-white hover:bg-white/15'}`}>
              <Home className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              <span>Início</span>
            </NavLink>
            <NavLink to="/itens" onClick={() => setOpen(false)} className={({isActive}) => `h-10 px-3 rounded-lg inline-flex items-center gap-2 border ${isActive? 'bg-linear-to-r from-brand to-indigo-600 text-white shadow-sm border-transparent':'bg-white/10 border-white/20 text-white hover:bg-white/15'}`}>
              <Grid3x3 className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              <span>Itens</span>
            </NavLink>
            <NavLink to="/como-funciona" onClick={() => setOpen(false)} className={({isActive}) => `h-10 px-3 rounded-lg inline-flex items-center gap-2 border ${isActive? 'bg-linear-to-r from-brand to-indigo-600 text-white shadow-sm border-transparent':'bg-white/10 border-white/20 text-white hover:bg-white/15'}`}>
              <HelpCircle className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              <span>Como funciona</span>
            </NavLink>
            <NavLink to="/login" onClick={() => setOpen(false)} className={({isActive}) => `h-10 px-3 rounded-lg inline-flex items-center gap-2 border ${isActive? 'bg-linear-to-r from-brand to-indigo-600 text-white shadow-sm border-transparent':'bg-white/10 border-white/20 text-white hover:bg-white/15'}`}>
              <LogIn className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              <span>Entrar</span>
            </NavLink>
            <NavLink to="/usuario" onClick={() => setOpen(false)} className={({isActive}) => `h-10 px-3 rounded-lg inline-flex items-center gap-2 border ${isActive? 'bg-linear-to-r from-brand to-indigo-600 text-white shadow-sm border-transparent':'bg-white/10 border-white/20 text-white hover:bg-white/15'}`}>
              <UserIcon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              <span>Meu histórico</span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, label, children, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `h-9 px-3 rounded-lg inline-flex items-center gap-2 transition-colors border ` +
        (isActive
          ? 'bg-linear-to-r from-brand to-indigo-600 text-white shadow-sm border-transparent'
          : 'bg-white/10 border-white/20 text-white hover:bg-white/15')
      }
    >
      {children}
      <span>{label}</span>
    </NavLink>
  );
}