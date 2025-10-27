import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatStore } from '../../state/store';
import { config } from '../../config';
import ChatAdapter from '../../services/chatAdapter';
import Message from './Message';
import QuickReplies from './QuickReplies';
import Button from '../ui/Button';

const ChatWidget = () => {
  const { t } = useTranslation();
  const { messages, isTyping, addMessage, setTyping } = useChatStore();
  const [inputValue, setInputValue] = useState('');
  const [chatAdapter] = useState(() => new ChatAdapter());
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    if (config.chat.auto_scroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        text: "Hello! I'm KisanBot, your smart farming assistant. I'm here to help you with weather information, government schemes, and crop protection. What would you like to know today?",
        timestamp: new Date().toISOString(),
        sender: 'bot',
        quickReplies: ['Weather Update', 'Government Schemes', 'Crop Protection', 'General Help'],
      };
      addMessage(welcomeMessage);
    }
  }, []);

  const handleSendMessage = async (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage = {
      text: messageText,
      timestamp: new Date().toISOString(),
      sender: 'user',
    };
    addMessage(userMessage);
    setInputValue('');

    setTyping(true);

    try {
      const botResponse = await chatAdapter.sendMessage(messageText, messages);
      addMessage(botResponse);
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        text: "I'm having trouble processing your message right now. Please try again in a moment.",
        timestamp: new Date().toISOString(),
        sender: 'bot',
      });
    } finally {
      setTyping(false);
    }
  };

  const handleQuickReply = reply => {
    handleSendMessage(reply);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const lastBotMessage = messages.filter(m => m.sender === 'bot').pop();

  return (
    <div className="flex flex-col h-full bg-dark-950/50">
      {/* Chat Header */}
      <div className="glass-panel flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center space-x-3">
          {/* <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft">
            <img src={config.branding.logo_icon} alt="Logo" className="w-10 h-10" />
          </div> */}
          <div>
            <h3 className="font-bold text-white glow-text">
              {config.branding.app_name}
            </h3>
            <p className="text-sm text-neon-green">
              {isTyping ? 'Typing...' : '● Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <Message key={message.id} message={message} isBot={message.sender === 'bot'} />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-slide-in">
            <div className="glass-panel px-4 py-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Replies */}
        {config.chat.quick_replies_enabled && lastBotMessage?.quickReplies && !isTyping && (
          <div className="animate-fade-in">
            <QuickReplies replies={lastBotMessage.quickReplies} onReplyClick={handleQuickReply} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-panel border-t border-white/5 p-4">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('typeMessage')}
              className="input-glow resize-none min-h-[44px] max-h-32 pr-12"
              rows="1"
              style={{
                height: 'auto',
                minHeight: '44px',
              }}
              onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
          </div>

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="btn-neon p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="bx bx-send"></i>
          </button>
        </div>

        <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
          <span>Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
