import { useEffect, useState } from 'react';

const NeuralPulse = () => {
  const [pulses, setPulses] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulses(prev => [...prev.slice(-5), {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pulses.map(pulse => (
        <div
          key={pulse.id}
          className="absolute w-2 h-2"
          style={{ left: `${pulse.x}%`, top: `${pulse.y}%` }}
        >
          <div className="absolute inset-0 rounded-full bg-neon-green animate-ping" style={{ animationDelay: `${pulse.delay}s` }}></div>
          <div className="absolute inset-0 rounded-full bg-neon-cyan animate-ping" style={{ animationDelay: `${pulse.delay + 0.5}s` }}></div>
        </div>
      ))}
    </div>
  );
};

export default NeuralPulse;
