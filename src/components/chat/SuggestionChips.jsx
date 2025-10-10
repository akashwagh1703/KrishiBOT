const SuggestionChips = ({ suggestions, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3 animate-slide-up">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion.action)}
          className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:scale-105 shadow-sm flex items-center space-x-2"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <span>{suggestion.icon}</span>
          <span>{suggestion.text}</span>
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
