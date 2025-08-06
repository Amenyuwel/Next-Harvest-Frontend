"use client";
import React from "react";
import Reports from "@/components/train/TrainingReports";
import UploadImages from "@/components/train/UploadImages";
import PestClassesTable from "@/components/train/PestClassesTable";

function TrainPage() {
  return (
    <main className="h-full w-full overflow-hidden p-4">
      <div className="grid h-full w-full grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Training Reports - Left Side */}
        <aside
          className="grid min-h-0 grid-cols-1 gap-4"
          aria-label="Training reports and analytics"
        >
          <div className="min-h-0 ">
            <Reports />
          </div>
          <div className="min-h-0">
            <PestClassesTable />
          </div>
        </aside>

        {/* Model Training Interface - Right Side */}
        <section
          className="min-h-0"
          aria-label="Model training and image upload"
        >
          <UploadImages />
        </section>
      </div>
    </main>
  );
}

export default TrainPage;
