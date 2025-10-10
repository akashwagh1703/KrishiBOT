import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { schemesAPI, handleAPIError } from '../../services/api';
import Button from '../../components/ui/Button';

const SchemesPage = () => {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadSchemes();
    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadSchemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await schemesAPI.getAll();
      setSchemes(data);
    } catch (err) {
      setError(handleAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  const initializeChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      text: "Hello! I'm here to help you explore government schemes for farmers. Please select a scheme from the dropdown below to learn more about it.",
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() + Math.random() }]);
  };

  const simulateTyping = async (duration = 1500) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  };

  const handleSchemeSelection = async (scheme) => {
    const userMessage = {
      text: `Tell me about ${scheme.title}`,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    addMessage(userMessage);
    
    await simulateTyping();
    
    const botResponse = {
      text: `You've selected **${scheme.title}**. Here are the details:\n\n📋 **Description:** ${scheme.fullDescription}\n\n💰 **Benefits:** ${scheme.benefits}\n\n✅ **Eligibility:** ${scheme.eligibility}\n\n📅 **Deadline:** ${scheme.deadline}\n\n📄 **Required Documents:** ${scheme.documents.join(', ')}\n\n🔗 You can apply online using the link below.`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      applicationLink: scheme.applicationLink
    };
    addMessage(botResponse);
    setSelectedScheme(scheme);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-500 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="bx bx-building text-green-500 text-2xl animate-pulse"></i>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading schemes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
        </div>
        <Button onClick={loadSchemes}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500 rounded-xl">
            <i className="bx bx-building text-white text-xl"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Government Schemes</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Discover schemes for farmers</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.sender === 'user' 
                ? 'bg-green-500 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
            }`}>
              <div className="whitespace-pre-wrap text-sm">
                {message.text.split('**').map((part, index) => 
                  index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                )}
              </div>
              {message.applicationLink && (
                <div className="mt-3">
                  <a 
                    href={message.applicationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-full transition-colors"
                  >
                    <i className="bx bx-link-external mr-1"></i>
                    Apply Online
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Scheme Selection */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <i className="bx bx-list-ul mr-2"></i>Select a Government Scheme:
          </label>
          <select
            onChange={(e) => {
              const scheme = schemes.find(s => s.id === e.target.value);
              if (scheme) handleSchemeSelection(scheme);
            }}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>Choose a scheme...</option>
            {schemes.map((scheme) => (
              <option key={scheme.id} value={scheme.id}>
                {scheme.title}
              </option>
            ))}
          </select>
        </div>
        
        {selectedScheme && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMessages([]);
                setSelectedScheme(null);
                initializeChat();
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-xl text-sm transition-colors"
            >
              <i className="bx bx-refresh mr-1"></i>New Chat
            </button>
            <button
              onClick={() => handleSchemeSelection(selectedScheme)}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm transition-colors"
            >
              <i className="bx bx-info-circle mr-1"></i>More Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemesPage;