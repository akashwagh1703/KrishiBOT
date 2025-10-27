import { useEffect, useRef } from 'react';

const QuantumField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      energy: Math.random()
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.energy = (node.energy + 0.01) % 1;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Quantum node
        const size = 2 + node.energy * 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, ${136 + node.energy * 119}, ${0.6 + node.energy * 0.4})`;
        ctx.fill();

        // Energy field connections
        nodes.slice(i + 1).forEach(node2 => {
          const dx = node.x - node2.x;
          const dy = node.y - node2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const energySync = (node.energy + node2.energy) / 2;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = `rgba(0, 255, ${136 + energySync * 119}, ${0.2 * (1 - dist / 150) * energySync})`;
            ctx.lineWidth = 1 + energySync;
            ctx.stroke();

            // Energy pulse
            if (energySync > 0.8) {
              const midX = (node.x + node2.x) / 2;
              const midY = (node.y + node2.y) / 2;
              ctx.beginPath();
              ctx.arc(midX, midY, 3, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(0, 255, 255, ${energySync})`;
              ctx.fill();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30 mix-blend-screen" />;
};

export default QuantumField;
