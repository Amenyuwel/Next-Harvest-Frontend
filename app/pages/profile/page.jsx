"use client";
import React from "react";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileAuditLogs from "@/components/profile/ProfileAuditLogs";

function ProfilePage() {
  return (
    <div className="min-h-screen w-full p-6">
      <div className="grid grid-cols-12 gap-4">
        {/* Left column: Profile */}
        <div className="col-span-3">
          <ProfileInfo />
        </div>

        {/* Right column: Audit Logs */}
        <div className="col-span-9">
          <ProfileAuditLogs />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
