"use client";
import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

const ProfileInfo = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-black mb-1">Hi Admin!</h1>
      </div>

      {/* Profile Avatar and Info */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4 overflow-hidden group cursor-pointer" onClick={triggerFileInput}>
          {profileImage ? (
            <img 
              src={profileImage}
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src="/api/placeholder/80/80" 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          )}
          {!profileImage && (
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-2xl font-bold" style={{display: 'none'}}>
              EM
            </div>
          )}
          
          {/* Upload overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
            <Icon icon="mdi:camera-plus" className="text-white text-xl" />
          </div>
        </div>
        
        {/* Hidden file input */}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload}
          className="hidden"
        />
        
        <h2 className="text-lg font-semibold text-black mb-1">Edit Profile</h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 uppercase">NAME:</label>
          <input 
            type="text" 
            value="Emmanuel S. Magsaysay"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            value="Emmanuel@gmail.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cellphone number:</label>
          <div className="flex">
            <select className="px-2 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>+63</option>
            </select>
            <input 
              type="text" 
              value="915787471"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Age Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input 
            type="text" 
            value="25"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            value="••••••••"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;