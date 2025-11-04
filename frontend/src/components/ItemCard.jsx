import { Link } from 'react-router-dom';

export default function ItemCard({ id, title, location, time, imageUrl }) {
  const CardInner = (
    <div className="group border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-transform hover:-translate-y-px overflow-hidden">
      {imageUrl && (
        <div className="relative w-full aspect-4/3 sm:aspect-video bg-gray-100">
          <img
            src={imageUrl}
            alt={`Imagem do item: ${title}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-3 sm:p-4">
        <p className="font-medium text-gray-900 line-clamp-2">{title}</p>
        <p className="text-sm text-gray-600">{location}</p>
        {time && <p className="text-xs text-gray-500 mt-1">{time}</p>}
      </div>
    </div>
  );

  return id ? (
    <Link to={`/itens/${id}`} aria-label={`Ver detalhes de ${title}`}>{CardInner}</Link>
  ) : (
    CardInner
  );
}