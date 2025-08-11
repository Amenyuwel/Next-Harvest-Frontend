"use client";
import AuditLogs from "@/components/audit/AuditLogs";

export default function AuditLogsPage() {
  return (
    <div className="scrollbar-hide h-full w-full overflow-auto bg-gray-50/30 p-4">
      <div className="h-full w-full">
        <AuditLogs />
      </div>
    </div>
  );
}