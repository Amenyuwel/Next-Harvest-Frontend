"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Use the exported useAuth hook
import { useRouter } from "next/navigation";
import Reports from "@/components/train/TrainingReports";
import UploadImages from "@/components/train/UploadImages";
import PestClassesTable from "@/components/train/PestClassesTable";

function TrainPage() {
  const { user, loading } = useAuth(); // Use useAuth hook instead of useContext
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "superAdmin")) {
      router.push("/dashboard"); // Redirect non-superAdmins
    }
  }, [user, loading, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  // Don't render if not superAdmin
  if (!user || user.role !== "superAdmin") {
    return null;
  }

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
