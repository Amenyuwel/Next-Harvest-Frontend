"use client";
import React from "react";
import DashboardPage from "./pages/dashboard/page";
import Sidebar from "@/components/Sidebar";

const page = () => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <DashboardPage />
    </main>
  );
};
export default page;
