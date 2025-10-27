const GuidedFlowCard = ({ icon, title, description, onClick, delay = 0 }) => {
  return (
    <button
      onClick={onClick}
      className="group relative premium-card rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-slide-in hover-lift"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/0 via-neon-cyan/0 to-neon-blue/0 group-hover:from-neon-green/5 group-hover:via-neon-cyan/5 group-hover:to-neon-blue/5 rounded-2xl transition-all duration-500"></div>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 40px rgba(0, 255, 136, 0.2)' }}></div>
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 group-hover:animate-float">
          <i className={`bx ${icon} text-4xl text-neon-green group-hover:text-neon-cyan transition-colors duration-500`}></i>
        </div>
        
        <h3 className="text-xl font-bold text-white group-hover:text-neon-green transition-colors duration-300 tracking-tight">
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-light leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center gap-2 text-gray-500 group-hover:text-neon-green transition-colors duration-300">
          <span className="text-xs font-medium tracking-wide">Explore</span>
          <i className="bx bx-right-arrow-alt text-xl group-hover:translate-x-1 transition-transform duration-300"></i>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-blue rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </button>
  );
};

export default GuidedFlowCard;
