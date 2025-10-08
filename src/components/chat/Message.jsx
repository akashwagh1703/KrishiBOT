import classNames from 'classnames';

const Message = ({ message, isBot = false }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={classNames('flex mb-4 animate-fade-in', isBot ? 'justify-start' : 'justify-end')}>
      <div className={classNames('flex max-w-xs lg:max-w-md', isBot ? 'flex-row' : 'flex-row-reverse')}>
        {/* Avatar */}
        <div className={classNames('flex-shrink-0', isBot ? 'mr-3' : 'ml-3')}>
          <div className={classNames(
            'w-8 h-8 rounded-full flex items-center justify-center shadow-soft',
            isBot 
              ? 'bg-gradient-to-r from-primary-500 to-primary-600' 
              : 'bg-gradient-to-r from-accent-500 to-accent-600'
          )}>
            {isBot ? (
              <i className="bx bx-bot text-white text-sm"></i>
            ) : (
              <i className="bx bx-user text-white text-sm"></i>
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex flex-col">
          <div className={classNames(
            'chat-bubble relative',
            isBot 
              ? 'bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 text-gray-900 dark:text-white' 
              : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white border-0'
          )}>
            {/* Message Tail */}
            <div className={classNames(
              'absolute top-3 w-3 h-3 transform rotate-45',
              isBot 
                ? '-left-1 bg-white dark:bg-surface-700 border-l border-b border-surface-200 dark:border-surface-600' 
                : '-right-1 bg-gradient-to-br from-primary-500 to-primary-600'
            )}></div>
            
            <div className="relative z-10">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.text}
              </p>
            </div>
          </div>
          
          {/* Timestamp */}
          <div className={classNames(
            'text-xs text-gray-400 dark:text-gray-500 mt-1 px-1',
            isBot ? 'text-left' : 'text-right'
          )}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;