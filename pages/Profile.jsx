/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('blogs');

  // New state to toggle detail view
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error getting user:', error);
        return;
      }

      if (user) {
        setUser(user);
        setEmail(user.email || '');
        setDisplayName(user.user_metadata?.full_name || '');
        setPhone(user.user_metadata?.phone || '');
        setDob(user.user_metadata?.dob || '');
        setGender(user.user_metadata?.gender || '');
        setBio(user.user_metadata?.bio || '');
      }
    };

    getUser();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    setSuccess('');

    try {
      const updates = {
        data: {
          full_name: displayName,
          phone,
          dob,
          gender,
          bio,
        },
      };

      const { error } = await supabase.auth.updateUser(updates);
      if (error) throw error;

      setSuccess('Profile updated!');
      setShowSettings(false);
      setShowDetails(false); // optionally hide details on update
    } catch (error) {
      console.error('Profile update error:', error);
    }

    setLoading(false);
  };

  if (!user) return <div>Loading...</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'blogs':
        return <div>Your Blogs will appear here.</div>;
      case 'qa':
        return <div>Your Q&A content will appear here.</div>;
      case 'polls':
        return <div>Your Polls will appear here.</div>;
      case 'whiteboard':
        return <div>Your Whiteboard content will appear here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto mt-24     bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">My Profile</h2>
        <button
          className="bg-[#0C1B33]    text-white px-4 py-2 rounded-3xl    hover:bg-gray-700"
          onClick={() => setShowSettings((prev) => !prev)}
        >
          {showSettings ? 'Close Settings' : 'Edit Profile'}
        </button>
      </div>

      {success && <p className="text-green-600 mb-4">{success}</p>}

      {!showSettings ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700">
              {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="text-xl font-semibold">{displayName || 'Not set'}</p>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
          <div>
            <p><strong>Bio:</strong> {bio || 'Not set'}</p>
          </div>

          {/* Detail button */}
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="mt-2 px-3 py-1 text-sm   text-white  bg-[#0C1B33]  rounded-3xl   "
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>

          {/* Detailed info shown only when toggled */}
          {showDetails && (
            <div className="mt-4 space-y-2 text-gray-700">
              <p><strong>Phone:</strong> {phone || 'Not set'}</p>
              <p><strong>Date of Birth:</strong> {dob || 'Not set'}</p>
              <p><strong>Gender:</strong> {gender || 'Not set'}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* The edit form stays the same */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex border-b border-gray-200">
          {['blogs', 'qa', 'polls', 'whiteboard'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 -mb-px font-semibold ${
                activeTab === tab
                  ? 'border-b-2 border-[#0C1B33 text-[#0C1B33]'
                  : 'text-gray-600'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-4">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
