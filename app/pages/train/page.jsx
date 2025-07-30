"use client";
import React from "react";
import Reports from "@/components/train/TrainingReports";
import UploadImages from "@/components/train/UploadImages";
import PestClassesTable from "@/components/train/PestClassesTable";

function TrainPage() {
  return (
    <main className="grid h-full w-full grid-cols-1 gap-4 p-4 lg:grid-cols-2">
      {/* Training Reports - Left Side */}
      <aside
        className="grid grid-cols-1 gap-4"
        aria-label="Training reports and analytics"
      >
        <Reports />
        <PestClassesTable />
      </aside>

      {/* Model Training Interface - Right Side */}
      <section className="h-full" aria-label="Model training and image upload">
        <UploadImages />
      </section>
    </main>
  );
}

export default TrainPage;
