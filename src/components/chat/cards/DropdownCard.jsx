import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../../state/store';

const DropdownCard = ({ data, field, context, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownIdRef = useRef(`${field}-${Math.random()}`);
  const { activeDropdownId, setActiveDropdown, closeActiveDropdown } = useAppStore();
  const isOpen = activeDropdownId === dropdownIdRef.current;

  useEffect(() => {
    setActiveDropdown(dropdownIdRef.current);
  }, []);

  const getOptions = () => {
    if (!data || !Array.isArray(data)) return [];
    
    if (field === 'scheme') {
      return data.map(scheme => ({ value: scheme.name, label: scheme.name, icon: '📜' }));
    } else if (field === 'crop') {
      return data.map(item => ({ value: item, label: item, icon: '🌾' }));
    } else if (field === 'disease') {
      return data.map(item => ({ value: item, label: item, icon: '🦠' }));
    } else if (field === 'chemical') {
      return data.map(chem => ({ value: chem, label: chem.name, icon: '💊' }));
    }
    return [];
  };

  const options = getOptions();
  const filteredOptions = options.filter(opt => 
    opt?.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    if (field === 'scheme') {
      const scheme = data.find(s => s.name === option.value);
      if (scheme) onSelect(scheme);
    } else if (field === 'chemical') {
      onSelect(option.value);
    } else {
      onSelect(option.value);
    }
    closeActiveDropdown();
  };

  const handleClose = () => {
    closeActiveDropdown();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Hexagonal backdrop */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-dark-950/90 to-black/80 backdrop-blur-lg z-40 animate-fade-in" onClick={handleClose}>
        <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,255,136,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,255,255,0.03) 0%, transparent 50%)'}}></div>
      </div>
      
      {/* Centered Modal Dropdown */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="w-full max-w-md relative">
          {/* Floating orbs */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-neon-green/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-neon-cyan/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          <div className="relative glass-panel border border-neon-green/30 rounded-3xl backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_rgba(0,255,136,0.4)] animate-scale-in">
            {/* Hexagonal pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l25.98 15v30L30 60 4.02 45V15z\' fill=\'none\' stroke=\'%2300ff88\' stroke-width=\'1\'/%3E%3C/svg%3E")', backgroundSize: '60px 60px'}}></div>
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl" style={{background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.5), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 3s infinite', mixBlendMode: 'overlay'}}></div>
            
            {/* Header */}
            <div className="relative px-6 py-5 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-green to-neon-cyan rounded-xl rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
                    <div className="absolute inset-1 bg-dark-950 rounded-lg flex items-center justify-center">
                      <i className="bx bx-grid-alt text-xl text-neon-green"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {field === 'scheme' ? 'Schemes' : field === 'crop' ? 'Crops' : field === 'disease' ? 'Diseases' : field === 'chemical' ? 'Chemicals' : 'Options'}
                    </h3>
                    <p className="text-xs text-neon-green">{filteredOptions.length} items</p>
                  </div>
                </div>
                <button onClick={handleClose} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 flex items-center justify-center transition-all group">
                  <i className="bx bx-x text-2xl text-gray-400 group-hover:text-red-400 group-hover:rotate-180 transition-all duration-300"></i>
                </button>
              </div>
            </div>
            
            {/* Grid View */}
            <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {filteredOptions.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option)}
                      className="group relative p-4 glass-panel border border-white/10 hover:border-neon-green/50 rounded-2xl transition-all hover:scale-105 hover:-translate-y-1 overflow-hidden animate-slide-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      {/* Diagonal gradient sweep */}
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/0 via-neon-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center text-center gap-3">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            <span className="text-3xl">{option.icon}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-neon-green to-neon-cyan rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-neon-green transition-colors line-clamp-2">{option.label}</p>
                        </div>
                      </div>
                      
                      {/* Selection indicator */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-neon-green rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity"></div>
                      
                      {/* Bottom line */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-green to-neon-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-500/20 to-gray-700/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="bx bx-search-alt text-4xl text-gray-500"></i>
                  </div>
                  <p className="text-base font-semibold text-gray-400">No Results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownCard;
