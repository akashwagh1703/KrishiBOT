import { useState } from 'react';

const DropdownCard = ({ data, field, context, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const getOptions = () => {
    if (field === 'scheme') {
      return data.map(scheme => ({ value: scheme.id, label: scheme.title, icon: '📜', desc: scheme.description }));
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
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40 animate-fadeIn" onClick={() => setIsOpen(false)} />
      
      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-800 rounded-t-2xl z-50 max-h-[80vh] flex flex-col shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {field === 'scheme' ? 'Select Scheme' : field === 'crop' ? 'Select Crop' : 'Select Disease'}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <i className="bx bx-x text-2xl text-gray-500 dark:text-gray-400"></i>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-3">
          {filteredOptions.length > 0 ? (
            <div className="space-y-2">
              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className="w-full p-3.5 text-left rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 hover:border-green-500 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
                      {option.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">
                        {option.label}
                      </p>
                      {option.desc && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {option.desc}
                        </p>
                      )}
                    </div>
                    <i className="bx bx-chevron-right text-gray-400 text-xl"></i>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="bx bx-search-alt text-4xl text-gray-300 dark:text-gray-600 mb-2"></i>
              <p className="text-gray-500 dark:text-gray-400">No results found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DropdownCard;
