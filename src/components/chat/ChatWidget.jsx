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
    <div className="flex flex-col h-full bg-gradient-to-b from-indigo-50 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          {/* <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft">
            <img src={config.branding.logo_icon} alt="Logo" className="w-10 h-10" />
          </div> */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {config.branding.app_name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <i className="bx bx-phone text-gray-500 dark:text-gray-400"></i>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <i className="bx bx-dots-vertical-rounded text-gray-500 dark:text-gray-400"></i>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <Message key={message.id} message={message} isBot={message.sender === 'bot'} />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-soft">
                <img src={config.branding.logo_icon} alt="Logo" className="w-8 h-8" />
              </div>
              <div className="chat-bubble bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
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
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('typeMessage')}
              className="input-field resize-none min-h-[44px] max-h-32 pr-12"
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
            {config.features.voice_input && (
              <button
                onClick={() => alert('Voice input coming soon!')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <i className="bx bx-microphone text-gray-500 dark:text-gray-400"></i>
              </button>
            )}
          </div>

          {config.features.file_upload && (
            <button
              onClick={() => alert('Attach files coming soon!')}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <i className="bx bx-paperclip text-gray-500 dark:text-gray-400"></i>
            </button>
          )}

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl transition-all duration-200 shadow-soft hover:shadow-glow disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
          >
            <i className="bx bx-send"></i>
          </button>
        </div>

        {/* Suggested Actions */}
        <div className="flex items-center justify-center mt-3 space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <i className="bx bx-info-circle mr-1"></i>
            Press Enter to send
          </span>
          <span className="flex items-center">
            <i className="bx bx-microphone mr-1"></i>
            Voice input available
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
