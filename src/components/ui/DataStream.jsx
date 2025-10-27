import { useEffect, useRef } from 'react';

const DataStream = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = '01アイウエオカキクケコ農業';
    const streams = Array.from({ length: 15 }, (_, i) => ({
      x: (i / 15) * 100,
      speed: 0.5 + Math.random() * 1,
      chars: Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)])
    }));

    const updateStreams = () => {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = streams.map((stream, i) => 
        `<div class="absolute text-neon-green/20 text-xs font-mono whitespace-nowrap animate-fade-in" style="left: ${stream.x}%; top: ${(Date.now() * stream.speed / 100) % 120 - 20}%; animation-delay: ${i * 100}ms">${stream.chars.join('')}</div>`
      ).join('');
    };

    const interval = setInterval(updateStreams, 100);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden opacity-40" />;
};

export default DataStream;
