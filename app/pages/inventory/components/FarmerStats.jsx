import React from 'react'

const FarmerStats = () => {
  const statsData = [
    { month: 'Wine', value: 80, color: 'text-red-500' },
    { month: 'Wheat', value: 60, color: 'text-blue-500' },
    { month: 'Corn', value: 40, color: 'text-green-500' },
    { month: 'Rice', value: 35, color: 'text-purple-500' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Farmer Stats</h3>
      
      <div className="relative h-64">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-8 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-t border-gray-200 w-full"></div>
            ))}
          </div>
          
          {/* Chart lines */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Example line chart paths */}
            <path
              d="M 0 80 Q 100 60 200 100 T 400 120"
              stroke="#8b5cf6"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 0 100 Q 100 80 200 60 T 400 80"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 0 120 Q 100 100 200 80 T 400 60"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 0 140 Q 100 120 200 100 T 400 140"
              stroke="#f59e0b"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-500">
          {statsData.map((item, index) => (
            <span key={index}>{item.month}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FarmerStats
