const QuickReplies = ({ replies, onReplyClick }) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-slide-up">
      <div className="text-xs text-gray-500 dark:text-gray-400 w-full mb-2 flex items-center">
        <i className="bx bx-bulb mr-1"></i>
        Quick suggestions:
      </div>
      {replies.map((reply, index) => (
        <button
          key={index}
          onClick={() => onReplyClick(reply)}
          className="inline-flex items-center px-3 py-2 bg-white dark:bg-surface-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-surface-200 dark:border-surface-600 hover:border-primary-300 dark:hover:border-primary-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200 shadow-soft hover:shadow-md transform hover:scale-105"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <i className="bx bx-right-arrow-alt mr-1 text-xs"></i>
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;