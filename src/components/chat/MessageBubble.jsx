const MessageBubble = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div className={`max-w-2xl ${isBot ? 'order-2' : 'order-1'}`}>
        {isBot && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <i className="bx bx-bot text-white text-sm"></i>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">KrishiBot</span>
          </div>
        )}
        
        <div
          className={`px-5 py-4 rounded-2xl shadow-soft ${
            isBot
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-tr-none'
          }`}
        >
          <div className="text-sm whitespace-pre-wrap">
            {message.text.split('**').map((part, index) =>
              index % 2 === 1 ? <strong key={index}>{part}</strong> : part
            )}
          </div>
        </div>
        
        <div className={`text-xs text-gray-400 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
