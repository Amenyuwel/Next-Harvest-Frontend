"use client";
import React from 'react';
import { Icon } from "@iconify/react";
import { activityLogs } from '@/assets/dummydata';

const ProfileProgressSection = () => {
  const getActionIcon = (action) => {
    switch (action) {
      case 'ADD': return 'mdi:plus-circle';
      case 'EDIT': return 'mdi:pencil';
      case 'DELETE': return 'mdi:delete';
      default: return 'mdi:file-document';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'ADD': return 'bg-green-100 text-green-800 border-green-200';
      case 'EDIT': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DELETE': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'info': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full bg-white rounded-2xl shadow-sm">
      <div className="h-full flex flex-col">
        {/* Activity Carousel */}
        <div className="flex-1 overflow-x-auto scrollbar-hide p-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-3 h-full">
            {activityLogs.map((log, index) => (
              <div 
                key={log.id} 
                className={`flex-1 min-w-0 bg-gradient-to-br from-backgroundOffWhite to-backgroundLightGray rounded-xl p-4 hover:shadow-md transition-all duration-200 border border-backgroundLightGray/50 ${
                  index === 0 ? 'ring-1 ring-primary/40' : ''
                }`}
                style={{ 
                  minWidth: `calc((100% - ${(activityLogs.length - 1) * 12}px) / ${activityLogs.length})`,
                  height: '100%'
                }}
              >
                {/* Card Header */}
                <div className="mb-3">
                  <h2 className="text-base font-bold text-textPrimary mb-1">Activity Log</h2>
                  <div className="text-sm font-semibold text-primary">Juan Dela Cruz</div>
                </div>

                {/* Action Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)} flex items-center gap-1`}>
                    <Icon icon={getActionIcon(log.action)} className="w-3 h-3" />
                    {log.action}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(log.status)}`}></div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col h-full">
                  <h3 className="text-sm font-bold text-textPrimary mb-2 line-clamp-1">{log.item}</h3>
                  <p className="text-xs text-textDescription mb-2 line-clamp-2 leading-relaxed flex-1">{log.description}</p>
                  <div className="mt-auto">
                    <div className="text-xs text-textDescription">{log.timestamp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileProgressSection;