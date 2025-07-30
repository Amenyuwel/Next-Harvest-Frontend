"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { pestReportsData } from "@/assets/dummydata";

const PestClassesTable = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Pest Classes Table
        </h2>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col gap-1.5 border-b border-gray-100 px-6 py-3 md:flex-row md:items-center md:justify-between md:gap-2">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="e.g. snail"
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

      {/* Table */}
      <div className="scrollbar-hide flex-1 overflow-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b border-gray-100 text-left text-sm font-medium text-gray-600">
              <th className="px-6 py-4">Pest Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Recommendations</th>
              <th className="px-6 py-4">Active Month</th>
              <th className="px-6 py-4">Season</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {pestReportsData
              .filter((row) =>
                row.pestName.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {row.pestName}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.description}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.recommended}
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
                        row.season === "Summer" || row.season === "All season"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      <Icon
                        icon={
                          row.season === "All season"
                            ? "mdi:calendar"
                            : row.season === "Summer"
                              ? "mdi:weather-sunny"
                              : "mdi:weather-rainy"
                        }
                        width="12"
                        height="12"
                        className="mr-1"
                      />
                      {row.season === "All season" ? "El Niño" : row.season}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 transition hover:bg-green-200">
                        <Icon icon="mdi:check" width="16" height="16" />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-200">
                        <Icon
                          icon="mdi:delete-outline"
                          width="16"
                          height="16"
                        />
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

export default PestClassesTable;
