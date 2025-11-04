import { Grid3x3, Package, Key, Laptop, Book } from 'lucide-react';

const palette = {
  all: { idle: 'bg-slate-100 text-slate-700', active: 'bg-gradient-to-r from-slate-700 to-gray-900 text-white' },
  1: { idle: 'bg-blue-50 text-blue-700', active: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' },
  2: { idle: 'bg-amber-50 text-amber-800', active: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' },
  3: { idle: 'bg-violet-50 text-violet-700', active: 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' },
  4: { idle: 'bg-emerald-50 text-emerald-700', active: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' },
};

const icons = { all: Grid3x3, 1: Package, 2: Key, 3: Laptop, 4: Book };

export default function CategoryChips({
  categories,
  value,
  onChange,
  showAll = false,
  size = 'md',
  className = '',
}) {
  const chips = [
    ...(showAll ? [{ id: 'all', name: 'Todas' }] : []),
    ...categories.map((c) => ({ id: c.id, name: c.name })),
  ];

  const h = size === 'sm' ? 'h-9' : 'h-10';
  const px = size === 'sm' ? 'px-3' : 'px-3';
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div
      className={`flex gap-2 overflow-x-auto whitespace-nowrap -mx-1 px-1 md:flex-wrap md:overflow-visible md:whitespace-normal ${className}`}
      role="group"
      aria-label="Filtrar por categoria"
    >
      {chips.map((ch) => {
        const active = String(value) === String(ch.id);
        const pal = palette[ch.id] || palette.all;
        const Icon = icons[ch.id] || Grid3x3;
        return (
          <button
            key={ch.id}
            onClick={() => onChange?.(ch.id)}
            aria-pressed={active}
            className={`${h} ${px} rounded-full inline-flex items-center gap-2 shrink-0 ${active ? pal.active : pal.idle} hover:opacity-90`}
          >
            <Icon className={`${iconSize}`} strokeWidth={2} aria-hidden="true" />
            <span className="text-sm">{ch.name}</span>
          </button>
        );
      })}
    </div>
  );
}