import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { pestReportsData } from "../../../assets/dummydata";

const PestReportsTable = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Monthly", "Weekly", "Today"];

  // Function to get pest icon based on pest name
  const getPestIcon = (pestName) => {
    switch (pestName.toLowerCase()) {
      case 'caterpillar':
        return 'game-icons:caterpillar';
      case 'snail':
        return 'mdi:snail';
      case 'worm':
        return 'game-icons:worm';
      case 'cricket':
        return 'mdi:cricket';
      case 'ant':
        return 'mdi:ant';
      default:
        return 'mdi:bug';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-black">Pest</h3>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-green-600 border-b-2 border-green-600 pb-2"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-white sticky top-0">
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Number
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Pest Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Recommendations
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Active month
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Season
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {pestReportsData.map((row, index) => (
              <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-25">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Icon 
                        icon={getPestIcon(row.pestName)} 
                        width="20" 
                        height="20" 
                        className="text-green-600" 
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{row.number}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900 font-medium">{row.pestName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{row.description}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{row.recommended}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                    row.activeMonth === 'Decreased' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    <Icon 
                      icon={row.activeMonth === 'Decreased' ? 'mdi:trending-down' : 'mdi:trending-up'} 
                      width="12" 
                      height="12" 
                      className="mr-1" 
                    />
                    {row.activeMonth}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                    row.season === 'All season' 
                      ? 'bg-orange-100 text-orange-700' 
                      : row.season === 'Summer'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    <Icon 
                      icon={row.season === 'All season' ? 'mdi:calendar' : 'mdi:weather-sunny'} 
                      width="12" 
                      height="12" 
                      className="mr-1" 
                    />
                    {row.season === 'All season' ? 'El niño' : row.season}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                      <Icon icon="mdi:check" width="16" height="16" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                      <Icon icon="mdi:delete-outline" width="16" height="16" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PestReportsTable;