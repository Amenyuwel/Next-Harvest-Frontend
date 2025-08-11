"use client";
import React from "react";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileAuditLogs from "@/components/profile/ProfileAuditLogs";

function ProfilePage() {
  return (
    <div className="scrollbar-hide h-full w-full overflow-auto bg-gray-50/30 p-4">
      <div className="grid h-full w-full grid-cols-[320px_1fr] gap-4">
        {/* Left column: Profile Info */}
        <div className="h-full">
          <ProfileInfo />
        </div>

        {/* Right column: Audit Logs */}
        <div className="h-full">
          <ProfileAuditLogs />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
