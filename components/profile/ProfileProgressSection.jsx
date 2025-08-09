"use client";
import React from 'react';
import ProgressBar from '@/components/dashboard/progressBar';

const ProfileProgressSection = () => {
  return (
    <div className="h-full p-6 bg-white rounded-2xl shadow-sm">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-black">Farmer count</h2>
         
        </div>
        <div className="flex-1 space-y-6">
          <ProgressBar label="Rice Farmers" value={258} max={300} />
          <ProgressBar label="Corn Farmers" value={187} max={250} />
        </div>
      </div>
    </div>
  );
};

export default ProfileProgressSection;