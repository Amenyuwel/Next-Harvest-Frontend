"use client";
import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useProfile } from "../../hooks/useProfile";

const ProfileInfo = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "",
  });
  const fileInputRef = useRef(null);

  const { profile, loading, error, updateProfile } = useProfile();

  // Update form data when profile loads
  React.useEffect(() => {
    console.log("ProfileInfo useEffect triggered, profile:", profile);

    if (profile) {
      console.log("Profile data received:", profile);
      console.log("Profile properties:", Object.keys(profile));

      // Extract name components - handle different possible field names
      const firstName = profile.firstName || profile.first_name || "";
      const middleName = profile.middleName || profile.middle_name || "";
      const lastName = profile.lastName || profile.last_name || "";

      console.log("Name parts extracted:", { firstName, middleName, lastName });

      // Create full name by combining all non-empty name parts
      const nameParts = [firstName, middleName, lastName].filter(
        (part) =>
          part &&
          part.toString().trim() !== "" &&
          part !== null &&
          part !== undefined,
      );
      const fullName = nameParts.join(" ");

      console.log("Constructed fullName:", fullName);

      // Create the form data object
      const newFormData = {
        fullName: fullName || "User",
        username: profile.username || profile.user_name || "",
        email: profile.email || "",
        role: profile.role || "User",
      };

      console.log("Setting formData to:", newFormData);
      setFormData(newFormData);
    } else {
      console.log("Profile is null/undefined, resetting formData");
      setFormData({
        fullName: "",
        username: "",
        email: "",
        role: "",
      });
    }
  }, [profile]);

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    // Split fullName back into firstName, middleName, and lastName for API
    const nameParts = formData.fullName
      .trim()
      .split(" ")
      .filter((part) => part !== "");

    let firstName = "";
    let middleName = "";
    let lastName = "";

    if (nameParts.length === 1) {
      // Only first name
      firstName = nameParts[0];
    } else if (nameParts.length === 2) {
      // First name and last name
      firstName = nameParts[0];
      lastName = nameParts[1];
    } else if (nameParts.length >= 3) {
      // First name, middle name(s), and last name
      firstName = nameParts[0];
      lastName = nameParts[nameParts.length - 1]; // Last part is lastName
      middleName = nameParts.slice(1, -1).join(" "); // Everything between first and last
    }

    const profileDataToSend = {
      firstName: firstName,
      middleName: middleName || null,
      lastName: lastName,
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };

    console.log("Sending profile data:", profileDataToSend);

    const result = await updateProfile(profileDataToSend);
    if (result.success) {
      setIsEditing(false);
      alert("Profile updated successfully!");
    } else {
      alert(`Failed to update profile: ${result.message}`);
    }
  };

  // Debug current state
  console.log("Current formData state:", formData);
  console.log("Current profile state:", profile);
  console.log("Loading:", loading, "Error:", error);

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
                Hi{" "}
                {profile?.firstName ||
                  formData.fullName?.split(" ")[0] ||
                  "User"}
                !
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
                  {formData.fullName &&
                  formData.fullName !== "User" &&
                  formData.fullName !== ""
                    ? formData.fullName.charAt(0).toUpperCase()
                    : "U"}
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
            {formData.fullName || "User"}
          </h2>
          <div className="text-primary flex items-center gap-2 text-sm font-medium">
            <Icon icon="mdi:shield-check" className="h-4 w-4" />
            <span>Verified User</span>
          </div>
        </div>

        {/* Enhanced Form Fields */}
        <div className="flex-1 space-y-5 overflow-y-auto">
          {/* Full Name Field */}
          <div className="group">
            <label className="text-textPrimary mb-2 flex items-center gap-2 text-sm font-semibold">
              <Icon icon="mdi:account" className="text-primary h-4 w-4" />
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                readOnly={!isEditing}
                placeholder="Enter your full name"
                className={`border-backgroundLightGray group-hover:border-primary/60 w-full rounded-xl border-2 bg-white/70 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-300 ${
                  isEditing ? "cursor-text" : "cursor-default"
                }`}
              />
              <div className="from-primary/5 to-iconsAccent/5 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </div>

          {/* Username Field */}
          <div className="group">
            <label className="text-textPrimary mb-2 flex items-center gap-2 text-sm font-semibold">
              <Icon icon="mdi:at" className="text-primary h-4 w-4" />
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                readOnly={!isEditing}
                placeholder="N/A"
                className={`border-backgroundLightGray group-hover:border-primary/60 w-full rounded-xl border-2 bg-white/70 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-300 ${
                  isEditing ? "cursor-text" : "cursor-default"
                }`}
              />
              <div className="from-primary/5 to-iconsAccent/5 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="text-textPrimary mb-2 flex items-center gap-2 text-sm font-semibold">
              <Icon icon="mdi:email" className="text-iconsAccent h-4 w-4" />
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                readOnly={!isEditing}
                placeholder="N/A"
                className={`border-backgroundLightGray group-hover:border-iconsAccent/60 w-full rounded-xl border-2 bg-white/70 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-300 ${
                  isEditing ? "cursor-text" : "cursor-default"
                }`}
              />
              <div className="from-iconsAccent/5 to-primary/5 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </div>

          {/* Role Field */}
          <div className="group">
            <label className="text-textPrimary mb-2 flex items-center gap-2 text-sm font-semibold">
              <Icon
                icon="mdi:shield-account"
                className="text-primary h-4 w-4"
              />
              Role
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.role}
                readOnly
                className="border-backgroundLightGray group-hover:border-primary/60 w-full cursor-default rounded-xl border-2 bg-white/70 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-300"
              />
              <div className="from-primary/5 to-iconsAccent/5 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6">
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="flex-1 rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-xl bg-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-green-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
