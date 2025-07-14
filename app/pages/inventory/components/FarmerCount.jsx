import React from 'react'

const FarmerCount = ({ riceFarmers, cornFarmers }) => {
  const totalFarmers = riceFarmers + cornFarmers

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Farmer count</h3>
      
      <div className="space-y-6">
        {/* Rice Farmers */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Rice Farmers</span>
            <span className="text-lg font-semibold text-gray-900">{riceFarmers}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-400 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(riceFarmers / totalFarmers) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Corn Farmers */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Corn Farmers</span>
            <span className="text-lg font-semibold text-gray-900">{cornFarmers}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-400 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(cornFarmers / totalFarmers) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmerCount
