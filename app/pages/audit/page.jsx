"use client";

import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // Use the exported useAuth hook
import { useRouter } from "next/navigation";
import AuditLogs from "../../../components/audit/AuditLogs";

export default function AuditPage() {
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
    <div className="h-full">
      <AuditLogs />
    </div>
  );
}