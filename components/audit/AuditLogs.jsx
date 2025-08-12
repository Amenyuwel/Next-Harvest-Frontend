"use client";
import React, { useState } from "react";
import { useAuth } from "../../app/context/AuthContext";
import { useAuditLogs, useAuditStats, useCrops } from "../../hooks/index.js";
import AuditFilter from "./AuditFilter.jsx";
import AuditStatsCard from "./AuditStatsCard.jsx";
import AuditLogItem from "./AuditLogItem.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import EmptyState from "./EmptyState.jsx";

const AuditLogs = () => {
  const { user } = useAuth();

  // Only allow superAdmins
  if (!user || user.role !== "superAdmin") {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl bg-white shadow-lg">
        <div className="text-center">
          <div className="mb-4 text-6xl">🚫</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don't have permission to view audit logs.
          </p>
        </div>
      </div>
    );
  }

  const [filters, setFilters] = useState({
    action: "",
    resourceType: "",
  });

  const { auditLogs, loading, error, refreshAuditLogs } = useAuditLogs(filters);
  const { stats } = useAuditStats();
  const { getCropName } = useCrops();

  const actionOptions = ["CREATE", "UPDATE", "DELETE"];
  const resourceTypeOptions = [
    "farmer",
    "crop",
    "barangay",
    "pest",
    "pest_report",
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ action: "", resourceType: "" });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl bg-white shadow-lg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[var(--color-icons-accent)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center rounded-3xl bg-white shadow-lg">
        <div className="text-center">
          <div className="mb-4 text-6xl text-red-500">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Error Loading Data
          </h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <button
            onClick={refreshAuditLogs}
            className="rounded-lg bg-[var(--color-icons-accent)] px-6 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[840px] flex-col">
      <div className="flex min-h-0 flex-1 flex-col space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards and Filters Row */}
        <div className="flex flex-shrink-0 items-start justify-between gap-4">
          {/* Stats Cards Component - Left */}
          <div className="flex-1">
            <AuditStatsCard
              stats={stats}
              pagination={{ totalCount: auditLogs.length }}
            />
          </div>

          {/* Filters Component - Right */}
          <div className="flex-shrink-0">
            <AuditFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              actionOptions={actionOptions}
              resourceTypeOptions={resourceTypeOptions}
            />
          </div>
        </div>

        {/* Audit Logs List */}
        <div className="min-h-0 flex-1 overflow-hidden rounded-3xl bg-white shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Audit Logs</h2>
          </div>

          {/* Content */}
          {auditLogs.length === 0 ? (
            <div className="flex h-full items-center justify-center p-6">
              <EmptyState filters={filters} onClearFilters={clearFilters} />
            </div>
          ) : (
            <div className="scrollbar-hide h-full overflow-y-auto">
              <div className="divide-y divide-gray-100 pb-40">
                {auditLogs.map((log, index) => (
                  <div
                    key={log._id}
                    className="px-6 py-4 transition-colors hover:bg-gray-50/50"
                  >
                    <AuditLogItem
                      log={log}
                      index={index}
                      getCropName={getCropName}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
