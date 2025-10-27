import { NavLink, useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../state/store';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import ChatbotContent from './ChatbotContent';
import { authAPI } from '../../services/api';
import toast from 'react-hot-toast';
import config from "../../config/app.config.json";

const FloatingChatbot = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    toast((t) => (
      <div className="flex items-center gap-3">
        <span>Are you sure you want to logout?</span>
        <div className="flex gap-2">
          <button
            onClick={() => {
              authAPI.logout();
              toast.success('Logged out successfully!');
              toast.dismiss(t.id);
              navigate('/login');
            }}
            className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-medium"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm font-medium"
          >
            No
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  return (
    <div className="h-screen flex bg-dark-950">
      {/* Futuristic Sidebar */}
      <div className="w-20 glass-panel border-r border-neon-green/10 backdrop-blur-2xl relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-green/5 via-transparent to-neon-blue/5" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-green/50 to-transparent"></div>
        
        {/* Logo */}
        <div className="relative p-4 flex flex-col items-center border-b border-white/5">
          {config.branding.show_logo && (
            <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-cyan p-0.5 animate-glow-pulse animate-morph">
              <div className="w-full h-full bg-dark-900 flex items-center justify-center" style={{ borderRadius: 'inherit' }}>
                <img src={config.branding.logo_icon} className='w-8 h-8' alt="" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Icons */}
        <div className="flex-1 flex flex-col items-center gap-4 py-6 relative z-10">
          <NavLink to="/chat" className="w-12 h-12 bg-white/5 hover:bg-neon-green/20 border border-white/10 rounded-xl flex items-center justify-center transition-all group relative">
            <i className="bx bx-message-dots text-gray-300 group-hover:text-neon-green text-xl transition-colors"></i>
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-0 bg-neon-green group-hover:h-8 transition-all duration-300 rounded-full"></div>
          </NavLink>
          
          <NavLink to="/weather" className="w-12 h-12 bg-white/5 hover:bg-neon-cyan/20 border border-white/10 rounded-xl flex items-center justify-center transition-all group relative">
            <i className="bx bx-sun text-gray-300 group-hover:text-neon-cyan text-xl transition-colors"></i>
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-0 bg-neon-cyan group-hover:h-8 transition-all duration-300 rounded-full"></div>
          </NavLink>
          
          <NavLink to="/schemes" className="w-12 h-12 bg-white/5 hover:bg-neon-blue/20 border border-white/10 rounded-xl flex items-center justify-center transition-all group relative">
            <i className="bx bx-file text-gray-300 group-hover:text-neon-blue text-xl transition-colors"></i>
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-0 bg-neon-blue group-hover:h-8 transition-all duration-300 rounded-full"></div>
          </NavLink>
          
          <NavLink to="/plant-protection" className="w-12 h-12 bg-white/5 hover:bg-neon-green/20 border border-white/10 rounded-xl flex items-center justify-center transition-all group relative">
            <i className="bx bx-shield text-gray-300 group-hover:text-neon-green text-xl transition-colors"></i>
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-0 bg-neon-green group-hover:h-8 transition-all duration-300 rounded-full"></div>
          </NavLink>
        </div>

        {/* Bottom Actions */}
        <div className="relative flex flex-col items-center gap-3 p-4 border-t border-white/5">
          {config.ui.theme_toggle_enabled && (
            <button
              onClick={toggleTheme}
              className="w-12 h-12 bg-white/5 hover:bg-neon-green/20 border border-white/10 rounded-xl flex items-center justify-center transition-all group"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <i className={`bx ${isDark ? 'bx-sun' : 'bx-moon'} text-gray-300 group-hover:text-neon-green text-xl transition-colors`}></i>
            </button>
          )}
          {config.ui.profile_enabled && (
            <NavLink to="/profile" className="w-12 h-12 bg-white/5 hover:bg-neon-cyan/20 border border-white/10 rounded-xl flex items-center justify-center transition-all group">
              <i className="bx bx-user text-gray-300 group-hover:text-neon-cyan text-xl transition-colors"></i>
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            className="w-12 h-12 bg-white/5 hover:bg-red-500/20 border border-white/10 rounded-xl flex items-center justify-center transition-all group"
            aria-label="Logout"
          >
            <i className="bx bx-log-out text-gray-300 group-hover:text-red-400 text-xl transition-colors"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ChatbotContent />
      </div>
    </div>
  );
};

export default FloatingChatbot;
