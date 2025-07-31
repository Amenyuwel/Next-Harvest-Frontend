"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const barangayHeatData = [
  { name: "Barangay 1", snail: 5, fallarmyworm: 2, stemborer: 0 },
  { name: "Barangay 2", snail: 8, fallarmyworm: 4, stemborer: 1 },
  { name: "Barangay 3", snail: 12, fallarmyworm: 7, stemborer: 3 },
  { name: "Barangay 4", snail: 2, fallarmyworm: 1, stemborer: 0 },
  { name: "Barangay 5", snail: 15, fallarmyworm: 10, stemborer: 4 },
  // Add more as needed
];

const getHeatColor = (value) => {
  if (value === 0) return "bg-gray-100 text-gray-700";
  if (value < 5) return "bg-green-100 text-green-700";
  if (value < 10) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};


const ReportsHeatMap = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = barangayHeatData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Pest Heatmap by Barangay
        </h2>
      </div>

      {/* Search + Legend */}
      <div className="flex flex-col gap-2 border-b border-gray-100 px-6 py-3 md:flex-row md:items-center md:justify-between">
        {/* Left: Button + Search */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search barangay..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

        {/* Right: Legend + More Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 md:mt-0">
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-gray-300 bg-gray-100"></span>
              None
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-green-300 bg-green-100"></span>
              Low
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-yellow-300 bg-yellow-100"></span>
              Medium
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-red-300 bg-red-100"></span>
              High
            </div>
          </div>

          {/* More Options Button */}
          <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100">
            <span className="text-lg">⋮</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="scrollbar-hide flex-1 overflow-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b border-gray-100 text-left text-sm font-medium text-gray-600">
              <th className="px-6 py-4">Barangay</th>
              <th className="px-6 py-4">Snail</th>
              <th className="px-6 py-4">Fall Armyworm</th>
              <th className="px-6 py-4">Stemborer</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredData.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {row.name}
                </td>
                <td
                  className={`px-6 py-4 text-sm font-medium ${getHeatColor(row.snail)}`}
                >
                  {row.snail}
                </td>
                <td
                  className={`px-6 py-4 text-sm font-medium ${getHeatColor(row.fallarmyworm)}`}
                >
                  {row.fallarmyworm}
                </td>
                <td
                  className={`px-6 py-4 text-sm font-medium ${getHeatColor(row.stemborer)}`}
                >
                  {row.stemborer}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsHeatMap;
