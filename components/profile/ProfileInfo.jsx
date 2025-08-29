"use client";
import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useProfile } from "../../hooks/useProfile";
import EditProfile from "./EditProfile";

const ProfileInfo = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // Use both loading states from the hook
  const {
    profile,
    loading,
    error,
    updateProfile,
    updateLoading,
    refreshProfile,
  } = useProfile();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file.");
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateSuccess = async (result) => {
    // Immediately refresh the profile data to ensure UI is in sync
    await refreshProfile();
    alert("Profile updated successfully!");
  };

  const handleUpdateError = (errorMessage) => {
    alert(`Failed to update profile: ${errorMessage}`);
  };

  // Get display name for the profile
  const getDisplayName = () => {
    if (!profile) return "User";

    const firstName = profile.firstName || profile.first_name || "";
    const middleName = profile.middleName || profile.middle_name || "";
    const lastName = profile.lastName || profile.last_name || "";

    const nameParts = [firstName, middleName, lastName].filter(
      (part) =>
        part &&
        part.toString().trim() !== "" &&
        part !== null &&
        part !== undefined,
    );

    return nameParts.join(" ") || "User";
  };

  const getFirstName = () => {
    if (!profile) return "User";
    return (
      profile.firstName ||
      profile.first_name ||
      getDisplayName().split(" ")[0] ||
      "User"
    );
  };

  if (loading) {
    return (
      <div className="via-backgroundOffWhite/50 to-backgroundLightGray/30 border-backgroundLightGray flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br from-white shadow-lg backdrop-blur-sm">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <Icon
              icon="mdi:loading"
              className="text-primary mx-auto mb-2 h-8 w-8 animate-spin"
            />
            <p className="text-textDescription">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="via-backgroundOffWhite/50 to-backgroundLightGray/30 border-backgroundLightGray flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br from-white shadow-lg backdrop-blur-sm">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <Icon
              icon="mdi:alert-circle"
              className="mx-auto mb-2 h-8 w-8 text-red-500"
            />
            <p className="text-red-500">Error: {error}</p>
            <button
              onClick={refreshProfile}
              className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="via-backgroundOffWhite/50 to-backgroundLightGray/30 border-backgroundLightGray flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br from-white shadow-lg backdrop-blur-sm">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="from-primary/10 to-iconsAccent/10 absolute -top-4 -right-4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br"></div>
        <div
          className="from-iconsAccent/8 to-primary/8 absolute -bottom-6 -left-6 h-32 w-32 animate-bounce rounded-full bg-gradient-to-br"
          style={{ animationDuration: "3s" }}
        ></div>
        <div className="bg-primary/30 absolute top-1/3 right-8 h-2 w-2 animate-ping rounded-full"></div>
        <div className="bg-iconsAccent/40 absolute bottom-1/4 left-12 h-1 w-1 animate-pulse rounded-full"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Header with Animation */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-textPrimary mb-1 text-2xl font-bold">
                Hi {getFirstName()}!
              </h1>
              <p className="text-textDescription text-sm">
                Manage your profile settings
              </p>
            </div>
            <div className="relative">
              <div
                className="from-primary to-iconsAccent absolute inset-0 animate-spin rounded-full bg-gradient-to-r"
                style={{ animationDuration: "3s" }}
              ></div>
              <div className="relative rounded-full bg-white p-2">
                <Icon
                  icon="mdi:account-settings"
                  className="text-primary h-6 w-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Profile Avatar */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative">
            {/* Rotating border animation */}
            <div
              className="from-primary via-iconsAccent to-primary absolute inset-0 animate-spin rounded-full bg-gradient-to-r p-1"
              style={{ animationDuration: "3s" }}
            >
              <div className="h-full w-full rounded-full bg-white"></div>
            </div>

            <div
              className="group relative h-24 w-24 transform cursor-pointer overflow-hidden rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
              onClick={triggerFileInput}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="from-primary to-iconsAccent flex h-full w-full items-center justify-center bg-gradient-to-br text-2xl font-bold text-white">
                  {getDisplayName().charAt(0).toUpperCase()}
                </div>
              )}

              {/* Enhanced upload overlay */}
              <div className="to-primary/30 absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/70 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                <div className="text-center">
                  <Icon
                    icon="mdi:camera-plus"
                    className="mb-1 animate-bounce text-2xl text-white"
                  />
                  <p className="text-xs font-medium text-white">Upload</p>
                </div>
              </div>

              {/* Status indicator */}
              <div className="bg-iconsAccent absolute -right-1 -bottom-1 flex h-6 w-6 animate-pulse items-center justify-center rounded-full border-3 border-white">
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <h2 className="text-textPrimary mt-4 mb-2 text-lg font-bold">
            {getDisplayName()}
          </h2>
          <div className="text-primary flex items-center gap-2 text-sm font-medium">
            <Icon icon="mdi:shield-check" className="h-4 w-4" />
            <span>Verified User</span>
          </div>
        </div>

        {/* Reusable EditProfile Component */}
        <div className="flex-1 overflow-y-auto">
          <EditProfile
            profile={profile}
            updateProfile={updateProfile}
            updateLoading={updateLoading}
            onUpdateSuccess={handleUpdateSuccess}
            onUpdateError={handleUpdateError}
            fields={["fullName", "username", "email", "role"]}
            readOnlyFields={["role"]}
            showRole={true}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
