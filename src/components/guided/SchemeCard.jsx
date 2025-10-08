import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

const SchemeCard = ({ scheme }) => {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      'Income Support': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Insurance': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Soil Management': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Organic Farming': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Credit': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  const isDeadlineNear = (deadline) => {
    if (deadline === 'Ongoing') return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  return (
    <>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowDetails(true)}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{scheme.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
            {scheme.category}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{scheme.shortDescription}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">{t('benefits')}:</span>
            <span className="font-medium text-primary-600 dark:text-primary-400">{scheme.benefits}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">{t('deadline')}:</span>
            <span className={`font-medium ${isDeadlineNear(scheme.deadline) ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
              {scheme.deadline}
              {isDeadlineNear(scheme.deadline) && ' ⚠️'}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {scheme.cropTypes.slice(0, 3).map((crop, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
              {crop}
            </span>
          ))}
          {scheme.cropTypes.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
              +{scheme.cropTypes.length - 3} more
            </span>
          )}
        </div>
        
        <Button variant="outline" size="sm" className="w-full">
          {t('readMore')}
        </Button>
      </div>

      {/* Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{scheme.title}</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400">{scheme.fullDescription}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('benefits')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{scheme.benefits}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('eligibility')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{scheme.eligibility}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Required Documents</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    {scheme.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Applicable Crops</h3>
                  <div className="flex flex-wrap gap-2">
                    {scheme.cropTypes.map((crop, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 text-sm rounded-full">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => window.open(scheme.applicationLink, '_blank')}
                    className="flex-1"
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDetails(false)}
                  >
                    {t('close')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SchemeCard;