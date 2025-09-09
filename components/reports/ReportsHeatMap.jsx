"use client";
import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import AddBarangayModal from "./AddBarangayModal";
import { useBarangays } from "../../hooks/useBarangays";
import { useReports } from "../../hooks/useReports";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const getHeatColor = (value) => {
  if (value === 0) return "bg-gray-100";
  if (value < 5) return "bg-green-100";
  if (value < 10) return "bg-yellow-100";
  return "bg-red-100";
};

const ReportsHeatMap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBarangay, setEditingBarangay] = useState(null);

  // Use the hooks
  const {
    barangays,
    loading: barangaysLoading,
    error: barangaysError,
    refreshBarangays,
    addBarangay,
    updateBarangay,
    deleteBarangay,
  } = useBarangays();

  const {
    reports,
    loading: reportsLoading,
    error: reportsError,
    refreshReports,
  } = useReports();

  // Process reports to get pest counts by barangay
  const pestDataByBarangay = useMemo(() => {
    if (!reports || reports.length === 0) return {};

    const pestCounts = {};

    reports.forEach((report) => {
      const barangay = report.barangay;
      const prediction = report.prediction?.toLowerCase();

      if (!pestCounts[barangay]) {
        pestCounts[barangay] = {
          snail: 0,
          fallarmyworm: 0,
          stemborer: 0,
        };
      }

      if (prediction === "snail") {
        pestCounts[barangay].snail++;
      } else if (prediction === "fallarmyworm") {
        pestCounts[barangay].fallarmyworm++;
      } else if (prediction === "stemborer") {
        pestCounts[barangay].stemborer++;
      }
    });

    return pestCounts;
  }, [reports]);

  // Transform barangay data to include pest counts
  const barangayData = useMemo(() => {
    return barangays.map((barangay) => {
      const pestData = pestDataByBarangay[barangay.barangayName] || {
        snail: 0,
        fallarmyworm: 0,
        stemborer: 0,
      };

      return {
        id: barangay._id,
        number: barangay.barangayId,
        name: barangay.barangayName,
        ...pestData,
      };
    });
  }, [barangays, pestDataByBarangay]);

  // Edit barangay
  const handleEditBarangay = (barangay) => {
    setEditingBarangay({
      id: barangay.id,
      barangayId: barangay.number,
      barangayName: barangay.name,
    });
    setIsModalOpen(true);
  };

  // Handle modal submission (add or edit)
  const handleModalSubmit = async (formData) => {
    let success;
    if (editingBarangay) {
      success = await updateBarangay(editingBarangay.id, formData);
    } else {
      success = await addBarangay(formData);
    }
    if (success) {
      setIsModalOpen(false);
      setEditingBarangay(null);
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingBarangay(null);
  };

  // Handle delete barangay confirmation
  const handleDeleteBarangay = async (barangay) => {
    await deleteBarangay(barangay.id);
  };

  // Refresh all data
  const refreshAllData = () => {
    refreshBarangays();
    refreshReports();
  };

  // Filter data based on search term
  const filteredData = barangayData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.number.includes(searchTerm) ||
      (searchTerm.toLowerCase() === "snail" && row.snail > 0) ||
      (searchTerm.toLowerCase() === "fall armyworm" && row.fallarmyworm > 0) ||
      (searchTerm.toLowerCase() === "stemborer" && row.stemborer > 0) ||
      (searchTerm.toLowerCase() === "armyworm" && row.fallarmyworm > 0)
  );

  const loading = barangaysLoading || reportsLoading;
  const error = barangaysError || reportsError;

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
            onClick={refreshAllData}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            title="Refresh Data"
          >
            <Icon icon="mdi:refresh" width="20" height="20" />
          </button>
        </div>
      </div>

      {/* Search + Legend */}
      <div className="flex flex-col gap-2 border-b border-gray-100 px-6 py-3 md:flex-row md:items-center md:justify-between">
        {/* Left: Search */}
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

        {/* Right: Legend */}
        <div className="flex flex-wrap items-center justify-end gap-4 md:mt-0">
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-gray-300 bg-gray-100"></span>
              None (0)
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-green-300 bg-green-100"></span>
              Low (1-4)
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-yellow-300 bg-yellow-100"></span>
              Medium (5-9)
            </div>
            <div className="flex items-center gap-1">
              <span className="h-4 w-4 rounded border border-red-300 bg-red-100"></span>
              High (10+)
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
            <p className="text-gray-500">Loading data...</p>
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
              onClick={refreshAllData}
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
                      className={`px-6 py-5 whitespace-nowrap ${getHeatColor(
                        row.snail
                      )}`}
                    >
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {row.snail}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-5 whitespace-nowrap ${getHeatColor(
                        row.fallarmyworm
                      )}`}
                    >
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {row.fallarmyworm}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-5 whitespace-nowrap ${getHeatColor(
                        row.stemborer
                      )}`}
                    >
                      <span className="text-sm font-medium text-[var(--color-text-description)]">
                        {row.stemborer}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditBarangay(row)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                          title="Edit Barangay"
                        >
                          <Icon icon="mdi:pencil" width="16" height="16" />
                        </button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-200"
                              title="Delete Barangay"
                            >
                              <Icon
                                icon="mdi:delete-outline"
                                width="16"
                                height="16"
                              />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Barangay
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete barangay{" "}
                                <strong>{row.name}</strong> (ID: {row.number})?
                                This action cannot be undone and will
                                permanently remove all barangay data and related
                                pest information.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteBarangay(row)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Barangay
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        editingData={editingBarangay}
        isEditing={!!editingBarangay}
      />
    </div>
  );
};

export default ReportsHeatMap;
