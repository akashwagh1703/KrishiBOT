import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const fullText = 'Transform Agriculture with AI';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: 'bx-brain', title: 'AI Insights', desc: 'Real-time analysis' },
    { icon: 'bx-cloud-rain', title: 'Weather', desc: 'Smart forecasting' },
    { icon: 'bx-shield-alt-2', title: 'Protection', desc: 'Disease detection' },
    { icon: 'bx-file-blank', title: 'Schemes', desc: 'Gov benefits' }
  ];

  return (
    <div className="h-screen bg-dark-950 relative overflow-hidden flex flex-col">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-green/15 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neon-cyan/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[150px] animate-float" style={{ animationDelay: '6s' }}></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 255, 136, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridMove 30s linear infinite'
        }}></div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark-950/50"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/10 backdrop-blur-xl bg-dark-950/80' : 'border-b border-white/[0.05] backdrop-blur-xl bg-dark-950/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            {/* <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-morph"></div>
              <i className="bx bx-leaf text-xl text-neon-green relative z-10 group-hover:text-dark-950 transition-colors duration-300"></i>
            </div> */}
            <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-cyan rounded-xl flex items-center justify-center mx-auto mb-4 animate-morph">
              <i className="bx bx-leaf text-3xl text-dark-950 font-bold"></i>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">KrishiBot</span>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/login')} className="px-5 py-2.5 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              Sign in
            </button>
            <button onClick={() => navigate('/login')} className="group relative px-6 py-2.5 text-sm bg-gradient-to-r from-neon-green to-neon-cyan text-dark-950 rounded-lg font-semibold overflow-hidden hover:shadow-lg hover:shadow-neon-green/30 transition-all">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Hero */}
        <section className="relative z-10 px-4 sm:px-6 pt-32 sm:pt-40 pb-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse"></div>
              <span className="text-xs text-gray-400">AI-Powered Agriculture</span>
            </div> */}
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                {typedText}
              </span>
              <span className="animate-pulse text-neon-green">|</span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Get instant insights on weather, crops, and government schemes with our intelligent farming assistant
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button onClick={() => navigate('/login')} className="group relative px-8 py-4 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-950 rounded-xl font-bold hover:shadow-2xl hover:shadow-neon-green/50 transition-all text-base overflow-hidden hover:scale-105">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start for free
                  <i className="bx bx-right-arrow-alt text-xl group-hover:translate-x-1 transition-transform"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-green opacity-0 group-hover:opacity-100 transition-opacity animate-morph"></div>
              </button>
              <button className="group px-8 py-4 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 hover:border-neon-green/50 transition-all text-base backdrop-blur-sm relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View demo
                  <i className="bx bx-play-circle text-xl group-hover:scale-110 transition-transform"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative z-10 px-4 sm:px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.08] hover:border-neon-green/50 transition-all duration-500 cursor-pointer relative overflow-hidden animate-slide-in hover:scale-105 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-green/0 to-neon-cyan/0 group-hover:from-neon-green/10 group-hover:to-neon-cyan/10 transition-all duration-500 animate-morph"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-neon-green/30">
                      <i className={`bx ${feature.icon} text-2xl text-neon-green group-hover:animate-pulse`}></i>
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 group-hover:text-neon-green transition-colors">{feature.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-neon-green/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative z-10 px-4 sm:px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-10 relative overflow-hidden group hover:border-neon-green/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 via-transparent to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-morph"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-neon-green/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex justify-around gap-8">
                <div className="text-center group/stat cursor-pointer">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent mb-3 group-hover/stat:scale-125 transition-transform duration-300">10K+</div>
                  <div className="text-gray-400 text-sm font-semibold">Farmers</div>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                <div className="text-center group/stat cursor-pointer">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent mb-3 group-hover/stat:scale-125 transition-transform duration-300">50K+</div>
                  <div className="text-gray-400 text-sm font-semibold">Queries</div>
                </div>
                <div className="w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                <div className="text-center group/stat cursor-pointer">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent mb-3 group-hover/stat:scale-125 transition-transform duration-300">99%</div>
                  <div className="text-gray-400 text-sm font-semibold">Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.05] backdrop-blur-xl bg-dark-950/50 py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-xs">
          <p>© 2024 KrishiBot AI</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
