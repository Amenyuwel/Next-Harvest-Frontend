"use client";

import { useState, useEffect } from "react";
import { authenticatedGet } from "../../utils/apiUtils.js";

const RecentActivityWidget = () => {
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
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/audit?limit=10&sortBy=timestamp&sortOrder=desc`,
      );

      if (data.success) {
        const filteredLogs = (data.data || []).filter((log) => {
          if (log.action === "READ" || log.action === "READ".toUpperCase()) {
            return false;
          }
          if (!log.action || !log.resourceType || !log.timestamp) {
            return false;
          }
          return true;
        });
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
        return "➕";
      case "UPDATE":
        return "✏️";
      case "DELETE":
        return "🗑️";
      default:
        return "📝";
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
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="p-6">
          <div className="flex h-32 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="p-6">
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

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
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
      <div className="p-6">
        <div className="space-y-3">
          {recentActivity.length === 0 ? (
            <div className="py-8 text-center">
              <div className="mb-3 text-3xl text-gray-400">📝</div>
              <p className="text-sm text-gray-500">No recent activity</p>
            </div>
          ) : (
            recentActivity.map((activity, index) => (
              <div
                key={activity._id}
                className={`relative flex items-start gap-4 rounded-lg border p-4 transition-all hover:shadow-md ${
                  index === 0
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex-shrink-0 pt-1">
                  <span className="text-lg">
                    {getActionIcon(activity.action)}
                  </span>
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
                      📊 {activity.changes.length} field
                      {activity.changes.length > 1 ? "s" : ""} modified
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        {recentActivity.length > 0 && (
          <div className="mt-6 border-t border-gray-200 pt-4 text-center">
            <a
              href="/pages/audit"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View all activity
              <span>→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityWidget;
