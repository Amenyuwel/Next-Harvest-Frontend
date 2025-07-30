"use client";
import React from "react";
import ReportsLineGraph from "@/components/reports/ReportsLineGraph";
import ReportsBarGraph from "@/components/reports/ReportsBarGraph";
import ReportsHeatMap from "@/components/reports/ReportsHeatMap";

const ReportsPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden p-4">
      <section className="grid grid-cols-2 gap-4">
        {/* Left: Charts stacked vertically */}
        <ReportsLineGraph />
        <ReportsBarGraph />
      </section>
      {/* Right: Table */}
      <ReportsHeatMap />
    </div>
  );
};

export default ReportsPage;
