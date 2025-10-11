import { useState } from 'react';

const DropdownCard = ({ data, field, context, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

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
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-xl border-2 border-green-200 dark:border-green-600 animate-slide-up w-full">
      {/* Compact Search */}
      <div className="relative mb-3">
        <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Compact Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-600 dark:to-gray-700 rounded-xl hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 border border-green-200 dark:border-gray-500 hover:border-green-400 transition-all hover:scale-105 hover:shadow-lg group"
              style={{ animationDelay: `${index * 20}ms` }}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-3xl group-hover:scale-110 transition-transform">{option.icon}</span>
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 text-center line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400">
                  {option.label}
                </span>
              </div>
            </button>
          ))
        ) : (
          <div className="col-span-2 text-center py-6">
            <i className="bx bx-search-alt text-3xl text-gray-300 dark:text-gray-600"></i>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">No results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownCard;
