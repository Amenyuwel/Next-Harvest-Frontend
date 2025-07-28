import React from "react";

const RecordsFarmerTable = ({
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
    <div className="flex h-full w-full flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Farmer Records Table
          </h2>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex items-center justify-between border-b border-gray-100">
        {/* Search */}
        <div className="px-6 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search farmer"
              className="w-72 rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute top-3 left-3 h-4 w-4 text-gray-400"
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
        <div className="flex px-6 py-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative cursor-pointer px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-blue-500"></div>
              )}
            </button>
          ))}
          <button className="rounded-lg p-4 text-gray-600 transition-colors hover:bg-gray-50">
            <span className="text-lg">⋮</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="scrollbar-hide overflow-auto rounded-b-2xl">
        <table className="w-full table-auto">
          <thead className="sticky top-0 z-10 bg-gray-50/70">
            <tr className="text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
              <th className="px-6 py-4">RSBSA Number</th>
              <th className="px-4 py-4">Full Name</th>
              <th className="px-4 py-4">Description</th>
              <th className="px-4 py-4">Crop</th>
              <th className="px-4 py-4">Area</th>
              <th className="px-4 py-4">Barangay</th>
              <th className="px-4 py-4">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {farmers.map((farmer, index) => (
              <tr
                key={farmer.id + index}
                className="transition-colors duration-150 hover:bg-gray-50/50"
              >
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
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
                  <span className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                    {farmer.area}
                  </span>
                </td>
                <td className="px-4 py-5 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                    {farmer.barangay}
                  </span>
                </td>
                <td className="px-4 py-5 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
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

export default RecordsFarmerTable;
