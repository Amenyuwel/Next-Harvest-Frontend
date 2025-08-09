"use client";
import React from 'react';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileProgressSection from '@/components/profile/ProfileProgressSection';
import ProfileStatsChart from '@/components/profile/ProfileStatsChart';
import ProfileNotifications from '@/components/profile/ProfileNotifications';

function ProfilePage() {
  return (
    <div className="h-full w-full p-6 ">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 grid-rows-12 gap-6 h-full">
        {/* Profile Info - Left Column */}
        <div className="col-span-3 row-span-12">
          <ProfileInfo />
        </div>
        
        {/* Progress Section - Top Right */}
        <div className="col-span-9 row-span-4">
          <ProfileProgressSection />
        </div>
        
        {/* Chart Section - Bottom Left of Right Side */}
        <div className="col-span-6 row-span-8">
          <ProfileStatsChart />
        </div>
        
        {/* Notifications - Bottom Right */}
        <div className="col-span-3 row-span-8">
          <ProfileNotifications />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;