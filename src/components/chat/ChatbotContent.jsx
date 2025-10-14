import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageBubble from './MessageBubble';
import SuggestionChips from './SuggestionChips';
import WeatherCard from './cards/WeatherCard';
import SchemeCard from './cards/SchemeCard';
import CropGrid from './cards/CropGrid';
import DropdownCard from './cards/DropdownCard';
import { weatherAPI, schemesAPI, plantProtectionAPI, chatbotAPI } from '../../services/api';
import { useAppStore } from '../../state/store';
import { colors } from '../../utils/colors';
import config from '../../config/app.config.json';

const ChatbotContent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState('home');
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { closeActiveDropdown } = useAppStore();

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    if (config.chat.auto_scroll) scrollToBottom();
  }, [messages]);

  useEffect(() => {
    handleRouteChange();
  }, [location.pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() + Math.random() }]);
  };

  const simulateTyping = async (duration = config.chat.typing_delay) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  };

  const initializeChat = () => {
    const suggestions = [];
    if (config.features.weather_module) suggestions.push({ icon: 'bx-sun', text: 'Weather Info', action: 'weather' });
    if (config.features.plant_protection_module) suggestions.push({ icon: 'bx-shield', text: 'Plant Protection', action: 'plant-protection' });
    if (config.features.schemes_module) suggestions.push({ icon: 'bx-file', text: 'Schemes', action: 'schemes' });
    // suggestions.push({ icon: '🌾', text: 'Select Crop', action: 'select-crop' });

    const welcomeMessage = {
      text: `🌾 Welcome to ${config.branding.app_name}! I'm your AI-powered farming assistant. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      suggestions
    };
    setMessages([welcomeMessage]);
  };

  const handleRouteChange = () => {
    const path = location.pathname;
    if (path === '/weather') handleWeatherFlow();
    else if (path === '/schemes') handleSchemesFlow();
    else if (path === '/plant-protection') handlePlantProtectionFlow();
    else if (path === '/select-crop') handleSelectCropFlow();
  };

  const handleSuggestionClick = async (action) => {
    closeActiveDropdown();
    const userMessage = {
      text: action.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    addMessage(userMessage);

    navigate(`/${action}`);
  };

  const handleWeatherFlow = async () => {
    await simulateTyping();
    try {
      const data = await weatherAPI.getCurrent();
      const botMessage = {
        text: "Here's the current weather information for your location:",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        card: { type: 'weather', data: data.current }
      };
      addMessage(botMessage);
    } catch (error) {
      addMessage({
        text: "Sorry, I couldn't fetch weather data. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleSchemesFlow = async () => {
    await simulateTyping();
    try {
      const schemes = await schemesAPI.getAll();
      const botMessage = {
        text: "Here are the available government schemes. Select one to learn more:",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        card: { type: 'dropdown', data: schemes, field: 'scheme' }
      };
      addMessage(botMessage);
    } catch (error) {
      addMessage({
        text: "Sorry, I couldn't fetch schemes. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      });
    }
  };

  const handlePlantProtectionFlow = async () => {
    await simulateTyping();
    try {
      const data = await plantProtectionAPI.getAll();
      const botMessage = {
        text: "Let's diagnose your crop issue. Choose your crop from the grid below:",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        card: { type: 'crop-grid', data: data.crops }
      };
      addMessage(botMessage);
    } catch (error) {
      addMessage({
        text: "Sorry, I couldn't load plant protection data. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleSelectCropFlow = async () => {
    await simulateTyping();
    try {
      const data = await plantProtectionAPI.getAll();
      const botMessage = {
        text: "Choose your crop from the grid below:",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        card: { type: 'crop-grid', data: data.crops }
      };
      addMessage(botMessage);
    } catch (error) {
      addMessage({
        text: "Sorry, I couldn't load crops. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleSchemeSelection = async (scheme) => {
    const userMessage = {
      text: `Tell me about ${scheme.name}`,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    addMessage(userMessage);

    await simulateTyping(1500);

    const botMessage = {
      text: `You selected **${scheme.name}**\n\nWhat would you like to know?`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      suggestions: [
        { icon: 'bx-info-circle', text: 'About Scheme', action: `scheme-about-${scheme.name}` },
        { icon: 'bx-check-circle', text: 'Eligibility', action: `scheme-eligibility-${scheme.name}` },
        { icon: 'bx-edit', text: 'How to Apply', action: `scheme-apply-${scheme.name}` }
      ]
    };
    addMessage(botMessage);
  };

  const handleSchemeAction = async (action, schemeName) => {
    try {
      const response = await schemesAPI.getDetails(schemeName);
      if (!response) return;

      const details = response.details || [];
      let responseText = '';
      let userText = '';

      if (action === 'about') {
        userText = 'Tell me about this scheme';
        const aboutContent = details.find(d => d.section === 'about');
        responseText = `**${response.scheme_name || schemeName}**\n\n${aboutContent?.content || 'Information not available'}`;
      } else if (action === 'eligibility') {
        userText = 'Who is eligible?';
        const eligibilityContent = details.find(d => d.section === 'eligibility');
        responseText = `**Eligibility for ${response.scheme_name || schemeName}**\n\n${eligibilityContent?.content || 'Please visit the official website for eligibility details'}`;
      } else if (action === 'apply') {
        userText = 'How do I apply?';
        const applyContent = details.find(d => d.section === 'apply');
        responseText = `**How to Apply for ${response.scheme_name || schemeName}**\n\n${applyContent?.content || 'Please visit the official government portal for application details'}`;
      }

      addMessage({
        text: userText,
        sender: 'user',
        timestamp: new Date().toISOString()
      });

      await simulateTyping(1500);

      addMessage({
        text: responseText,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        button: response.url ? { text: 'Visit Official Website', url: response.url } : null,
        suggestions: [
          { icon: 'bx-arrow-back', text: 'Back to Options', action: `scheme-back-${schemeName}` },
          { icon: 'bx-home', text: 'Home', action: 'home' }
        ]
      });
    } catch (error) {
      addMessage({
        text: "Sorry, I couldn't fetch scheme details. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleCropSelection = async (crop) => {
    const userMessage = {
      text: `I selected ${crop}`,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    addMessage(userMessage);

    await simulateTyping();

    try {
      const diseases = await plantProtectionAPI.getDiseases(crop);
      
      const botMessage = {
        text: `Great! Now select the disease affecting your ${crop}:`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        card: { type: 'dropdown', data: diseases, field: 'disease', context: { crop } }
      };
      addMessage(botMessage);
    } catch (error) {
      addMessage({
        text: "Sorry, I couldn't load disease information.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleDiseaseSelection = async (disease, crop) => {
    const userMessage = {
      text: `My ${crop} has ${disease}`,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    addMessage(userMessage);

    await simulateTyping();

    try {
      const data = await plantProtectionAPI.getChemicals(crop, disease);
      
      if (data?.chemicals && data.chemicals.length > 0) {
        const botMessage = {
          text: `Select a chemical to see detailed treatment information:`,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          card: { type: 'dropdown', data: data.chemicals, field: 'chemical', context: { crop, disease } }
        };
        addMessage(botMessage);
      } else {
        addMessage({
          text: "No chemical treatments available for this disease.",
          sender: 'bot',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      addMessage({
        text: "Sorry, I couldn't load chemical information.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleChemicalSelection = async (chemical, crop, disease) => {
    const userMessage = {
      text: `Tell me about ${chemical.name}`,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    addMessage(userMessage);

    await simulateTyping(1500);

    try {
      const data = await plantProtectionAPI.getPlantProtection(crop, disease, chemical.name);
      
      if (data?.sections) {
        const cropInfo = data.sections.crop_info || [];
        const diseaseInfo = data.sections.disease_info || [];
        
        let responseText = `**Plant Protection Information**\n\n**Crop:** ${crop}\n**Disease:** ${disease}\n**Chemical:** ${chemical.name}\n\n`;
        
        if (diseaseInfo.length > 0) {
          responseText += `🦠 **Disease Information:**\n${diseaseInfo[0]?.content || 'No information available'}\n\n`;
        }
        
        if (cropInfo.length > 0) {
          responseText += `🌾 **Crop Information:**\n${cropInfo[0]?.content || 'No information available'}`;
        }
        
        addMessage({
          text: responseText,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          suggestions: [
            { icon: 'bx-arrow-back', text: 'Back', action: 'plant-protection' },
            { icon: 'bx-home', text: 'Home', action: 'home' }
          ]
        });
      } else {
        addMessage({
          text: 'Detailed information not available.',
          sender: 'bot',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      addMessage({
        text: "Sorry, I couldn't fetch the information. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    addMessage(userMessage);
    const question = inputValue;
    setInputValue('');

    await simulateTyping();

    try {
      const response = await chatbotAPI.ask(question, { messages });
      
      const botMessage = {
        text: response.answer || "I'm here to help! Please use the suggestion buttons or menu options.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        suggestions: response.suggestions?.map(s => ({
          icon: s.icon || '💬',
          text: s.text,
          action: s.action
        })) || [
          { icon: 'bx-sun', text: 'Weather', action: 'weather' },
          { icon: 'bx-shield', text: 'Plant Protection', action: 'plant-protection' },
          { icon: 'bx-file', text: 'Schemes', action: 'schemes' }
        ]
      };
      addMessage(botMessage);
    } catch (error) {
      addMessage({
        text: "Sorry, I'm having trouble responding. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div className="flex flex-col h-full  from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble message={message} />
            
            {message.card && (
              <div className="flex justify-start">
                <div className="mt-2  animate-fade-in max-w-2xl">
                  {message.card.type === 'weather' && <WeatherCard data={message.card.data} />}
                  {message.card.type === 'scheme' && <SchemeCard data={message.card.data} />}
                  {message.card.type === 'crop-grid' && (
                    <CropGrid crops={message.card.data} onSelect={handleCropSelection} />
                  )}
                  {message.card.type === 'dropdown' && (
                    <DropdownCard
                      data={message.card.data}
                      field={message.card.field}
                      context={message.card.context}
                      onSelect={(value) => {
                        if (message.card.field === 'scheme') handleSchemeSelection(value);
                        else if (message.card.field === 'crop') handleCropSelection(value);
                        else if (message.card.field === 'disease') handleDiseaseSelection(value, message.card.context.crop);
                        else if (message.card.field === 'chemical') handleChemicalSelection(value, message.card.context.crop, message.card.context.disease);
                      }}
                    />
                  )}
                </div>
              </div>
            )}

            {message.suggestions && (
              <SuggestionChips
                suggestions={message.suggestions}
                onSelect={(action) => {
                  if (action === 'home') {
                    navigate('/chat');
                    initializeChat();
                  } else if (action.startsWith('scheme-')) {
                    const parts = action.split('-');
                    const actionType = parts[1];
                    const schemeId = parts.slice(2).join('-');
                    
                    if (actionType === 'back') {
                      schemesAPI.getDetails(schemeId).then(scheme => {
                        if (scheme) handleSchemeSelection({ name: scheme.scheme_name || schemeId });
                      });
                    } else {
                      handleSchemeAction(actionType, schemeId);
                    }
                  } else if (action.startsWith('crop-')) {
                    // Handle crop actions if needed
                  } else {
                    handleSuggestionClick(action);
                  }
                }}
              />
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white dark:bg-gray-700 rounded-2xl px-4 py-3 shadow-soft">
              <div className="flex space-x-1">
                <div className={`w-2 h-2 ${colors.bgPrimary} rounded-full animate-bounce`}></div>
                <div className={`w-2 h-2 ${colors.bgPrimary} rounded-full animate-bounce`} style={{animationDelay: '0.1s'}}></div>
                <div className={`w-2 h-2 ${colors.bgPrimary} rounded-full animate-bounce`} style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {config.chat.show_input_section && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-2 max-w-4xl mx-auto w-full">
            {config.chat.show_emoji_button && (
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <i className="bx bx-happy text-gray-500 text-xl"></i>
              </button>
            )}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
            />
            {config.chat.show_voice_button && config.features.voice_input && (
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <i className="bx bx-microphone text-gray-500 text-xl"></i>
              </button>
            )}
            {config.chat.show_send_button && (
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="bx bx-send text-xl"></i>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotContent;
