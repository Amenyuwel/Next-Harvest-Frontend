"use client";
import React, { useState } from "react";
import { useAuditLogs, useAuditStats, useCrops } from "../../hooks/index.js";
import AuditFilter from "./AuditFilter.jsx";
import AuditStatsCard from "./AuditStatsCard.jsx";
import AuditLogItem from "./AuditLogItem.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import EmptyState from "./EmptyState.jsx";

const AuditLogs = () => {
  const [filters, setFilters] = useState({
    action: "",
    resourceType: "",
  });

  // Use custom hooks
  const { auditLogs, loading, error, refreshAuditLogs } = useAuditLogs(filters);
  const { stats } = useAuditStats();
  const { getCropName } = useCrops();

  // Available filter options
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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refreshAuditLogs} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600">
            Track all system activities and changes
          </p>
        </div>

        {/* Stats Cards Component */}
        <AuditStatsCard
          stats={stats}
          pagination={{ totalCount: auditLogs.length }}
        />

        {/* Filters Component */}
        <AuditFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          actionOptions={actionOptions}
          resourceTypeOptions={resourceTypeOptions}
        />

        {/* Audit Logs List */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {auditLogs.length === 0 ? (
            <EmptyState filters={filters} onClearFilters={clearFilters} />
          ) : (
            <div className="divide-y divide-gray-200">
              {auditLogs.map((log, index) => (
                <AuditLogItem
                  key={log._id}
                  log={log}
                  index={index}
                  getCropName={getCropName}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
