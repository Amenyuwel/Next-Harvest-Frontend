"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import AddBarangayModal from "./AddBarangayModal";

const getHeatColor = (value) => {
  if (value === 0) return "bg-gray-100";
  if (value < 5) return "bg-green-100";
  if (value < 10) return "bg-yellow-100";
  return "bg-red-100";
};

const ReportsHeatMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [barangayData, setBarangayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch barangays from MongoDB
  const fetchBarangays = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/barangays");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Transform MongoDB data to match your component structure
        const transformedData = data.data.map((barangay) => ({
          id: barangay._id,
          number: barangay.barangay_id,
          name: barangay.barangay_name,
          // Add default pest data (you can fetch this from a separate endpoint later)
          snail: 0,
          fallarmyworm: 0,
          stemborer: 0,
        }));

        setBarangayData(transformedData);
      } else {
        setError(data.message || "Failed to fetch barangays");
      }
    } catch (error) {
      console.error("Error fetching barangays:", error);
      setError("Failed to load barangays. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add new barangay
  const handleAddBarangay = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/barangays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barangay_id: formData.barangayNumber,
          barangay_name: formData.barangayName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`,
        );
      }

      if (data.success) {
        // Refresh the barangay list
        fetchBarangays();
        alert("Barangay added successfully!");
      } else {
        alert(data.message || "Failed to add barangay");
      }
    } catch (error) {
      console.error("Error adding barangay:", error);
      alert(error.message || "Failed to add barangay. Please try again.");
    }
  };

  // Delete barangay
  const handleDeleteBarangay = async (barangayId) => {
    if (!confirm("Are you sure you want to delete this barangay?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/barangays/${barangayId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`,
        );
      }

      if (data.success) {
        // Refresh the barangay list
        fetchBarangays();
        alert("Barangay deleted successfully!");
      } else {
        alert(data.message || "Failed to delete barangay");
      }
    } catch (error) {
      console.error("Error deleting barangay:", error);
      alert(error.message || "Failed to delete barangay. Please try again.");
    }
  };

  // Filter data based on search term
  const filteredData = barangayData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.number.includes(searchTerm) ||
      (searchTerm.toLowerCase() === "snail" && row.snail > 0) ||
      (searchTerm.toLowerCase() === "fall armyworm" && row.fallarmyworm > 0) ||
      (searchTerm.toLowerCase() === "stemborer" && row.stemborer > 0) ||
      (searchTerm.toLowerCase() === "armyworm" && row.fallarmyworm > 0),
  );

  // Fetch data on component mount
  useEffect(() => {
    fetchBarangays();
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            Pest Heatmap by Barangay
          </h2>
          {/* Refresh Button */}
          <button
            onClick={fetchBarangays}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            title="Refresh Data"
          >
            <Icon icon="mdi:refresh" width="20" height="20" />
          </button>
        </div>
      </div>

      {/* Search + Legend */}
      <div className="flex flex-col gap-2 border-b border-gray-100 px-6 py-3 md:flex-row md:items-center md:justify-between">
        {/* Left: Button + Search */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search barangay or pest type..."
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
              <span className="h-4 w-4 rounded border border-gray-300 bg-gray-100 text-left text-xs font-semibold tracking-wider text-[var(--color-text-primary)] uppercase"></span>
              None
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-green-300 bg-green-100 text-left text-xs font-semibold tracking-wider text-[var(--color-text-primary)] uppercase"></span>
              Low
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-yellow-300 bg-yellow-100 text-left text-xs font-semibold tracking-wider text-[var(--color-text-primary)] uppercase"></span>
              Medium
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-red-300 bg-red-100 text-left text-xs font-semibold tracking-wider text-[var(--color-text-primary)] uppercase"></span>
              High
            </div>
          </div>
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
            <p className="text-gray-500">Loading barangays...</p>
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
              onClick={fetchBarangays}
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
          <table className="w-full table-fixed">
            <thead className="sticky top-0 z-10 bg-gray-50/70">
              <tr className="text-left text-xs font-semibold tracking-wider text-[var(--color-text-primary)] uppercase">
                <th className="w-1/6 px-6 py-4">Barangay Number</th>
                <th className="w-1/6 px-6 py-4">Barangay</th>
                <th className="w-1/6 px-6 py-4">Snail</th>
                <th className="w-1/6 px-6 py-4">Fall Armyworm</th>
                <th className="w-1/6 px-6 py-4">Stemborer</th>
                <th className="w-1/6 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "No barangays found matching your search."
                      : "No barangays found."}
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => (
                  <tr
                    key={row.id || idx}
                    className="transition-colors duration-150 hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {row.number}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {row.name}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-5 whitespace-nowrap ${getHeatColor(row.snail)}`}
                    >
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {row.snail}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-5 whitespace-nowrap ${getHeatColor(row.fallarmyworm)}`}
                    >
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {row.fallarmyworm}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-5 whitespace-nowrap ${getHeatColor(row.stemborer)}`}
                    >
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {row.stemborer}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200">
                          <Icon icon="mdi:pencil" width="16" height="16" />
                        </button>
                        <button
                          onClick={() => handleDeleteBarangay(row.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-200"
                        >
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

      {/* Add Barangay Modal */}
      <AddBarangayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBarangay}
      />
    </div>
  );
};

export default ReportsHeatMap;
