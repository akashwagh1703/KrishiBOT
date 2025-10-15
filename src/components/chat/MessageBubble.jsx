import { useState } from 'react';
import config from "../../config/app.config.json";
import { colors } from '../../utils/colors';

const MessageBubble = ({ message }) => {
  const isBot = message.sender === 'bot';
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [feedback, setFeedback] = useState(null);

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
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div className={`max-w-2xl ${isBot ? 'order-2' : 'order-1'}`}>
        {isBot && (
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-8 h-8 ${colors.gradientPrimary} rounded-full flex items-center justify-center`}>
              <i className="bx bx-bot text-white text-sm"></i>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{config.branding.app_name}</span>
          </div>
        )}
        
        <div
          className={`px-5 py-4 rounded-2xl shadow-soft ${
            isBot
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none'
              : `${colors.gradientPrimary} text-white rounded-tr-none`
          }`}
        >
          <div className="text-sm whitespace-pre-wrap">
            {message.text.split('**').map((part, index) =>
              index % 2 === 1 ? <strong key={index}>{part}</strong> : part
            )}
          </div>
          
          {message.button && (
            <a
              href={message.button.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center mt-3 px-4 py-2 ${colors.gradientPrimary} text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium`}
            >
              <i className="bx bx-link-external mr-2"></i>
              {message.button.text}
            </a>
          )}
        </div>
        
        <div className={`flex items-center gap-2 mt-1 ${isBot ? 'justify-start' : 'justify-end'}`}>
          <span className="text-xs text-gray-400">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          
          {isBot && (
            <div className="flex items-center gap-1">
              {config.chat?.show_speaker_button && (
                <button
                  onClick={handleSpeak}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  title={isSpeaking ? 'Stop' : 'Listen'}
                >
                  <i className={`text-sm ${isSpeaking ? 'bx bx-stop text-red-500' : 'bx bx-volume-full text-gray-500 dark:text-gray-400'}`}></i>
                </button>
              )}
              
              {config.chat?.show_like_dislike && (
                <>
                  <button
                    onClick={() => handleFeedback('like')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    title="Like"
                  >
                    <i className={`text-sm ${feedback === 'like' ? 'bx bxs-like text-green-500' : 'bx bx-like text-gray-500 dark:text-gray-400'}`}></i>
                  </button>
                  <button
                    onClick={() => handleFeedback('dislike')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    title="Dislike"
                  >
                    <i className={`text-sm ${feedback === 'dislike' ? 'bx bxs-dislike text-red-500' : 'bx bx-dislike text-gray-500 dark:text-gray-400'}`}></i>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
