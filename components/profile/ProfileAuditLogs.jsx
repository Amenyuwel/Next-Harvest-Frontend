"use client";

import { useAuditLogs } from "../../hooks";
import {
  formatTimestamp,
  getActionIcon,
  getActionColor,
  getMeaningfulChangesCount,
} from "../../utils/auditUtils.js";

const ProfileAuditLogs = () => {
  // Use the existing useAuditLogs hook instead of custom state management
  const {
    auditLogs: recentActivity,
    loading,
    error,
    refreshAuditLogs: fetchRecentActivity,
  } = useAuditLogs({
    limit: 6,
    sortBy: "timestamp",
    sortOrder: "desc",
    excludeRead: true,
  });

  if (loading) {
    return (
      <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex-shrink-0 border-b border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex-shrink-0 border-b border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="text-center">
            <div className="mb-2 text-2xl text-red-500">⚠️</div>
            <p className="mb-3 text-sm text-red-600">{error}</p>
            <button
              onClick={fetchRecentActivity}
              className="text-xs font-medium text-blue-600 hover:text-blue-800"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (recentActivity.length === 0) {
    return (
      <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex-shrink-0 border-b border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="text-center">
            <div className="mb-3 text-3xl text-gray-400">📝</div>
            <p className="text-sm text-gray-500">No recent activity</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-xs font-medium text-green-600">Live</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={activity._id}
              className="relative flex items-start gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:bg-gray-100 hover:shadow-md"
            >
              <div className="flex-shrink-0 pt-1">
                {getActionIcon(activity.action)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`rounded-md border px-2 py-1 text-xs font-medium ${getActionColor(activity.action)}`}
                  >
                    {activity.action}
                  </span>
                  <span className="text-sm text-gray-600 capitalize">
                    {activity.resourceType.replace("_", " ")}
                  </span>
                  {activity.resourceId && (
                    <span className="rounded bg-gray-200 px-2 py-1 font-mono text-xs text-gray-600">
                      #{activity.resourceId.slice(-6)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="truncate">
                    by {activity.userEmail || "System"}
                  </span>
                  <span className="ml-2 flex-shrink-0">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
                {activity.changes && activity.changes.length > 0 && (
                  <div className="mt-2 rounded border bg-white px-2 py-1 text-xs text-gray-600">
                    📊{" "}
                    {getMeaningfulChangesCount(activity.changes)}{" "}
                    meaningful field
                    {getMeaningfulChangesCount(activity.changes) !== 1 ? "s" : ""} modified
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <a
          href="/pages/audit"
          className="flex items-center justify-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View all activity
          <span>→</span>
        </a>
      </div>
    </div>
  );
};

export default ProfileAuditLogs;
