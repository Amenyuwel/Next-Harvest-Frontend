import React from "react";
import { Icon } from "@iconify/react";

const PieChart = () => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow w-full lg:w-64 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-black mb-1 sm:mb-0">Reports per pests</h3>
        <span className="text-sm text-gray-500">This Week</span>
      </div>
      
      {/* Donut Chart */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6">
        <svg className="w-32 h-32 sm:w-40 sm:h-40 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            stroke="#f3f4f6" 
            strokeWidth="10" 
            fill="none"
          />
          
          {/* Green segment (Stem Borer) - 40% */}
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            stroke="#10b981" 
            strokeWidth="10" 
            fill="none"
            strokeDasharray="87.96 219.91"
            strokeDashoffset="0"
            strokeLinecap="round"
          />
          
          {/* Red segment (Snail) - 25% */}
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            stroke="#f87171" 
            strokeWidth="10" 
            fill="none"
            strokeDasharray="54.98 219.91"
            strokeDashoffset="-87.96"
            strokeLinecap="round"
          />
          
          {/* Yellow segment (Worm) - 20% */}
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            stroke="#fbbf24" 
            strokeWidth="10" 
            fill="none"
            strokeDasharray="43.98 219.91"
            strokeDashoffset="-142.94"
            strokeLinecap="round"
          />
          
          {/* Gray segment (Caterpillar) - 15% */}
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            stroke="#d1d5db" 
            strokeWidth="10" 
            fill="none"
            strokeDasharray="32.99 219.91"
            strokeDashoffset="-186.92"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500">Total</span>
          <span className="text-xl sm:text-2xl font-bold text-black">1.5K</span>
        </div>
      </div>

      {/* Legend - responsive grid */}
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-gray-700">Stem Borer</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-gray-700">Snail</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-gray-700">Worm</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-gray-700">Caterpillar</span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;