import React from "react";

const FarmerTable = ({
  farmers,
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  riceFarmers,
  cornFarmers,
}) => {
  const tabs = ["All", "Monthly", "Weekly", "Today"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full h-full flex flex-col">
      <div className="px-6 py-5 flex justify-between items-center border-b border-gray-100">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Total Records: {riceFarmers + cornFarmers}
          </h2>
          <div className="flex gap-4 mt-3">
            <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
              Rice Farmers: {riceFarmers}
            </span>
            <span className="text-xs px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-medium">
              Corn Farmers: {cornFarmers}
            </span>
            <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
              Total Records: {riceFarmers + cornFarmers}
            </span>
          </div>
        </div>
        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <span className="text-lg">⋮</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-gray-100">
        <div className="flex px-6 py-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm cursor-pointer transition-colors relative ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search farmer"
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-72 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full table-auto h-full">
          <thead className="bg-gray-50/70 sticky top-0">
            <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-6 py-4">RSBSA Number</th>
              <th className="px-4 py-4">Full Name</th>
              <th className="px-4 py-4">Description</th>
              <th className="px-4 py-4">Crop</th>
              <th className="px-4 py-4">Area</th>
              <th className="px-4 py-4">Barangay</th>
              <th className="px-4 py-4">Contact</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {farmers.map((farmer, index) => (
              <tr
                key={farmer.id + index}
                className="hover:bg-gray-50/50 transition-colors duration-150"
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">👨‍🌾</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {farmer.rsbsa}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-5 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    {farmer.name}
                  </span>
                </td>
                <td className="px-4 py-5 whitespace-nowrap">
                  <span className="text-sm text-gray-600">
                    {farmer.description}
                  </span>
                </td>
                <td className="px-4 py-5 whitespace-nowrap">
                  <span className="text-sm text-gray-600">{farmer.crop}</span>
                </td>
                <td className="px-4 py-5 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    {farmer.area}
                  </span>
                </td>
                <td className="px-4 py-5 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {farmer.barangay}
                  </span>
                </td>
                <td className="px-4 py-5 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                    {farmer.contact}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerTable;
