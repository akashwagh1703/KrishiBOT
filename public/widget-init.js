/**
 * KrishiBot Widget Initialization Script
 * 
 * Usage:
 * <script src="https://your-domain.com/widget-init.js"></script>
 * <script>
 *   KrishiBot.init({
 *     position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
 *     theme: 'light', // 'light' or 'dark'
 *     language: 'en', // 'en' or 'hi'
 *     autoOpen: false // true to open automatically
 *   });
 * </script>
 */

(function() {
  'use strict';

  const KrishiBot = {
    config: {
      position: 'bottom-right',
      theme: 'light',
      language: 'en',
      autoOpen: false
    },

    init: function(options) {
      this.config = { ...this.config, ...options };
      this.injectStyles();
      this.createWidget();
      
      if (this.config.autoOpen) {
        setTimeout(() => this.openWidget(), 1000);
      }
    },

    injectStyles: function() {
      const style = document.createElement('style');
      style.textContent = `
        #krishibot-widget {
          position: fixed;
          ${this.config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
          ${this.config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
          z-index: 999999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        #krishibot-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22c55e 0%, #10b981 100%);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        
        #krishibot-toggle:hover {
          transform: scale(1.1);
        }
        
        #krishibot-toggle svg {
          width: 32px;
          height: 32px;
          fill: white;
        }
        
        #krishibot-frame {
          display: none;
          width: 400px;
          height: 600px;
          border: none;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          background: white;
        }
        
        #krishibot-frame.open {
          display: block;
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 480px) {
          #krishibot-frame {
            width: calc(100vw - 40px);
            height: calc(100vh - 100px);
          }
        }
      `;
      document.head.appendChild(style);
    },

    createWidget: function() {
      const container = document.createElement('div');
      container.id = 'krishibot-widget';
      
      const toggle = document.createElement('button');
      toggle.id = 'krishibot-toggle';
      toggle.innerHTML = `
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      `;
      toggle.onclick = () => this.toggleWidget();
      
      const iframe = document.createElement('iframe');
      iframe.id = 'krishibot-frame';
      iframe.src = window.location.origin; // In production, use your app URL
      
      container.appendChild(toggle);
      container.appendChild(iframe);
      document.body.appendChild(container);
    },

    toggleWidget: function() {
      const frame = document.getElementById('krishibot-frame');
      frame.classList.toggle('open');
    },

    openWidget: function() {
      const frame = document.getElementById('krishibot-frame');
      frame.classList.add('open');
    },

    closeWidget: function() {
      const frame = document.getElementById('krishibot-frame');
      frame.classList.remove('open');
    }
  };

  window.KrishiBot = KrishiBot;
})();
