import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme store
export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Language store
export const useLanguageStore = create(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);

// Chat store
export const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      isTyping: false,
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, { ...message, id: Date.now() }]
      })),
      setTyping: (typing) => set({ isTyping: typing }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'chat-storage',
    }
  )
);

// App store for general state
export const useAppStore = create((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  // Cache for API data
  weatherCache: null,
  schemesCache: null,
  setWeatherCache: (data) => set({ weatherCache: data }),
  setSchemesCache: (data) => set({ schemesCache: data }),
}));