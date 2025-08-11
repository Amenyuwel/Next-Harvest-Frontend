"use client";

import { useState, useEffect } from "react";
import { authenticatedGet } from "../../utils/apiUtils.js";
import { Icon } from "@iconify/react"; // Import Iconify

const ProfileAuditLogs = () => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      setLoading(true);
      const data = await authenticatedGet(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/audit?limit=6&sortBy=timestamp&sortOrder=desc`,
      );

      if (data.success) {
        const filteredLogs = (data.data || []).filter(
          (log) =>
            log.action !== "READ" &&
            log.action &&
            log.resourceType &&
            log.timestamp,
        );
        setRecentActivity(filteredLogs);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to fetch recent activity");
      console.error("Error fetching recent activity:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return activityTime.toLocaleDateString();
  };

  const getActionIcon = (action) => {
    switch (action) {
      case "CREATE":
        return <Icon icon="mdi:plus" className="text-green-600" />;
      case "UPDATE":
        return <Icon icon="mdi:pencil" className="text-blue-600" />;
      case "DELETE":
        return <Icon icon="mdi:trash-can" className="text-red-600" />;
      default:
        return <Icon icon="mdi:file-document" className="text-gray-600" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case "CREATE":
        return "bg-green-100 text-green-700 border-green-200";
      case "UPDATE":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "DELETE":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <p className="mt-1 text-sm text-gray-600">
            Your latest system interactions
          </p>
        </div>
        <div className="flex h-40 flex-col items-center justify-center p-6">
          <Icon
            icon="mdi:loading"
            className="h-8 w-8 animate-spin text-blue-600"
          />
          <p className="mt-3 text-sm text-gray-500">Loading activity...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <p className="mt-1 text-sm text-gray-600">
            Your latest system interactions
          </p>
        </div>
        <div className="p-6 text-center">
          <Icon
            icon="mdi:alert-circle"
            className="mb-3 text-4xl text-red-500"
          />
          <p className="mb-4 text-sm text-red-600">{error}</p>
          <button
            onClick={fetchRecentActivity}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (recentActivity.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <p className="mt-1 text-sm text-gray-600">
            Your latest system interactions
          </p>
        </div>
        <div className="p-6 text-center">
          <Icon
            icon="mdi:file-document-outline"
            className="mb-4 text-4xl text-gray-400"
          />
          <p className="mb-1 text-base font-medium text-gray-500">
            No activity logs yet
          </p>
          <p className="text-sm text-gray-400">
            Your recent actions will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 p-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <p className="mt-1 text-sm text-gray-600">
            Your latest system interactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          <span className="text-xs font-medium text-green-600">Live</span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        {recentActivity.map((activity, index) => (
          <div
            key={activity._id}
            className={`relative flex items-start gap-4 rounded-xl border-2 p-4 transition-all hover:shadow-lg ${
              index === 0
                ? "border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            {index !== recentActivity.length - 1 && (
              <div className="absolute top-12 left-8 h-8 w-0.5 bg-gray-200"></div>
            )}

            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm ${
                index === 0
                  ? "border-blue-300 bg-blue-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              {getActionIcon(activity.action)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${getActionColor(activity.action)}`}
                >
                  {activity.action}
                </span>
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {activity.resourceType.replace("_", " ")}
                </span>
                {activity.resourceId && (
                  <span className="rounded-md bg-gray-200 px-2 py-1 font-mono text-xs text-gray-600">
                    #{activity.resourceId.slice(-6)}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  by{" "}
                  <span className="font-medium">
                    {activity.userEmail || "System"}
                  </span>
                </div>
                <div className="text-xs font-medium text-gray-500">
                  {formatTimestamp(activity.timestamp)}
                </div>
              </div>

              {activity.changes?.length > 0 && (
                <div className="mt-3 flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-2 text-xs text-gray-600">
                  <Icon icon="mdi:chart-line" className="text-gray-500" />
                  <span className="font-medium">
                    {activity.changes.length} field
                    {activity.changes.length > 1 ? "s" : ""} modified
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <div className="mb-3 text-xs text-gray-500">
            Showing {recentActivity.length} recent activities
          </div>
          <a
            href="/pages/audit"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            View all logs
            <Icon icon="mdi:arrow-right" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileAuditLogs;
