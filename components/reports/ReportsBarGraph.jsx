"use client";
import React, { useState } from "react";
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

const data = [
  {
    pest: "SNAIL",
    count: 15,
    fullName: "Golden Apple Snail",
    severity: "Medium",
    color: "var(--color-snail)",
  },
  {
    pest: "STEM_BORER",
    count: 30,
    fullName: "Rice Stem Borer",
    severity: "High",
    color: "var(--color-stem)",
  },
  {
    pest: "FALLARMYWORM",
    count: 20,
    fullName: "Fall Armyworm",
    severity: "Medium",
    color: "var(--color-worm)",
  },
];

// Calculate statistics
const totalCount = data.reduce((sum, item) => sum + item.count, 0);
const averageCount = Math.round(totalCount / data.length);
const maxCount = Math.max(...data.map((item) => item.count));
const highestPest = data.find((item) => item.count === maxCount);

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
            {Math.round((data.count / totalCount) * 100)}%
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const ReportsBarGraph = () => {
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            Report Count by Pest Type
          </h2>
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

      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            onMouseMove={(state) => {
              if (state && state.activeTooltipIndex !== undefined) {
                setHoveredBar(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <defs>
              {data.map((entry, index) => (
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
              stroke="var(--color-chart-gray)"
              strokeDasharray="5 5"
            />

            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
              stroke="#ffffff"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
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
    </div>
  );
};

export default ReportsBarGraph;
