import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../state/store';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import ChatbotContent from './ChatbotContent';
import config from "../../config/app.config.json"; // adjust the path as needed


const FloatingChatbot = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          {config.branding.show_logo && (
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <img src={config.branding.logo_icon} className='p-2' alt="" />
            </div>
          )}
          {config.branding.show_name && (
            <div>
              <h3 className="text-white font-bold text-2xl">{config.branding.app_name}</h3>
              <p className="text-green-100 text-sm">Your AI-Powered Farming Assistant</p>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {config.branding.show_client_logos && config.branding.client_logos && (
            <div className="hidden md:flex items-center space-x-3 mr-2 pr-3 border-r border-white/30">
              {config.branding.client_logos.map((logo, index) => (
                <img 
                  key={index} 
                  src={logo} 
             
                  alt={`Client ${index + 1}`} 
                  className="h-12 w-auto object-contain p-1 bg-white opacity-80 hover:opacity-100 transition-opacity" 
                />
              ))}
            </div>
          )}
          {config.ui.language_switcher_enabled && (
            <div className="[&>div>button]:bg-white/20 [&>div>button]:hover:bg-white/30 [&>div>button]:w-10 [&>div>button]:h-10 [&>div>div]:bg-white [&>div>div]:dark:bg-gray-800">
              <LanguageSwitcher />
            </div>
          )}
          {config.ui.theme_toggle_enabled && (
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <i className={`bx ${isDark ? 'bx-sun' : 'bx-moon'} text-white text-xl`}></i>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden chatbot">
        <ChatbotContent />
      </div>
    </div>
  );
};

export default FloatingChatbot;
