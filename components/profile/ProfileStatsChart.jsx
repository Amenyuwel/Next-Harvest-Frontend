"use client";
import React from "react";
import { Icon } from "@iconify/react";

const ProfileStatsChart = () => {
  const recentActivities = [
    {
      id: 1,
      type: "online",
      title: "Currently Online",
      description: "Active session started",
      time: "Now",
      icon: "mdi:circle",
      iconColor: "text-green-500",
      status: "success"
    },
    {
      id: 2,
      type: "login",
      title: "Logged In",
      description: "Signed in from Chrome on Windows",
      time: "2 hours ago",
      icon: "mdi:key-variant",
      iconColor: "text-blue-500",
      status: "info"
    },
    {
      id: 3,
      type: "logout",
      title: "Logged Out",
      description: "Session ended normally",
      time: "Yesterday 8:45 PM",
      icon: "mdi:lock",
      iconColor: "text-gray-500",
      status: "info"
    },
    {
      id: 4,
      type: "login",
      title: "Logged In",
      description: "Signed in from Firefox on Windows",
      time: "Yesterday 6:30 AM",
      icon: "mdi:key-variant",
      iconColor: "text-blue-500",
      status: "info"
    },
    {
      id: 5,
      type: "logout",
      title: "Logged Out",
      description: "Session ended normally",
      time: "2 days ago 9:22 PM",
      icon: "mdi:lock",
      iconColor: "text-gray-500",
      status: "info"
    },
    {
      id: 6,
      type: "login",
      title: "Logged In",
      description: "Signed in from Chrome on Android",
      time: "2 days ago 7:15 AM",
      icon: "mdi:key-variant",
      iconColor: "text-blue-500",
      status: "info"
    },
    {
      id: 7,
      type: "logout",
      title: "Logged Out",
      description: "Session timeout after inactivity",
      time: "3 days ago 11:30 PM",
      icon: "mdi:clock-alert",
      iconColor: "text-yellow-500",
      status: "warning"
    },
    {
      id: 8,
      type: "login",
      title: "Logged In",
      description: "Signed in from Chrome on Windows",
      time: "3 days ago 6:45 AM",
      icon: "mdi:key-variant",
      iconColor: "text-blue-500",
      status: "info"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="flex h-full w-full flex-col rounded-2xl bg-white shadow-sm">
      {/* Header */}
      <header className="px-6 py-4 border-b border-backgroundLightGray">
        <h2 className="text-lg font-bold text-textPrimary">Session Activity</h2>
      </header>
      
      {/* Activity Cards Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {recentActivities.slice(0, 6).map((activity) => (
            <div 
              key={activity.id} 
              className="bg-gradient-to-br from-backgroundOffWhite to-backgroundLightGray rounded-xl p-3 hover:shadow-md transition-all duration-200 border border-backgroundLightGray/50"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Icon 
                    icon={activity.icon} 
                    className={`w-3 h-3 ${activity.iconColor}`}
                  />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.type === 'online' ? 'Active' : activity.type === 'login' ? 'Sign In' : 'Sign Out'}
                </span>
              </div>
              
              {/* Content */}
              <div className="mb-3">
                <h3 className="text-sm font-bold text-textPrimary mb-1 line-clamp-1">{activity.title}</h3>
                <p className="text-xs text-textDescription line-clamp-2 leading-relaxed">{activity.description}</p>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-textDescription truncate">{activity.time}</span>
                {activity.type !== 'online' && (
                  <Icon 
                    icon={activity.type === 'login' ? 'mdi:lock-open' : 'mdi:lock'} 
                    className="w-3 h-3 text-textDescription ml-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 border-t border-backgroundLightGray bg-backgroundOffWhite/30">
        <div className="text-center">
          <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">
            View All Sessions →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileStatsChart;