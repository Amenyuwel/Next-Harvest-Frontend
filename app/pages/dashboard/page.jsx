"use client";
import React from "react";
import ReportsColumn from "@/components/dashboard/report";
import NotificationColumn from "@/components/dashboard/Notification";
import GraphColumn from "@/components/dashboard/GraphColumn";
import CalendarColumn from "@/components/dashboard/Calendar";
import FieldsMap from "@/components/dashboard/Map";

const DashboardPage = () => {
  return (
    <div className="w-full h-full overflow-hidden  grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 scrollbar-hide">
      {/* Left Column - Reports */}
      <div className="lg:col-span-1 h-full min-h-0">
        <ReportsColumn />
      </div>

      {/* Middle Column - Notifications and Graph */}
      <div className="lg:col-span-1 flex flex-col gap-4 h-full min-h-0">
        <div className="flex-1 min-h-0">
          <NotificationColumn />
        </div>
        <div className="flex-1 min-h-0">
          <GraphColumn />
        </div>
      </div>

      {/* Right Column - Calendar and Map */}
      <div className="lg:col-span-1 flex flex-col gap-4 h-full min-h-0">
        <div className="flex-1 min-h-0">
          <CalendarColumn />
        </div>
        <div className="flex-1 min-h-0">
          <FieldsMap />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
