import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { schemesAPI, handleAPIError } from '../../services/api';
import SchemeCard from '../../components/guided/SchemeCard';
import Button from '../../components/ui/Button';

const SchemesPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCropType, setSelectedCropType] = useState('');

  const categories = ['All', 'Income Support', 'Insurance', 'Soil Management', 'Organic Farming', 'Credit'];
  const cropTypes = ['All', 'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Vegetables', 'Fruits'];

  useEffect(() => {
    loadSchemes();
  }, []);

  useEffect(() => {
    filterSchemes();
  }, [schemes, searchQuery, selectedCategory, selectedCropType]);

  const loadSchemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await schemesAPI.getAll();
      setSchemes(data);
    } catch (err) {
      setError(handleAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  const filterSchemes = () => {
    let filtered = schemes;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(scheme =>
        scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.fullDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }

    // Crop type filter
    if (selectedCropType && selectedCropType !== 'All') {
      filtered = filtered.filter(scheme =>
        scheme.cropTypes.includes('All') || scheme.cropTypes.includes(selectedCropType)
      );
    }

    setFilteredSchemes(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCropType('');
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-500 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="bx bx-building text-green-500 text-2xl animate-pulse"></i>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">{t('loading')} schemes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">{t('error')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
        </div>
        <Button onClick={loadSchemes}>{t('retry')}</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -translate-y-16 translate-x-16 animate-bounce-gentle"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-200/30 rounded-full translate-y-12 -translate-x-12 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-500 rounded-2xl shadow-lg">
              <i className="bx bx-building text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{t('schemes')}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover government schemes and subsidies available for farmers
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
            <i className="bx bx-search text-white text-xl"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Search & Filter</h2>
        </div>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes by name, description..."
              className="w-full pl-12 pr-20 py-4 border border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            />
            <i className="bx bx-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Search
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <i className="bx bx-category mr-2"></i>Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <i className="bx bx-leaf mr-2"></i>Crop Type
            </label>
            <select
              value={selectedCropType}
              onChange={(e) => setSelectedCropType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300"
            >
              {cropTypes.map(cropType => (
                <option key={cropType} value={cropType === 'All' ? '' : cropType}>
                  {cropType}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={clearFilters}
              disabled={!searchQuery && !selectedCategory && !selectedCropType}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 disabled:bg-gray-50 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-500 text-gray-700 dark:text-gray-200 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-sm disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <i className="bx bx-x mr-2"></i>Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-700">
        <div className="flex items-center gap-2">
          <i className="bx bx-list-ul text-blue-600 text-xl"></i>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Showing <span className="font-bold text-blue-600">{filteredSchemes.length}</span> of <span className="font-bold">{schemes.length}</span> schemes
          </p>
        </div>
        {(searchQuery || selectedCategory || selectedCropType) && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full font-medium">
                <i className="bx bx-search mr-1"></i>"{searchQuery}"
              </span>
            )}
            {selectedCategory && (
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm rounded-full font-medium">
                <i className="bx bx-category mr-1"></i>{selectedCategory}
              </span>
            )}
            {selectedCropType && (
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-sm rounded-full font-medium">
                <i className="bx bx-leaf mr-1"></i>{selectedCropType}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Schemes Grid */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No schemes found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search criteria or clearing filters
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Help Section */}
      <div className="group bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-6 border border-indigo-200 dark:border-indigo-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <i className="bx bx-help-circle text-white text-xl"></i>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Need Help Finding the Right Scheme?
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Our AI assistant can help you find schemes based on your specific needs and eligibility criteria.
        </p>
        <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg">
          <i className="bx bx-chat mr-2"></i>Chat with AI Assistant
        </button>
      </div>
    </div>
  );
};

export default SchemesPage;