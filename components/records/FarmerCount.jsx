import React from "react";

const FarmerCount = ({ riceFarmers, cornFarmers }) => {
  const totalFarmers = riceFarmers + cornFarmers;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 h-full border border-gray-100">
      <h3 className="text-base font-medium text-gray-800 mb-4">Farmer Count</h3>

      <div className="space-y-4">
        {/* Rice Farmers */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">
              Rice Farmers
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {riceFarmers}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-400 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(riceFarmers / totalFarmers) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Corn Farmers */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-600">
              Corn Farmers
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {cornFarmers}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-400 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(cornFarmers / totalFarmers) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerCount;
