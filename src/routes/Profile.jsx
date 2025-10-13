import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { colors } from '../utils/colors';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Farmer User',
    email: 'farmer@example.com',
    phone: '+91 98765 43210',
    location: 'Delhi, India',
    farmSize: '5 acres',
    primaryCrops: ['Rice', 'Wheat'],
    experience: '10 years'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className={`${colors.gradientPrimary} p-4 flex items-center justify-between shadow-lg`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/chat')}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            aria-label="Back to chat"
          >
            <i className="bx bx-arrow-back text-white text-xl"></i>
          </button>
          <div>
            <h3 className="text-white font-bold text-2xl">Profile</h3>
            <p className="text-green-100 text-sm">Manage your information</p>
          </div>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors flex items-center space-x-2">
            <i className='bx bx-edit-alt'></i>
            <span>Edit</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className={`w-20 h-20 ${colors.gradientPrimary} rounded-full flex items-center justify-center shadow-lg`}>
              <i className='bx bx-user text-4xl text-white'></i>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                <i className={`bx bx-map ${colors.textPrimary} mr-1 text-lg`}></i>
                {profile.location}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className={`text-xl font-bold ${colors.textPrimaryDark} dark:text-green-400`}>{profile.farmSize}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Farm Size</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${colors.textPrimaryDark} dark:text-green-400`}>{profile.experience}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Experience</div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 ${colors.gradientPrimary} rounded-lg flex items-center justify-center mr-3`}>
              <i className='bx bx-id-card text-xl text-white'></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Name</span>
              {isEditing ? (
                <input type="text" value={editedProfile.name} onChange={(e) => handleInputChange('name', e.target.value)} className="text-sm text-right bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded" />
              ) : (
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profile.name}</span>
              )}
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Email</span>
              {isEditing ? (
                <input type="email" value={editedProfile.email} onChange={(e) => handleInputChange('email', e.target.value)} className="text-sm text-right bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded" />
              ) : (
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profile.email}</span>
              )}
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Phone</span>
              {isEditing ? (
                <input type="tel" value={editedProfile.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="text-sm text-right bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded" />
              ) : (
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profile.phone}</span>
              )}
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Location</span>
              {isEditing ? (
                <input type="text" value={editedProfile.location} onChange={(e) => handleInputChange('location', e.target.value)} className="text-sm text-right bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded" />
              ) : (
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profile.location}</span>
              )}
            </div>
          </div>
        </div>

        {/* Farming Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className={`w-10 h-10 ${colors.gradientPrimary} rounded-lg flex items-center justify-center mr-3`}>
              <i className='bx bx-leaf text-xl text-white'></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Farming Information</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Farm Size</span>
              {isEditing ? (
                <input type="text" value={editedProfile.farmSize} onChange={(e) => handleInputChange('farmSize', e.target.value)} className="text-sm text-right bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded" />
              ) : (
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profile.farmSize}</span>
              )}
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Experience</span>
              {isEditing ? (
                <input type="text" value={editedProfile.experience} onChange={(e) => handleInputChange('experience', e.target.value)} className="text-sm text-right bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded" />
              ) : (
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profile.experience}</span>
              )}
            </div>
            <div className="py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">Primary Crops</span>
              {isEditing ? (
                <input type="text" value={editedProfile.primaryCrops.join(', ')} onChange={(e) => handleInputChange('primaryCrops', e.target.value.split(', '))} placeholder="Rice, Wheat" className="w-full text-sm bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded" />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.primaryCrops.map((crop, index) => (
                    <span key={index} className={`px-3 py-1 ${colors.gradientPrimary} text-white text-xs rounded-lg`}>
                      <i className='bx bx-leaf mr-1'></i>{crop}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3">
            <button onClick={handleSave} className={`flex-1 py-3 ${colors.gradientPrimary} text-white rounded-xl font-medium shadow-lg flex items-center justify-center space-x-2`}>
              <i className='bx bx-check text-xl'></i>
              <span>Save</span>
            </button>
            <button onClick={handleCancel} className="flex-1 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-medium border-2 border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center space-x-2">
              <i className='bx bx-x text-xl'></i>
              <span>Cancel</span>
            </button>
          </div>
        )}

        {/* Account Actions */}
        {!isEditing && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 ${colors.gradientPrimary} rounded-lg flex items-center justify-center mr-3`}>
                <i className='bx bx-cog text-xl text-white'></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Settings</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all">
                <i className='bx bx-lock-alt text-xl text-blue-600 dark:text-blue-400 mr-3'></i>
                <span className="text-sm font-medium text-gray-900 dark:text-white flex-1 text-left">Change Password</span>
                <i className='bx bx-chevron-right text-gray-400'></i>
              </button>
              <button className="w-full flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all">
                <i className={`bx bx-download text-xl ${colors.textPrimary} mr-3`}></i>
                <span className="text-sm font-medium text-gray-900 dark:text-white flex-1 text-left">Download Data</span>
                <i className='bx bx-chevron-right text-gray-400'></i>
              </button>
              <button className="w-full flex items-center px-4 py-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all">
                <i className='bx bx-trash text-xl text-red-600 dark:text-red-400 mr-3'></i>
                <span className="text-sm font-medium text-red-600 dark:text-red-400 flex-1 text-left">Delete Account</span>
                <i className='bx bx-chevron-right text-red-400'></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
