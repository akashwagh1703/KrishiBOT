import config from "../../config/app.config.json";
import { colors } from '../../utils/colors';

const MessageBubble = ({ message }) => {
  const isBot = message.sender === 'bot';

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
        
        <div className={`text-xs text-gray-400 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
