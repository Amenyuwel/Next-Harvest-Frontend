"use client";
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { useReports } from "../../hooks/useReports";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <div className="mb-2 flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: data.color }}
          ></div>
          <h4 className="font-semibold text-gray-800">{data.fullName}</h4>
        </div>
        <div className="space-y-1 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">Count:</span> {data.count} reports
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Severity:</span>
            <span
              className={`ml-1 rounded-full px-2 py-1 text-xs font-medium ${
                data.severity === "High"
                  ? "bg-red-100 text-red-700"
                  : data.severity === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {data.severity}
            </span>
          </p>
          <p className="text-gray-600">
            <span className="font-medium">% of Total:</span>{" "}
            {Math.round((data.count / data.totalCount) * 100)}%
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const ReportsBarGraph = () => {
  const [hoveredBar, setHoveredBar] = useState(null);
  const { reports, loading, error, refreshReports } = useReports();

  // Process the reports data for the chart
  const chartData = useMemo(() => {
    if (!reports || reports.length === 0) return [];

    // Count predictions by type
    const pestCounts = reports.reduce((acc, report) => {
      const prediction = report.prediction?.toUpperCase() || 'UNKNOWN';
      acc[prediction] = (acc[prediction] || 0) + 1;
      return acc;
    }, {});

    // Map pest types to display data
    const pestMapping = {
      'SNAIL': {
        fullName: 'Golden Apple Snail',
        severity: 'Medium',
        color: '#f59e0b' // amber
      },
      'STEMBORER': {
        fullName: 'Rice Stem Borer',
        severity: 'High',
        color: '#ef4444' // red
      },
      'FALLARMYWORM': {
        fullName: 'Fall Armyworm',
        severity: 'Medium',
        color: '#f97316' // orange
      },
      'UNKNOWN': {
        fullName: 'Unknown Pest',
        severity: 'Low',
        color: '#6b7280' // gray
      }
    };

    const data = Object.entries(pestCounts).map(([pest, count]) => ({
      pest,
      count,
      totalCount: reports.length,
      ...pestMapping[pest] || pestMapping['UNKNOWN']
    }));

    return data.sort((a, b) => b.count - a.count);
  }, [reports]);

  // Calculate statistics
  const totalCount = chartData.reduce((sum, item) => sum + item.count, 0);
  const averageCount = chartData.length > 0 ? Math.round(totalCount / chartData.length) : 0;

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-white p-6 shadow">
        <div className="text-center">
          <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="text-gray-500">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-white p-6 shadow">
        <div className="text-center">
          <p className="mb-2 text-red-500">Error: {error}</p>
          <button
            onClick={refreshReports}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            Report Count by Pest Type
          </h2>
          <button
            onClick={refreshReports}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            title="Refresh Data"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Total Reports:{" "}
          <span
            className="font-semibold text-emerald-600"
            aria-label={`${totalCount} total reports`}
          >
            {totalCount}
          </span>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">No reports data available</p>
        </div>
      ) : (
        <div className="min-h-0 w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              onMouseMove={(state) => {
                if (state && state.activeTooltipIndex !== undefined) {
                  setHoveredBar(state.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setHoveredBar(null)}
            >
              <defs>
                {chartData.map((entry, index) => (
                  <linearGradient
                    key={index}
                    id={`gradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                    <stop
                      offset="100%"
                      stopColor={entry.color}
                      stopOpacity={0.6}
                    />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                strokeOpacity={0.7}
              />

              <XAxis
                dataKey="pest"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickLine={{ stroke: "#9ca3af" }}
                axisLine={{ stroke: "#d1d5db" }}
                angle={0}
                textAnchor="middle"
                height={40}
                interval={0}
                tickFormatter={(value) => value.replace("_", " ")}
              />

              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickLine={{ stroke: "#9ca3af" }}
                axisLine={{ stroke: "#d1d5db" }}
                label={{
                  value: "Number of Reports",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    textAnchor: "middle",
                    fill: "#6b7280",
                    fontSize: "12px",
                  },
                }}
              />

              <Tooltip content={<CustomTooltip />} />

              <ReferenceLine
                y={averageCount}
                stroke="#6b7280"
                strokeDasharray="5 5"
              />

              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                stroke="#ffffff"
                strokeWidth={2}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      hoveredBar === index
                        ? entry.color
                        : `url(#gradient-${index})`
                    }
                    style={{
                      filter: hoveredBar === index ? "brightness(1.1)" : "none",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ReportsBarGraph;
