import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../../state/store';
import { colors } from '../../../utils/colors';

const DropdownCard = ({ data, field, context, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownIdRef = useRef(`${field}-${Math.random()}`);
  const { activeDropdownId, setActiveDropdown, closeActiveDropdown } = useAppStore();
  const isOpen = activeDropdownId === dropdownIdRef.current;

  useEffect(() => {
    setActiveDropdown(dropdownIdRef.current);
  }, []);

  const getOptions = () => {
    if (field === 'scheme') {
      return data.map(scheme => ({ value: scheme.id, label: scheme.title, icon: '📜' }));
    } else if (field === 'crop') {
      return data.map(item => ({ value: item, label: item, icon: '🌾' }));
    } else if (field === 'disease') {
      return data.map(item => ({ value: item, label: item, icon: '🦠' }));
    }
    return [];
  };

  const options = getOptions();
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    if (field === 'scheme') {
      const scheme = data.find(s => s.id === option.value);
      if (scheme) onSelect(scheme);
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
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up-bottom">
      <div className={`bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl max-h-[40vh] overflow-hidden flex flex-col border-t-4 ${colors.borderPrimaryDark} dark:border-green-400`}>
        {/* Header */}
        <div className="px-4 pt-3 pb-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <div className="flex-1 flex justify-center">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <i className="bx bx-x text-2xl text-gray-500 dark:text-gray-400"></i>
            </button>
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white text-center mb-2">
            {field === 'scheme' ? 'Select a Scheme' :
             field === 'crop' ? 'Select Your Crop' :
             field === 'disease' ? 'Select Disease' : 'Select an Option'}
          </h3>
        </div>

        {/* List View */}
        <div className="px-4 py-3 space-y-2 overflow-y-auto custom-scrollbar flex-1">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`w-full p-3 bg-white dark:bg-gray-700 rounded-xl hover:bg-gradient-to-r ${colors.hoverGradientLight} dark:hover:from-green-900/20 dark:hover:to-emerald-900/20 border-2 border-gray-200 dark:border-gray-600 ${colors.borderPrimaryMid} dark:hover:border-green-500 transition-all hover:shadow-md group flex items-center space-x-3`}
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${colors.bgPrimaryLight} bg-opacity-50 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <span className="text-xl">{option.icon}</span>
                </div>
                <span className={`text-sm font-semibold text-gray-900 dark:text-white text-left flex-1 ${colors.textPrimaryDark} dark:group-hover:text-green-400`}>
                  {option.label}
                </span>
                <i className={`bx bx-chevron-right text-xl text-gray-400 ${colors.textPrimaryDark} dark:group-hover:text-green-400 transition-colors`}></i>
              </button>
            ))
          ) : (
            <div className="text-center py-8">
              <i className="bx bx-search-alt text-4xl text-gray-300 dark:text-gray-600 mb-2"></i>
              <p className="text-sm text-gray-500 dark:text-gray-400">No results found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownCard;
