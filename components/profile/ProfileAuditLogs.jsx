"use client";

import { useAuth } from "../../app/context/AuthContext";
import { useAuditLogs } from "../../hooks";
import {
  formatTimestamp,
  getActionIcon,
  getActionColor,
  getMeaningfulChangesCount,
} from "../../utils/auditUtils.js";

const ProfileAuditLogs = () => {
  const { user } = useAuth();

  // Only show to superAdmins
  if (!user || user.role !== "superAdmin") {
    return null;
  }

  const {
    auditLogs: recentActivity,
    loading,
    error,
    refreshAuditLogs: fetchRecentActivity,
  } = useAuditLogs({
    limit: 7,
    sortBy: "timestamp",
    sortOrder: "desc",
    excludeRead: true,
  });

  if (loading) {
    return (
      <div className="relative h-[666px] max-h-[90vh] min-h-[400px] rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/50">
        <div className="border-b border-slate-100 px-6 py-4"></div>
        <div className="flex h-[calc(100%-4rem)] items-center justify-center">
          <div className="flex items-center gap-3 text-slate-600">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500"></div>
            <span className="text-sm font-medium">Loading logs...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-[666px] max-h-[90vh] min-h-[400px] rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/50">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-800">Logs</h3>
          </div>
        </div>
        <div className="flex h-[calc(100%-4rem)] items-center justify-center p-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <svg
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p className="mb-4 text-sm text-slate-600">{error}</p>
            <button
              onClick={fetchRecentActivity}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (recentActivity.length === 0) {
    return (
      <div className="relative h-[666px] max-h-[90vh] min-h-[400px] rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/50">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Logs</h3>
          </div>
        </div>
        <div className="flex h-[calc(100%-4rem)] items-center justify-center p-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
              <svg
                className="h-6 w-6 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-500">No logs</p>
            <p className="mt-1 text-xs text-slate-400">
              Activity will appear here when it occurs
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-h-[90vh] min-h-[797px] flex-col rounded-2xl bg-white shadow-lg ring-1 ring-slate-200/50">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-800">Logs</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 ring-1 ring-green-200/50">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-xs font-medium text-green-700">Live</span>
          </div>
        </div>
      </div>

      {/* Content - Flexible height */}
      <div className="scrollbar-hide flex-1 overflow-auto px-6 py-4">
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={activity._id}
              className="group relative rounded-xl bg-slate-50/50 p-4 ring-1 ring-slate-200/50 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200/50">
                    {getActionIcon(activity.action)}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getActionColor(
                        activity.action,
                      )}`}
                    >
                      {activity.action}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 capitalize">
                      {activity.resourceType.replace("_", " ")}
                    </span>
                    {activity.resourceId && (
                      <span className="inline-flex items-center rounded-md bg-slate-200 px-2 py-1 font-mono text-xs font-medium text-slate-600">
                        #{activity.resourceId.slice(-6)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-600">
                      <svg
                        className="h-3 w-3 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="truncate font-medium">
                        {activity.userEmail || "System"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                  </div>

                  {activity.changes && activity.changes.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 rounded-lg bg-blue-50 px-2 py-1 ring-1 ring-blue-200/30">
                      <svg
                        className="h-3 w-3 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <span className="text-xs font-medium text-blue-700">
                        {getMeaningfulChangesCount(activity.changes)} field
                        {getMeaningfulChangesCount(activity.changes) !== 1
                          ? "s"
                          : ""}{" "}
                        modified
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-slate-100 px-6 py-4">
        <a
          href="/pages/audit"
          className="group flex items-center justify-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          View all logs
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProfileAuditLogs;
