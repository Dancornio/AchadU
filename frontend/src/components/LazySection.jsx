import { useEffect, useMemo, useRef, useState, Suspense, lazy } from 'react';

export default function LazySection({ loader, fallback = null, className }) {
  const LazyComp = useMemo(() => (loader ? lazy(loader) : null), [loader]);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible && LazyComp ? (
        <Suspense fallback={fallback}><LazyComp /></Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}