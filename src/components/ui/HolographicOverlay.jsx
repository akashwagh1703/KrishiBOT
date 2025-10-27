import { useEffect, useRef } from 'react';

const HolographicOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let scanLine = 0;
    let glitchOffset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Scanning line effect
      scanLine = (scanLine + 2) % canvas.height;
      const gradient = ctx.createLinearGradient(0, scanLine - 50, 0, scanLine + 50);
      gradient.addColorStop(0, 'rgba(0, 255, 136, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 136, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanLine - 50, canvas.width, 100);
      
      // Random glitch lines
      if (Math.random() > 0.98) {
        glitchOffset = Math.random() * 10 - 5;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.fillRect(glitchOffset, y, canvas.width, 2);
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30 mix-blend-screen" />;
};

export default HolographicOverlay;
