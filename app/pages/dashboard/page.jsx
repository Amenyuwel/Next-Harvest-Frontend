"use client";
import React from "react";
import DashboardGraph from "@/components/dashboard/DashboardGraph";
import DashboardMap from "@/components/dashboard/DashboardMap";
import DashboardReport from "@/components/dashboard/DashboardReport";
import DashboardNotification from "@/components/dashboard/DashboardNotification";

const DashboardPage = () => {
  return (
    <div className="flex h-full w-full gap-4 p-4">
      {/* Left Column - Reports */}
      <div className="w-full max-w-sm flex-shrink-0">
        <DashboardReport />
      </div>

      {/* Right Column - Notification + Map on top, Graph below */}
      <div className="flex w-full flex-col gap-4">
        {/* Top Row: Notification + Map side by side */}
        <div className="flex h-full w-full gap-4 overflow-auto">
          <div className="w-1/2">
            <DashboardNotification />
          </div>
          <div className="w-1/2">
            <DashboardMap />
          </div>
        </div>

        {/* Bottom Row: Full-width Graph */}
        <div className="h-full w-full">
          <DashboardGraph />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
