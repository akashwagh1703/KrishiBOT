import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import { colors } from '../utils/colors';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Farmer User',
    email: 'farmer@example.com',
    phone: '',
    location: 'Delhi, India',
    farmSize: '5 acres',
    primaryCrops: ['Rice', 'Wheat'],
    experience: '10 years'
  });

  useEffect(() => {
    const userData = authAPI.getUserData();
    if (userData?.mobile) {
      setProfile(prev => ({ ...prev, phone: userData.mobile }));
    }
  }, []);

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
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
    <div className="h-screen flex flex-col bg-dark-950">
      {/* Header */}
      <div className="glass-panel border-b border-white/10 backdrop-blur-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/chat')}
            className="w-10 h-10 bg-white/5 hover:bg-neon-green/20 border border-white/10 rounded-xl flex items-center justify-center transition-all"
            aria-label="Back to chat"
          >
            <i className="bx bx-arrow-back text-gray-300 hover:text-neon-green text-xl transition-colors"></i>
          </button>
          <div>
            <h3 className="text-white font-bold text-xl">Profile</h3>
          </div>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-950 rounded-xl font-semibold hover:shadow-lg hover:shadow-neon-green/30 transition-all flex items-center space-x-2">
            <i className='bx bx-edit-alt'></i>
            <span>Edit</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Card */}
        <div className="glass-panel border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-neon-green to-neon-cyan rounded-full flex items-center justify-center shadow-lg shadow-neon-green/30 animate-morph">
              <i className='bx bx-user text-4xl text-dark-950'></i>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{profile.name}</h2>
              <p className="text-sm text-gray-400 flex items-center mt-1">
                <i className="bx bx-map text-neon-green mr-1 text-lg"></i>
                {profile.location}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">{profile.farmSize}</div>
              <div className="text-xs text-gray-400">Farm Size</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">{profile.experience}</div>
              <div className="text-xs text-gray-400">Experience</div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="glass-panel border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 border border-white/10 rounded-xl flex items-center justify-center mr-3">
              <i className='bx bx-id-card text-xl text-neon-green'></i>
            </div>
            <h3 className="text-lg font-bold text-white">Personal Information</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-sm text-gray-400">Name</span>
              {isEditing ? (
                <input type="text" value={editedProfile.name} onChange={(e) => handleInputChange('name', e.target.value)} className="text-sm text-right bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-white" />
              ) : (
                <span className="text-sm font-medium text-white">{profile.name}</span>
              )}
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-sm text-gray-400">Email</span>
              {isEditing ? (
                <input type="email" value={editedProfile.email} onChange={(e) => handleInputChange('email', e.target.value)} className="text-sm text-right bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-white" />
              ) : (
                <span className="text-sm font-medium text-white">{profile.email}</span>
              )}
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-sm text-gray-400">Phone</span>
              {isEditing ? (
                <input type="tel" value={editedProfile.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="text-sm text-right bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-white" />
              ) : (
                <span className="text-sm font-medium text-white">{profile.phone}</span>
              )}
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-400">Location</span>
              {isEditing ? (
                <input type="text" value={editedProfile.location} onChange={(e) => handleInputChange('location', e.target.value)} className="text-sm text-right bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-white" />
              ) : (
                <span className="text-sm font-medium text-white">{profile.location}</span>
              )}
            </div>
          </div>
        </div>

        {/* Farming Information */}
        <div className="glass-panel border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 border border-white/10 rounded-xl flex items-center justify-center mr-3">
              <i className='bx bx-leaf text-xl text-neon-green'></i>
            </div>
            <h3 className="text-lg font-bold text-white">Farming Information</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-sm text-gray-400">Farm Size</span>
              {isEditing ? (
                <input type="text" value={editedProfile.farmSize} onChange={(e) => handleInputChange('farmSize', e.target.value)} className="text-sm text-right bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-white" />
              ) : (
                <span className="text-sm font-medium text-white">{profile.farmSize}</span>
              )}
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-sm text-gray-400">Experience</span>
              {isEditing ? (
                <input type="text" value={editedProfile.experience} onChange={(e) => handleInputChange('experience', e.target.value)} className="text-sm text-right bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-white" />
              ) : (
                <span className="text-sm font-medium text-white">{profile.experience}</span>
              )}
            </div>
            <div className="py-2">
              <span className="text-sm text-gray-400 block mb-2">Primary Crops</span>
              {isEditing ? (
                <input type="text" value={editedProfile.primaryCrops.join(', ')} onChange={(e) => handleInputChange('primaryCrops', e.target.value.split(', '))} placeholder="Rice, Wheat" className="w-full text-sm bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-white" />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.primaryCrops.map((crop, index) => (
                    <span key={index} className="px-3 py-1 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-950 text-xs rounded-lg font-semibold">
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
            <button onClick={handleSave} className="flex-1 py-3 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-950 rounded-xl font-semibold shadow-lg shadow-neon-green/30 hover:shadow-neon-green/50 transition-all flex items-center justify-center space-x-2">
              <i className='bx bx-check text-xl'></i>
              <span>Save</span>
            </button>
            <button onClick={handleCancel} className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
              <i className='bx bx-x text-xl'></i>
              <span>Cancel</span>
            </button>
          </div>
        )}

        {/* Account Actions */}
        {!isEditing && (
          <div className="glass-panel border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 border border-white/10 rounded-xl flex items-center justify-center mr-3">
                <i className='bx bx-cog text-xl text-neon-green'></i>
              </div>
              <h3 className="text-lg font-bold text-white">Settings</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                <i className='bx bx-lock-alt text-xl text-neon-blue mr-3'></i>
                <span className="text-sm font-medium text-white flex-1 text-left">Change Password</span>
                <i className='bx bx-chevron-right text-gray-400'></i>
              </button>
              <button className="w-full flex items-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                <i className="bx bx-download text-xl text-neon-green mr-3"></i>
                <span className="text-sm font-medium text-white flex-1 text-left">Download Data</span>
                <i className='bx bx-chevron-right text-gray-400'></i>
              </button>
              <button className="w-full flex items-center px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition-all">
                <i className='bx bx-trash text-xl text-red-400 mr-3'></i>
                <span className="text-sm font-medium text-red-400 flex-1 text-left">Delete Account</span>
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
