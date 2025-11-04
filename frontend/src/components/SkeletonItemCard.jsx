export default function SkeletonItemCard() {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white animate-pulse">
      <div className="h-4 w-2/3 bg-gray-200 rounded" />
      <div className="mt-2 h-3 w-1/2 bg-gray-200 rounded" />
      <div className="mt-2 h-2 w-1/3 bg-gray-200 rounded" />
    </div>
  );
}