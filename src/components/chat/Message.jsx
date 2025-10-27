import classNames from 'classnames';

const Message = ({ message, isBot = false }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={classNames('flex mb-4 animate-slide-in', isBot ? 'justify-start' : 'justify-end')}>
      <div className={classNames('flex max-w-xs lg:max-w-md', isBot ? 'flex-row' : 'flex-row-reverse')}>
        {/* Message Content */}
        <div className="flex flex-col">
          <div className={classNames(
            'chat-bubble',
            isBot 
              ? 'glass-panel text-gray-100' 
              : 'bg-gradient-to-r from-neon-green to-neon-lime text-dark-950 font-medium'
          )}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.text}
            </p>
          </div>
          
          <div className={classNames(
            'text-xs text-gray-500 mt-1 px-1',
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