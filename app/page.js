"use client";
import React from "react";
import DashboardPage from "./pages/dashboard/page";
import Sidebar from "@/components/Sidebar";

const page = () => {
  return (
    <main>
      <Sidebar />
      <DashboardPage />
    </main>
  );
};
export default page;
