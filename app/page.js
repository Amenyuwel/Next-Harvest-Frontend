"use client";
import React from "react";
import LoginPage from "./pages/login/page";
import DashboardPage from "./pages/dashboard/page";
const page = () => {
  return (
    <main>
       <Sidebar />
      <DashboardPage />
    </main>
  );
};

export default page;
