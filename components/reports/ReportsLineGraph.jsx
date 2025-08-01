"use client";
import React, { useState } from "react";
// Custom icon components
const ChartLineIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 12l3-3 3 3 4-4"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 21l4-4 4-4 4-4"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2} />
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2} />
    <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2} />
  </svg>
);
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  Area,
  ComposedChart,
} from "recharts";

// Sample data formatted for Recharts
const chartData = [
  {
    month: "Jan",
    fullMonth: "January",
    "Rice Stem Borer": 15,
    "Golden Apple Snail": 18,
    "Fall Armyworm": 20,
  },
  {
    month: "Feb",
    fullMonth: "February",
    "Rice Stem Borer": 12,
    "Golden Apple Snail": 25,
    "Fall Armyworm": 22,
  },
  {
    month: "Mar",
    fullMonth: "March",
    "Rice Stem Borer": 28,
    "Golden Apple Snail": 23,
    "Fall Armyworm": 24,
  },
  {
    month: "Apr",
    fullMonth: "April",
    "Rice Stem Borer": 8,
    "Golden Apple Snail": 30,
    "Fall Armyworm": 28,
  },
  {
    month: "May",
    fullMonth: "May",
    "Rice Stem Borer": 22,
    "Golden Apple Snail": 32,
    "Fall Armyworm": 35,
  },
];

const pestConfig = [
  {
    name: "Rice Stem Borer",
    shortName: "Stem Borer",
    mobileLabel: "RSB",
    color: "var(--color-stem)",
    gradient: "from-orange-400 to-orange-600",
    trend: "volatile",
    strokeWidth: 3,
  },
  {
    name: "Golden Apple Snail",
    shortName: "Apple Snail",
    mobileLabel: "GAS",
    color: "var(--color-snail)",
    gradient: "from-slate-400 to-slate-600",
    trend: "increasing",
    strokeWidth: 3,
  },
  {
    name: "Fall Armyworm",
    shortName: "Armyworm",
    mobileLabel: "FAW",
    color: "var(--color-worm)",
    gradient: "from-red-400 to-red-600",
    trend: "increasing",
    strokeWidth: 3,
  },
];

// Calculate statistics
const allValues = chartData.flatMap((item) =>
  pestConfig.map((pest) => item[pest.name]),
);
const totalReports = allValues.reduce((sum, val) => sum + val, 0);
const averageReports = Math.round(totalReports / allValues.length);
const maxValue = Math.max(...allValues);
const minValue = Math.min(...allValues);

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <CalendarIcon />
          <h4 className="font-semibold text-gray-800">{data.fullMonth} 2024</h4>
        </div>
        <div className="space-y-2">
          {payload.map((entry, index) => {
            const pestInfo = pestConfig.find(
              (pest) => pest.name === entry.dataKey,
            );
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-700">
                    {pestInfo?.shortName || entry.dataKey}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">
                    {entry.value}
                  </span>
                  <span className="text-xs text-gray-500">reports</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 border-t border-gray-200 pt-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Total:</span>
            <span className="font-medium">
              {payload.reduce((sum, entry) => sum + entry.value, 0)} reports
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Custom dot component for enhanced data points
const CustomDot = ({ cx, cy, payload, dataKey }) => {
  const pestInfo = pestConfig.find((pest) => pest.name === dataKey);
  return (
    <circle
      cx={cx}
      cy={cy}
      r="5"
      fill={pestInfo?.color || "#8884d8"}
      stroke="white"
      strokeWidth="2"
      className="hover:r-6 cursor-pointer drop-shadow-sm transition-all duration-200"
      style={{
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
      }}
    />
  );
};

const ReportsLineGraph = () => {
  const [hoveredLine, setHoveredLine] = useState(null);

  return (
    <div className="mx-auto h-full w-full rounded-xl bg-white p-6 shadow">
      {/* Chart Header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            Report Frequency Over Time
          </h2>
        </div>
        <div className="text-sm text-gray-600">
          Period:{" "}
          <time
            className="font-semibold text-indigo-600"
            dateTime="2024-01/2024-05"
          >
            Jan - May 2024
          </time>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            onMouseMove={(state) => {
              if (state && state.activeLabel) {
                // You can add hover state logic here if needed
              }
            }}
          >
            <defs>
              {pestConfig.map((pest, index) => (
                <linearGradient
                  key={index}
                  id={`gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={pest.color} stopOpacity={0.8} />
                  <stop
                    offset="100%"
                    stopColor={pest.color}
                    stopOpacity={0.1}
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
              dataKey="month"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={{ stroke: "#9ca3af" }}
              axisLine={{ stroke: "#d1d5db" }}
              label={{
                position: "insideBottom",
                offset: -10,
                style: {
                  textAnchor: "middle",
                  fill: "#6b7280",
                  fontSize: "12px",
                },
              }}
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

            {/* Average reference line */}
            <ReferenceLine
              y={averageReports}
              stroke="var(--color-chart-gray)"
              strokeDasharray="5 5"
              label={{
                value: `Average: ${averageReports}`,
                position: "topRight",
                fill: "var(--color-chart-gray)",
                fontSize: 12,
                fontWeight: 600,
              }}
            />

            {/* Lines for each pest */}
            {pestConfig.map((pest, index) => (
              <Line
                key={pest.name}
                type="monotone"
                dataKey={pest.name}
                stroke={pest.color}
                strokeWidth={pest.strokeWidth}
                dot={<CustomDot />}
                activeDot={{
                  r: 7,
                  stroke: pest.color,
                  strokeWidth: 3,
                  fill: "white",
                  style: { filter: "drop-shadow(0 0 6px rgba(0,0,0,0.3))" },
                }}
                connectNulls={false}
                style={{
                  filter:
                    hoveredLine && hoveredLine !== pest.name
                      ? "opacity(0.3)"
                      : "none",
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportsLineGraph;
