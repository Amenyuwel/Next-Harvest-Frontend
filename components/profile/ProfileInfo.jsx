"use client";
import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

const ProfileInfo = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
    <div className="h-full flex flex-col bg-gradient-to-br from-white via-backgroundOffWhite/50 to-backgroundLightGray/30 rounded-2xl shadow-lg border border-backgroundLightGray backdrop-blur-sm overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-iconsAccent/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-iconsAccent/8 to-primary/8 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-8 w-2 h-2 bg-primary/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-12 w-1 h-1 bg-iconsAccent/40 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Header with Animation */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-textPrimary mb-1">
                Hi Admin!
              </h1>
              <p className="text-sm text-textDescription">Manage your profile settings</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-iconsAccent rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="relative bg-white rounded-full p-2">
                <Icon icon="mdi:account-settings" className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Profile Avatar */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative">
            {/* Rotating border animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-iconsAccent to-primary rounded-full animate-spin p-1" style={{ animationDuration: '3s' }}>
              <div className="w-full h-full bg-white rounded-full"></div>
            </div>
            
            <div 
              className="relative w-24 h-24 rounded-full overflow-hidden group cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-2xl"
              onClick={triggerFileInput}
            >
              {profileImage ? (
                <img 
                  src={profileImage}
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-iconsAccent flex items-center justify-center text-white text-2xl font-bold">
                  EM
                </div>
              )}
              
              {/* Enhanced upload overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-primary/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                <div className="text-center">
                  <Icon icon="mdi:camera-plus" className="text-white text-2xl mb-1 animate-bounce" />
                  <p className="text-xs text-white font-medium">Upload</p>
                </div>
              </div>
              
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-iconsAccent rounded-full border-3 border-white flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <h2 className="text-lg font-bold text-textPrimary mt-4 mb-2">Emmanuel S. Magsaysay</h2>
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <Icon icon="mdi:shield-check" className="w-4 h-4" />
            <span>Verified Admin</span>
          </div>
        </div>

        {/* Enhanced Form Fields */}
        <div className="space-y-5 flex-1 overflow-y-auto">
          {/* Name Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-textPrimary mb-2">
              <Icon icon="mdi:account" className="w-4 h-4 text-primary" />
              Full Name
            </label>
            <div className="relative">
              <input 
                type="text" 
                value="Emmanuel S. Magsaysay"
                readOnly
                className="w-full px-4 py-3 border-2 border-backgroundLightGray rounded-xl bg-white/70 backdrop-blur-sm text-sm cursor-default transition-all duration-300 group-hover:border-primary/60"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-iconsAccent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-textPrimary mb-2">
              <Icon icon="mdi:email" className="w-4 h-4 text-iconsAccent" />
              Email Address
            </label>
            <div className="relative">
              <input 
                type="email" 
                value="Emmanuel@gmail.com"
                readOnly
                className="w-full px-4 py-3 border-2 border-backgroundLightGray rounded-xl bg-white/70 backdrop-blur-sm text-sm cursor-default transition-all duration-300 group-hover:border-iconsAccent/60"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-iconsAccent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-textPrimary mb-2">
              <Icon icon="mdi:phone" className="w-4 h-4 text-primary" />
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="px-3 py-3 border-2 border-backgroundLightGray rounded-xl bg-white/70 backdrop-blur-sm text-sm cursor-default transition-all duration-300">
                🇵🇭 +63
              </div>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value="915787471"
                  readOnly
                  className="w-full px-4 py-3 border-2 border-backgroundLightGray rounded-xl bg-white/70 backdrop-blur-sm text-sm cursor-default transition-all duration-300 group-hover:border-primary/60"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-iconsAccent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Age Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-textPrimary mb-2">
              <Icon icon="mdi:calendar" className="w-4 h-4 text-iconsAccent" />
              Age
            </label>
            <div className="relative">
              <input 
                type="number" 
                value="25"
                readOnly
                className="w-full px-4 py-3 border-2 border-backgroundLightGray rounded-xl bg-white/70 backdrop-blur-sm text-sm cursor-default transition-all duration-300 group-hover:border-iconsAccent/60"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-iconsAccent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Password Field */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-semibold text-textPrimary mb-2">
              <Icon icon="mdi:lock" className="w-4 h-4 text-primary" />
              Password
            </label>
            <div className="relative">
              <input 
                type="password" 
                value="••••••••"
                readOnly
                className="w-full px-4 py-3 border-2 border-backgroundLightGray rounded-xl bg-white/70 backdrop-blur-sm text-sm cursor-default transition-all duration-300 group-hover:border-primary/60"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-iconsAccent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-textDescription hover:text-primary transition-colors duration-200">
                <Icon icon="mdi:eye-off" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileInfo;