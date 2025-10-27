const SuggestionChips = ({ suggestions, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion.action)}
          className="group relative px-5 py-2.5 glass-panel border border-neon-green/20 hover:border-neon-green rounded-full text-sm font-medium text-gray-300 hover:text-neon-green transition-all duration-300 hover:scale-105 flex items-center gap-2 overflow-hidden animate-bounce-in active:animate-pulse-glow"
          style={{ 
            animationDelay: `${index * 80}ms`,
            animation: `bounceIn 0.5s ease-out ${index * 80}ms both`
          }}
        >
          <i className={`bx ${suggestion.icon} text-base group-hover:scale-110 transition-transform`}></i>
          <span>{suggestion.text}</span>
          <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)' }}></div>
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
