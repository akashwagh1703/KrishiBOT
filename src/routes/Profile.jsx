import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
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
    <div className="max-w-4xl mx-auto space-y-6 relative">
      {/* Animated Background Circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-green-300 dark:bg-green-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <i className='bx bx-user-circle text-4xl mr-3'></i>
              {t('profile')}
            </h1>
            <p className="text-green-50">
              Manage your personal information and farming details
            </p>
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="px-6 py-3 bg-white text-green-600 rounded-xl font-medium hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <i className='bx bx-edit-alt mr-2'></i>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Picture Card */}
      <div className="relative bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
              <i className='bx bx-user text-6xl text-white'></i>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <i className='bx bx-camera text-white text-xl'></i>
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {profile.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start">
              <i className='bx bx-map text-green-500 mr-2'></i>
              {profile.location}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{profile.farmSize}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Farm Size</div>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{profile.experience}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="relative bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-id-card text-2xl text-white'></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{profile.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editedProfile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{profile.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={editedProfile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{profile.phone}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{profile.location}</p>
            )}
          </div>
        </div>
      </div>

      {/* Farming Information */}
      <div className="relative bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-leaf text-2xl text-white'></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Farming Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Farm Size
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.farmSize}
                onChange={(e) => handleInputChange('farmSize', e.target.value)}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{profile.farmSize}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Farming Experience
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{profile.experience}</p>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Crops
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.primaryCrops.join(', ')}
              onChange={(e) => handleInputChange('primaryCrops', e.target.value.split(', '))}
              placeholder="e.g., Rice, Wheat, Cotton"
              className="input-field"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.primaryCrops.map((crop, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <i className='bx bx-leaf mr-1'></i>
                  {crop}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex gap-4">
          <button onClick={handleSave} className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            <i className='bx bx-check mr-2'></i>
            Save Changes
          </button>
          <button onClick={handleCancel} className="flex-1 px-6 py-4 bg-white dark:bg-surface-800 text-gray-700 dark:text-gray-200 rounded-xl font-medium border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-surface-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            <i className='bx bx-x mr-2'></i>
            Cancel
          </button>
        </div>
      )}

      {/* Account Actions */}
      {!isEditing && (
        <div className="relative bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
              <i className='bx bx-cog text-2xl text-white'></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Account Actions</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center px-6 py-4 bg-gray-50 dark:bg-surface-700 hover:bg-gray-100 dark:hover:bg-surface-600 rounded-xl transition-all duration-200 group">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <i className='bx bx-lock-alt text-xl text-blue-600 dark:text-blue-400'></i>
              </div>
              <span className="text-gray-900 dark:text-white font-medium">Change Password</span>
              <i className='bx bx-chevron-right ml-auto text-gray-400'></i>
            </button>
            
            <button className="w-full flex items-center px-6 py-4 bg-gray-50 dark:bg-surface-700 hover:bg-gray-100 dark:hover:bg-surface-600 rounded-xl transition-all duration-200 group">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <i className='bx bx-download text-xl text-green-600 dark:text-green-400'></i>
              </div>
              <span className="text-gray-900 dark:text-white font-medium">Download My Data</span>
              <i className='bx bx-chevron-right ml-auto text-gray-400'></i>
            </button>
            
            <button className="w-full flex items-center px-6 py-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 group">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <i className='bx bx-trash text-xl text-red-600 dark:text-red-400'></i>
              </div>
              <span className="text-red-600 dark:text-red-400 font-medium">Delete Account</span>
              <i className='bx bx-chevron-right ml-auto text-red-400'></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
