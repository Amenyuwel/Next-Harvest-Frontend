import React from "react";

const EmptyState = ({ filters, onClearFilters }) => (
  <div className="py-12 text-center">
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
      <svg
        className="h-8 w-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <h3 className="mb-2 text-lg font-medium text-gray-900">
      No audit logs found
    </h3>
    <p className="mb-4 text-gray-600">
      {filters.action || filters.resourceType
        ? "Try adjusting your filters to see more results."
        : "Audit logs will appear here as system activities occur."}
    </p>
    {(filters.action || filters.resourceType) && (
      <button
        onClick={onClearFilters}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      >
        Clear Filters
      </button>
    )}
  </div>
);

export default EmptyState;
