"use client";
import React from "react";
import ReportsColumn from "@/components/dashboard/DashboardReport";
import NotificationColumn from "@/components/dashboard/DashboardNotification";
import GraphColumn from "@/components/dashboard/DashboardGraph";
import FieldsMap from "@/components/dashboard/DashboardMap";

const DashboardPage = () => {
  return (
    <div className="flex h-full w-full gap-4 p-4">
      {/* Left Column - Reports */}
      <div className="w-full max-w-sm flex-shrink-0">
        <ReportsColumn />
      </div>

      {/* Right Column - Notification + Map on top, Graph below */}
      <div className="flex w-full flex-col gap-4">
        {/* Top Row: Notification + Map side by side */}
        <div className="flex h-full w-full gap-4 overflow-auto">
          <div className="w-1/2">
            <NotificationColumn />
          </div>
          <div className="w-1/2">
            <FieldsMap />
          </div>
        </div>

        {/* Bottom Row: Full-width Graph */}
        <div className="h-full w-full">
          <GraphColumn />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
