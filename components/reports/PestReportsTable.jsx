import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { pestReportsData } from "@/assets/dummydata";

const PestReportsTable = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Monthly", "Weekly", "Today"];

  // Function to get pest icon based on pest name
  const getPestIcon = (pestName) => {
    switch (pestName.toLowerCase()) {
      case "caterpillar":
        return "game-icons:caterpillar";
      case "snail":
        return "mdi:snail";
      case "worm":
        return "game-icons:worm";
      case "cricket":
        return "mdi:cricket";
      case "ant":
        return "mdi:ant";
      default:
        return "mdi:bug";
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
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
                className={`cursor-pointer text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-green-600 pb-2 text-green-600"
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
      <div className="scrollbar-hide flex-1 overflow-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-100 text-left text-sm font-medium text-gray-600">
              <th className="px-6 py-4">Number</th>
              <th className="px-6 py-4">Pest Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Recommendations</th>
              <th className="px-6 py-4">Active month</th>
              <th className="px-6 py-4">Season</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {pestReportsData.map((row, index) => (
              <tr
                key={row.id}
                className="hover:bg-gray-25 border-b border-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                      <Icon
                        icon={getPestIcon(row.pestName)}
                        width="20"
                        height="20"
                        className="text-green-600"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {row.number}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {row.pestName}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {row.description}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {row.recommended}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      row.activeMonth === "Decreased"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    <Icon
                      icon={
                        row.activeMonth === "Decreased"
                          ? "mdi:trending-down"
                          : "mdi:trending-up"
                      }
                      width="12"
                      height="12"
                      className="mr-1"
                    />
                    {row.activeMonth}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      row.season === "All season"
                        ? "bg-orange-100 text-orange-700"
                        : row.season === "Summer"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <Icon
                      icon={
                        row.season === "All season"
                          ? "mdi:calendar"
                          : "mdi:weather-sunny"
                      }
                      width="12"
                      height="12"
                      className="mr-1"
                    />
                    {row.season === "All season" ? "El niño" : row.season}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors hover:bg-green-200">
                      <Icon icon="mdi:check" width="16" height="16" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 transition-colors hover:bg-red-200">
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
