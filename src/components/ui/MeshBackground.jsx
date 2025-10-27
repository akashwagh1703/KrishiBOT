import { useEffect, useRef } from 'react';

const MeshBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 15;
      const y = (clientY / window.innerHeight - 0.5) * 15;
      containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 opacity-25 transition-transform duration-500 ease-out">
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-neon-green/15 rounded-full animate-float" style={{ filter: 'blur(100px)' }}></div>
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-neon-cyan/15 rounded-full animate-float" style={{ animationDelay: '2s', filter: 'blur(100px)' }}></div>
        <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-neon-blue/15 rounded-full animate-float" style={{ animationDelay: '4s', filter: 'blur(100px)' }}></div>
      </div>
      
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-neon-green/40 to-transparent animate-glow-pulse" style={{ boxShadow: '0 0 15px rgba(0, 255, 136, 0.4)' }}></div>
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan/40 to-transparent animate-glow-pulse" style={{ animationDelay: '1s', boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)' }}></div>
    </div>
  );
};

export default MeshBackground;
