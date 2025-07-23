"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Sidebar from "@/components/Sidebar";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Memoize dashboard page check to avoid recalculation
  const isDashboardPage = useMemo(() => {
    return pathname?.startsWith("/pages/dashboard") ||
           pathname?.startsWith("/pages/records") ||
           pathname?.startsWith("/pages/train") ||
           pathname?.startsWith("/pages/reports") ||
           pathname?.startsWith("/pages/profile") ||
           pathname?.startsWith("/pages/settings");
  }, [pathname]);

  if (isDashboardPage) {
    return (
      <main className="bg-white w-full h-screen p-6">
        <div className="bg-[var(--color-background-gray)] rounded-3xl shadow-2xl overflow-hidden w-full h-full flex p-6 gap-6">
          {/* Sidebar for dashboard pages */}
          <Sidebar />

          {/* Page Content */}
          <div className="flex-1 bg-white rounded-3xl p-8 overflow-auto">
            {children}
          </div>
        </div>
      </main>
    );
  }

  // For non-dashboard pages (like login), render children directly
  return <>{children}</>;
}
