import config from "../../config/app.config.json";

const MessageBubble = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-slide-in animate-fade-in`}>
      <div className={`max-w-3xl ${isBot ? 'order-2' : 'order-1'}`}>
        {isBot && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-cyan p-0.5 shadow-lg shadow-neon-green/20 animate-morph">
              <div className="w-full h-full bg-dark-900 flex items-center justify-center" style={{ borderRadius: 'inherit' }}>
                <i className="bx bx-bot text-neon-green text-sm"></i>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-400">{config.branding.app_name} <span className="text-xs text-neon-green/70">AI</span></span>
          </div>
        )}
        
        <div className={`chat-bubble hover-lift relative overflow-hidden ${
            isBot
              ? 'glass-panel border border-white/10 text-gray-100 rounded-tl-none'
              : 'bg-gradient-to-r from-neon-green to-neon-cyan text-dark-950 rounded-tr-none font-medium'
          }`}>
          {isBot && <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>}
          <div className="text-sm whitespace-pre-wrap leading-relaxed relative z-10">
            {message.text.split('**').map((part, index) =>
              index % 2 === 1 ? <strong key={index} className="font-bold text-neon-green">{part}</strong> : part
            )}
          </div>
          
          {message.button && (
            <a
              href={message.button.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-3 btn-ghost text-xs"
            >
              <i className="bx bx-link-external mr-2"></i>
              {message.button.text}
            </a>
          )}
        </div>
        
        <div className={`text-xs text-gray-500 mt-1.5 ${isBot ? 'text-left' : 'text-right'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
