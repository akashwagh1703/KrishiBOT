import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { plantProtectionAPI } from '../../services/api';
import ProtectionAdvisor from '../../components/guided/ProtectionAdvisor';
import Button from '../../components/ui/Button';

const PlantProtectionPage = () => {
  const { t } = useTranslation();
  const [preventiveTips, setPreventiveTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('advisor');
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    loadPreventiveTips();
  }, []);

  const loadPreventiveTips = async () => {
    try {
      const tips = await plantProtectionAPI.getPreventiveTips();
      setPreventiveTips(tips);
    } catch (error) {
      console.error('Failed to load preventive tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'advisor', name: 'Diagnosis Advisor', icon: '🔍' },
    { id: 'tips', name: 'Prevention Tips', icon: '🛡️' },
    { id: 'emergency', name: 'Emergency Help', icon: '🚨' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-3xl p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full -translate-y-16 translate-x-16 animate-bounce-gentle"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200/30 rounded-full translate-y-12 -translate-x-12 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg">
              <i className="bx bx-shield text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">{t('plantProtection')}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Get expert diagnosis and treatment recommendations for crop diseases and pests
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-2 border border-gray-200 dark:border-gray-700 shadow-lg">
        <nav className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-2xl font-medium text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600'
              }`}
            >
              <span className="text-lg mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'advisor' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-6 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500 rounded-xl">
                <i className="bx bx-info-circle text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">How it works:</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload image</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Select crop type</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Choose symptoms</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Get diagnosis</span>
              </div>
            </div>
          </div>
          
          {/* Image Upload Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-4 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-purple-500 rounded-xl">
                <i className="bx bx-image text-white text-lg"></i>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Step 1: Upload Plant Image</h3>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 border-2 border-dashed border-purple-300 dark:border-purple-600 rounded-2xl p-4 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="plant-image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => setUploadedImage(e.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label htmlFor="plant-image" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <i className="bx bx-cloud-upload text-purple-500 text-2xl"></i>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Click to upload</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </label>
              </div>
              {uploadedImage && (
                <div className="w-24 h-24 relative">
                  <img src={uploadedImage} alt="Uploaded plant" className="w-full h-full object-cover rounded-xl border-2 border-purple-300 dark:border-purple-600" />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    <i className="bx bx-x"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <ProtectionAdvisor />
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-6 border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-500 rounded-2xl shadow-lg">
                <i className="bx bx-shield-check text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                General Prevention Tips
              </h2>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="bx bx-shield text-green-500 text-xl animate-pulse"></i>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preventiveTips.map((tip, index) => (
                  <div key={index} className="flex items-start p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-green-200/50 dark:border-green-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{tip}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seasonal Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group bg-gradient-to-br from-green-50 to-lime-100 dark:from-green-900/20 dark:to-lime-900/20 rounded-3xl p-6 border border-green-200 dark:border-green-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <i className="bx bx-leaf text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Spring Care</h3>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><i className="bx bx-check text-green-500"></i>Start with healthy, certified seeds</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-green-500"></i>Prepare soil with organic matter</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-green-500"></i>Monitor for early pest activity</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-green-500"></i>Establish beneficial insect habitats</li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl p-6 border border-yellow-200 dark:border-yellow-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <i className="bx bx-sun text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Summer Care</h3>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><i className="bx bx-check text-yellow-500"></i>Maintain adequate irrigation</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-yellow-500"></i>Watch for heat stress symptoms</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-yellow-500"></i>Increase pest monitoring frequency</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-yellow-500"></i>Provide shade for sensitive crops</li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-6 border border-blue-200 dark:border-blue-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <i className="bx bx-cloud-rain text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Monsoon Care</h3>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><i className="bx bx-check text-blue-500"></i>Ensure proper drainage systems</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-blue-500"></i>Monitor for fungal diseases</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-blue-500"></i>Avoid waterlogged conditions</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-blue-500"></i>Apply preventive fungicides</li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <i className="bx bx-snow text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Winter Care</h3>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><i className="bx bx-check text-gray-500"></i>Protect from frost damage</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-gray-500"></i>Clean up crop residues</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-gray-500"></i>Plan crop rotation</li>
                <li className="flex items-center gap-2"><i className="bx bx-check text-gray-500"></i>Prepare for next season</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'emergency' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-3xl p-6 border border-red-200 dark:border-red-700 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500 rounded-2xl shadow-lg animate-pulse">
                <i className="bx bx-error text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Emergency Plant Protection</h2>
            </div>
            <p className="text-red-700 dark:text-red-300 text-lg font-medium">
              If you're experiencing severe crop damage or disease outbreak, take immediate action:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-3xl p-6 border border-red-200 dark:border-red-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500 rounded-xl">
                  <i className="bx bx-error-circle text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Immediate Actions</h3>
              </div>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><i className="bx bx-right-arrow-alt text-red-500"></i>Isolate affected plants immediately</li>
                <li className="flex items-center gap-2"><i className="bx bx-right-arrow-alt text-red-500"></i>Take clear photos of symptoms</li>
                <li className="flex items-center gap-2"><i className="bx bx-right-arrow-alt text-red-500"></i>Stop irrigation if disease is suspected</li>
                <li className="flex items-center gap-2"><i className="bx bx-right-arrow-alt text-red-500"></i>Remove and destroy infected plant parts</li>
                <li className="flex items-center gap-2"><i className="bx bx-right-arrow-alt text-red-500"></i>Disinfect tools between plants</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-6 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500 rounded-xl">
                  <i className="bx bx-phone text-white text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Get Expert Help</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg" onClick={() => alert('Connecting to agricultural expert...')}>
                  <i className="bx bx-phone mr-2"></i>Call Agricultural Helpline
                </button>
                <button className="w-full py-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-sm">
                  <i className="bx bx-map mr-2"></i>Find Nearest Extension Office
                </button>
                <button className="w-full py-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-sm">
                  <i className="bx bx-chat mr-2"></i>Chat with AI for Quick Diagnosis
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Common Emergency Situations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Sudden Wilting</h4>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  Check soil moisture, root rot, or vascular diseases. Stop watering immediately.
                </p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Pest Outbreak</h4>
                <p className="text-xs text-red-700 dark:text-red-300">
                  Identify pest type, apply targeted treatment, monitor spread to neighboring plants.
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Disease Spread</h4>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Quarantine area, apply fungicide, improve air circulation, reduce humidity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantProtectionPage;