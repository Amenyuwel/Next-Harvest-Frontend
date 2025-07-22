import React from "react";
import { Icon } from "@iconify/react";

const ReportsChart = () => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow flex-1 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Icon icon="mdi:bug" width="20" height="20" className="text-gray-700 sm:w-6 sm:h-6" />
          <h3 className="text-base sm:text-lg font-semibold text-black">Pest Report Overview</h3>
        </div>
      </div>
      
      {/* Chart Area - responsive */}
      <div className="h-48 sm:h-64 lg:h-80 bg-gray-50 rounded-xl p-3 sm:p-4 lg:p-6 relative overflow-hidden">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 500 300" 
          className="absolute inset-3 sm:inset-4 lg:inset-6"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          <g stroke="var(--color-chart-grid)" strokeWidth="1">
            {/* Vertical axis */}
            <line x1="50" y1="20" x2="50" y2="250" />
            {/* Horizontal axis */}
            <line x1="50" y1="250" x2="450" y2="250" />
            {/* Horizontal grid lines */}
            <line x1="50" y1="200" x2="450" y2="200" opacity="0.5" />
            <line x1="50" y1="150" x2="450" y2="150" opacity="0.5" />
            <line x1="50" y1="100" x2="450" y2="100" opacity="0.5" />
            <line x1="50" y1="50" x2="450" y2="50" opacity="0.5" />
            {/* Vertical grid lines */}
            <line x1="150" y1="20" x2="150" y2="250" opacity="0.3" />
            <line x1="250" y1="20" x2="250" y2="250" opacity="0.3" />
            <line x1="350" y1="20" x2="350" y2="250" opacity="0.3" />
          </g>
          
          {/* Data lines matching the image */}
          {/* Purple line */}
          <polyline 
            points="50,70 150,60 250,180 350,40 450,160" 
            fill="none" 
            stroke="var(--color-chart-purple)" 
            strokeWidth="2"
          />
          {/* Light blue line */}
          <polyline 
            points="50,80 150,120 250,140 350,170 450,180" 
            fill="none" 
            stroke="var(--color-chart-cyan)" 
            strokeWidth="2"
          />
          {/* Red/pink line */}
          <polyline 
            points="50,75 150,85 250,95 350,130 450,200" 
            fill="none" 
            stroke="var(--color-chart-red)" 
            strokeWidth="2"
          />
          
          {/* Data points */}
          <g fill="var(--color-chart-purple)">
            <circle cx="50" cy="70" r="3" />
            <circle cx="150" cy="60" r="3" />
            <circle cx="250" cy="180" r="3" />
            <circle cx="350" cy="40" r="3" />
            <circle cx="450" cy="160" r="3" />
          </g>
          <g fill="var(--color-chart-cyan)">
            <circle cx="50" cy="80" r="3" />
            <circle cx="150" cy="120" r="3" />
            <circle cx="250" cy="140" r="3" />
            <circle cx="350" cy="170" r="3" />
            <circle cx="450" cy="180" r="3" />
          </g>
          <g fill="var(--color-chart-red)">
            <circle cx="50" cy="75" r="3" />
            <circle cx="150" cy="85" r="3" />
            <circle cx="250" cy="95" r="3" />
            <circle cx="350" cy="130" r="3" />
            <circle cx="450" cy="200" r="3" />
          </g>
          
          {/* Y-axis labels */}
          <text x="40" y="25" fontSize="10" fill="var(--color-chart-text)" textAnchor="end" className="sm:text-xs">100</text>
          <text x="40" y="55" fontSize="10" fill="var(--color-chart-text)" textAnchor="end" className="sm:text-xs">80</text>
          <text x="40" y="105" fontSize="10" fill="var(--color-chart-text)" textAnchor="end" className="sm:text-xs">60</text>
          <text x="40" y="155" fontSize="10" fill="var(--color-chart-text)" textAnchor="end" className="sm:text-xs">40</text>
          <text x="40" y="205" fontSize="10" fill="var(--color-chart-text)" textAnchor="end" className="sm:text-xs">20</text>
          <text x="40" y="255" fontSize="10" fill="var(--color-chart-text)" textAnchor="end" className="sm:text-xs">0</text>
          
          {/* X-axis labels - responsive text */}
          <g fontSize="10" fill="var(--color-chart-text)" textAnchor="middle" className="sm:text-xs">
            <text x="100" y="270" className="hidden sm:block">Caterpillar</text>
            <text x="200" y="270" className="hidden sm:block">Worm</text>
            <text x="300" y="270" className="hidden sm:block">Cricket</text>
            <text x="400" y="270" className="hidden sm:block">Bird</text>
            {/* Mobile labels - shorter */}
            <text x="100" y="270" className="block sm:hidden">Cat</text>
            <text x="200" y="270" className="block sm:hidden">Wrm</text>
            <text x="300" y="270" className="block sm:hidden">Cri</text>
            <text x="400" y="270" className="block sm:hidden">Brd</text>
          </g>
        </svg>
        
        {/* Legend - responsive positioning */}
        <div className="absolute bottom-2 right-2 hidden lg:flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-purple-500"></div>
            <span className="text-gray-600">Purple</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-cyan-500"></div>
            <span className="text-gray-600">Cyan</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-red-400"></div>
            <span className="text-gray-600">Red</span>
          </div>
        </div>
      </div>
      
      {/* Mobile legend - shows below chart on small screens */}
      <div className="flex justify-center gap-4 mt-4 text-xs lg:hidden">
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-purple-500"></div>
          <span className="text-gray-600">Purple</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-cyan-500"></div>
          <span className="text-gray-600">Cyan</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-red-400"></div>
          <span className="text-gray-600">Red</span>
        </div>
      </div>
    </div>
  );
};

export default ReportsChart;