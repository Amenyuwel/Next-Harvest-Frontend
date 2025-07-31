"use client";
import React from "react";
import ReportsLineGraph from "@/components/reports/ReportsLineGraph";
import ReportsBarGraph from "@/components/reports/ReportsBarGraph";
import ReportsHeatMap from "@/components/reports/ReportsHeatMap";

const ReportsPage = () => {
  return (
    <div className="flex h-full w-full gap-4 p-4 overflow-hidden">
      {/* Left: Two stacked charts */}
      <div className="flex w-1/2 flex-col gap-6">
        <div className="flex-1 min-h-0">
          <ReportsLineGraph />
        </div>
        <div className="flex-1 min-h-0">
          <ReportsBarGraph />
        </div>
      </div>

      {/* Right: Heatmap */}
      <div className="w-1/2 flex-1">
        <div className="h-full w-full">
          <ReportsHeatMap />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
