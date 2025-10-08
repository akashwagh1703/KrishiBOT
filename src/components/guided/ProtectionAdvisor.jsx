import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { plantProtectionAPI } from '../../services/api';
import Button from '../ui/Button';

const ProtectionAdvisor = () => {
  const { t } = useTranslation();
  const [crops, setCrops] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [cropsData, symptomsData] = await Promise.all([
        plantProtectionAPI.getCrops(),
        plantProtectionAPI.getSymptoms()
      ]);
      setCrops(cropsData);
      setSymptoms(symptomsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleDiagnose = async () => {
    if (!selectedCrop || selectedSymptoms.length === 0) return;

    setLoading(true);
    try {
      const result = await plantProtectionAPI.diagnose(selectedCrop, selectedSymptoms);
      setDiagnosis(result);
      setStep(3);
    } catch (error) {
      console.error('Diagnosis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedCrop('');
    setSelectedSymptoms([]);
    setDiagnosis(null);
    setStep(1);
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'Low': 'text-green-600 dark:text-green-400',
      'Medium': 'text-yellow-600 dark:text-yellow-400',
      'High': 'text-red-600 dark:text-red-400',
      'Critical': 'text-red-700 dark:text-red-300'
    };
    return colors[severity] || 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-4">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNum 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
              {stepNum}
            </div>
            {stepNum < 3 && (
              <div className={`w-12 h-1 mx-2 ${
                step > stepNum ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Crop */}
      {step === 1 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('selectCrop')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {crops.map((crop) => (
              <button
                key={crop}
                onClick={() => {
                  setSelectedCrop(crop);
                  setStep(2);
                }}
                className={`p-3 rounded-lg border-2 transition-colors text-left ${
                  selectedCrop === crop
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-white">{crop}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Symptoms */}
      {step === 2 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('symptoms')} for {selectedCrop}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
              Change Crop
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Select all symptoms you observe in your {selectedCrop} crop:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {symptoms.map((symptom) => (
              <label
                key={symptom}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedSymptoms.includes(symptom)
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleSymptomToggle(symptom)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                  selectedSymptoms.includes(symptom)
                    ? 'border-primary-600 bg-primary-600'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {selectedSymptoms.includes(symptom) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-900 dark:text-white">{symptom}</span>
              </label>
            ))}
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={handleDiagnose}
              disabled={selectedSymptoms.length === 0}
              loading={loading}
              className="flex-1"
            >
              Get Diagnosis
            </Button>
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Diagnosis Results */}
      {step === 3 && diagnosis && (
        <div className="space-y-6">
          {/* Diagnosis Summary */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Diagnosis Results</h3>
              <Button variant="outline" size="sm" onClick={handleReset}>
                New Diagnosis
              </Button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">{diagnosis.disease}</h4>
                <span className={`text-sm font-medium ${getSeverityColor(diagnosis.severity)}`}>
                  {diagnosis.severity} Severity
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{diagnosis.cause}</p>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Crop:</strong> {diagnosis.crop} | 
              <strong> Symptoms:</strong> {diagnosis.symptoms.join(', ')}
            </div>
          </div>

          {/* Treatment */}
          <div className="card">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t('treatment')}</h4>
            <ul className="space-y-2">
              {diagnosis.treatment.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prevention */}
          <div className="card">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t('prevention')}</h4>
            <ul className="space-y-2">
              {diagnosis.prevention.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <svg className="flex-shrink-0 w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Organic Treatment */}
          {diagnosis.organicTreatment && (
            <div className="card">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Organic Treatment Options</h4>
              <ul className="space-y-2">
                {diagnosis.organicTreatment.map((treatment, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 text-green-600 mr-2 mt-1">🌿</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{treatment}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProtectionAdvisor;