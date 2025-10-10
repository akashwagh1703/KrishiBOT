const SuggestionChips = ({ suggestions, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-3 animate-slide-up">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion.action)}
          className="group relative px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 border-2 border-green-200 dark:border-green-600 rounded-2xl text-sm font-semibold text-gray-800 dark:text-white hover:from-green-500 hover:to-emerald-600 hover:text-white hover:border-green-500 dark:hover:from-green-600 dark:hover:to-emerald-700 transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-md flex items-center space-x-2 overflow-hidden"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <span className="text-xl group-hover:scale-125 transition-transform duration-300">{suggestion.icon}</span>
          <span className="relative z-10">{suggestion.text}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-white/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
