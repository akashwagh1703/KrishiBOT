import { useState } from 'react';
import classNames from 'classnames';
import { config } from '../../config';

const Message = ({ message, isBot = false }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [feedback, setFeedback] = useState(null);
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(message.text);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    console.log(`Message feedback: ${type}`, message);
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
          
          {/* Timestamp and Actions */}
          <div className={classNames(
            'flex items-center gap-2 mt-1 px-1',
            isBot ? 'justify-start' : 'justify-end'
          )}>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {formatTime(message.timestamp)}
            </span>
            
            {/* Bot Message Actions */}
            {isBot && (
              <div className="flex items-center gap-1">
                {/* Speaker Button */}
                {(config?.chat?.show_speaker_button !== false) && (
                  <button
                    onClick={handleSpeak}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    title={isSpeaking ? 'Stop' : 'Listen'}
                  >
                    <i className={classNames(
                      'text-sm',
                      isSpeaking ? 'bx bx-stop text-red-500' : 'bx bx-volume-full text-gray-500 dark:text-gray-400'
                    )}></i>
                  </button>
                )}
                
                {/* Like/Dislike Buttons */}
                {(config?.chat?.show_like_dislike !== false) && (
                  <>
                    <button
                      onClick={() => handleFeedback('like')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Like"
                    >
                      <i className={classNames(
                        'text-sm',
                        feedback === 'like' ? 'bx bxs-like text-green-500' : 'bx bx-like text-gray-500 dark:text-gray-400'
                      )}></i>
                    </button>
                    <button
                      onClick={() => handleFeedback('dislike')}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Dislike"
                    >
                      <i className={classNames(
                        'text-sm',
                        feedback === 'dislike' ? 'bx bxs-dislike text-red-500' : 'bx bx-dislike text-gray-500 dark:text-gray-400'
                      )}></i>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;