import { useEffect, useRef, useState } from 'react';

export default function Typewriter({
  text = '',
  speed = 35,
  startDelay = 0,
  className = '',
  reserveSpace = true,
  onComplete,
}) {
  const [shown, setShown] = useState('');
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setShown('');
    let i = 0;

    // Permite ajustar a velocidade via classe: motion-preset-typewriter-[N]
    const match = className?.match(/motion-preset-typewriter-\[(\d+)\]/);
    const effectiveSpeed = match ? Math.max(1, parseInt(match[1], 10) || speed) : speed;

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          if (onComplete) onComplete();
        }
      }, effectiveSpeed);
    }, startDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, startDelay, onComplete, className]);

  return (
    <span className="inline-block relative align-middle">
      {reserveSpace && (
        <span
          aria-hidden="true"
          className="opacity-0 select-none pointer-events-none"
        >
          {text}
        </span>
      )}
      <span className={`absolute inset-0 ${className}`}>{shown}</span>
    </span>
  );
}