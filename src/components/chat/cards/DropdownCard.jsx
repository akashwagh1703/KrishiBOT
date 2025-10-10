import { useState } from 'react';

const DropdownCard = ({ data, field, context, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    
    if (field === 'scheme') {
      const scheme = data.find(s => s.id === option.value);
      if (scheme) onSelect(scheme);
    } else {
      onSelect(option.value);
    }
  };

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
  const placeholder = field === 'scheme' ? 'Select a scheme...' :
                      field === 'crop' ? 'Select a crop...' :
                      field === 'disease' ? 'Select a disease...' : 'Select an option...';

  return (
    <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-5 shadow-2xl border-2 border-green-200 dark:border-green-600 animate-slide-up">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-5 py-4 bg-white dark:bg-gray-600 border-2 border-gray-200 dark:border-gray-500 rounded-2xl text-left text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all hover:border-green-400 shadow-md hover:shadow-lg flex items-center justify-between"
        >
          <span className="flex items-center space-x-3">
            {selectedValue ? (
              <>
                <span className="text-2xl">{selectedValue.icon}</span>
                <span className="font-medium">{selectedValue.label}</span>
              </>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
            )}
          </span>
          <i className={`bx ${isOpen ? 'bx-chevron-up' : 'bx-chevron-down'} text-2xl text-green-600 dark:text-green-400 transition-transform`}></i>
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
            <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-700 rounded-2xl shadow-2xl border-2 border-green-200 dark:border-green-600 max-h-80 overflow-y-auto animate-fade-in">
              {options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="w-full px-5 py-4 text-left hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all flex items-center space-x-3 border-b border-gray-100 dark:border-gray-600 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl group"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform">{option.icon}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {option.label}
                  </span>
                  {selectedValue?.value === option.value && (
                    <i className="bx bx-check-circle text-green-600 dark:text-green-400 text-xl ml-auto"></i>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DropdownCard;
