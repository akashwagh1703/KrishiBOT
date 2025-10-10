import { useState } from 'react';

const DropdownCard = ({ data, field, context, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    
    if (field === 'scheme') {
      const scheme = data.find(s => s.id === value);
      if (scheme) onSelect(scheme);
    } else if (field === 'crop') {
      onSelect(value);
    } else if (field === 'disease') {
      onSelect(value);
    }
  };

  const getOptions = () => {
    if (field === 'scheme') {
      return data.map(scheme => ({ value: scheme.id, label: scheme.title }));
    } else if (Array.isArray(data)) {
      return data.map(item => ({ value: item, label: item }));
    }
    return [];
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-600 animate-slide-up">
      <div className="relative">
        <select
          value={selectedValue}
          onChange={handleSelect}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer"
        >
          <option value="" disabled>
            {field === 'scheme' ? 'Select a scheme...' :
             field === 'crop' ? 'Select a crop...' :
             field === 'disease' ? 'Select a disease...' : 'Select an option...'}
          </option>
          {getOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <i className="bx bx-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
      </div>
    </div>
  );
};

export default DropdownCard;
