import React from 'react'

const FarmerTable = ({ farmers, activeTab, setActiveTab, searchTerm, setSearchTerm }) => {
  const tabs = ['All', 'Monthly', 'Weekly', 'Today']

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Pest</h2>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b items-center">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search farmer"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <button className="px-4 py-2 text-gray-600">
          <span className="text-lg">⋮</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">RSBSA Number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Full Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Crop</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barangay</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {farmers.map((farmer, index) => (
              <tr key={farmer.id + index} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">👨‍🌾</span>
                    </div>
                    <span className="text-sm text-gray-600">{farmer.rsbsa}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {farmer.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  {farmer.description}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                  {farmer.crop}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {farmer.area}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {farmer.barangay}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {farmer.contact}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FarmerTable
