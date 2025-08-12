import React from "react";

const AuditFilter = ({
  filters,
  onFilterChange,
  onClearFilters,
  actionOptions,
  resourceTypeOptions,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-0 flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Action
          </label>
          <select
            value={filters.action}
            onChange={(e) => onFilterChange("action", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Actions</option>
            {actionOptions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0 flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Resource Type
          </label>
          <select
            value={filters.resourceType}
            onChange={(e) => onFilterChange("resourceType", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Resources</option>
            {resourceTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={onClearFilters}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditFilter;
