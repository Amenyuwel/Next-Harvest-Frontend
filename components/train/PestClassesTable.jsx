"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { usePests, useSearch } from "../../hooks/index.js";

const PestClassesTable = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Use custom hooks
  const { pests, loading, error, refreshPests } = usePests();

  // Helper function to format array data as string
  const formatArrayToString = (array) => {
    if (!array || array.length === 0) return "";
    return array.join(", ");
  };

  // Use search hook with appropriate fields
  const searchFields = ["pestName", "recommendations", "activeMonth", "season"];
  const filteredPests = useSearch(pests, searchFields, searchTerm);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            Pest Classes Table
          </h2>
          {/* Refresh Button */}
          <button
            onClick={refreshPests}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            title="Refresh Data"
          >
            <Icon icon="mdi:refresh" width="20" height="20" />
          </button>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col gap-1.5 border-b border-gray-100 px-6 py-3 md:flex-row md:items-center md:justify-between md:gap-2">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search pest name, recommendations, season..."
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

      {/* Loading/Error States */}
      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Icon
              icon="mdi:loading"
              className="mb-2 animate-spin text-4xl text-blue-500"
            />
            <p className="text-gray-500">Loading pest data...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <Icon
              icon="mdi:alert-circle"
              className="mb-2 text-4xl text-red-500"
            />
            <p className="mb-2 text-red-500">{error}</p>
            <button
              onClick={fetchPestData}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="scrollbar-hide flex-1 overflow-auto">
          <table className="w-full table-auto">
            <thead className="sticky top-0 z-10 bg-gray-50/70">
              <tr className="text-left text-xs font-semibold tracking-wider text-[var(--color-text-primary)] uppercase">
                <th className="px-6 py-4">Pest Name</th>
                <th className="px-6 py-4">Recommendations</th>
                <th className="px-6 py-4">Active Month</th>
                <th className="px-6 py-4">Season</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredPests.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "No pest data found matching your search."
                      : "No pest data found."}
                  </td>
                </tr>
              ) : (
                filteredPests.map((pest, index) => (
                  <tr
                    key={pest._id || index}
                    className="transition-colors duration-150 hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {pest.pestName}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {formatArrayToString(pest.recommendations)}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {formatArrayToString(pest.activeMonth)}
                      </span>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          pest.season === "Summer" ||
                          pest.season === "All season" ||
                          pest.season === "Dry Season"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        <Icon
                          icon={
                            pest.season === "All season"
                              ? "mdi:calendar"
                              : pest.season === "Summer" ||
                                  pest.season === "Dry Season"
                                ? "mdi:weather-sunny"
                                : "mdi:weather-rainy"
                          }
                          width="12"
                          height="12"
                          className="mr-1"
                        />
                        {pest.season}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200">
                          <Icon icon="mdi:pencil" width="16" height="16" />
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
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PestClassesTable;
