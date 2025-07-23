"use client";
import React from "react";
import Reports from "@/components/train/TrainingReports";
import UploadImages from "@/components/train/UploadImages";

function TrainPage() {
  return (
    <main className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {/* Training Reports - Left Side */}
      <aside
        className="h-full"
        aria-label="Training reports and analytics"
      >
        <Reports />
      </aside>

      {/* Model Training Interface - Right Side */}
      <section className="h-full" aria-label="Model training and image upload">
        <UploadImages />
      </section>
    </main>
  );
}

export default TrainPage;
