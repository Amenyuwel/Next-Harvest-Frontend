import React from 'react';
import { Icon } from '@iconify/react';

const GlobalHeader = ({ 
  title = "Hi Admin!", 
  showAddButton = true, 
  addButtonText = "Add Farmer",
  onAddClick,
  showProfile = true 
}) => {
  return (
    <div className="w-full flex justify-between items-center px-6 py-4 ">
      {/* Title */}
      <h1 className="text-4xl font-semibold text-black">{title}</h1>
      
      {/* Right side - Add Button + Profile */}
      <div className="flex items-center gap-4">
        {showAddButton && (
          <button 
            onClick={onAddClick}
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            {addButtonText}
            <Icon icon="mdi:plus" width="20" height="20" />
          </button>
        )}
        
        {showProfile && (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img 
              src="/api/placeholder/48/48" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalHeader;