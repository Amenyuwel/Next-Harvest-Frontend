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
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards and Filters Row */}
        <div className="mb-4 flex flex-shrink-0 items-start justify-between gap-6">
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
        <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {auditLogs.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <EmptyState filters={filters} onClearFilters={clearFilters} />
            </div>
          ) : (
            <div className="scrollbar-hide h-full divide-y divide-gray-200 overflow-y-auto">
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
