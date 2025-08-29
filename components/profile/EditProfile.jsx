"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const EditProfile = ({
  profile,
  updateProfile,
  updateLoading,
  onUpdateSuccess,
  onUpdateError,
  className = "",
  fields = ["fullName", "username", "email", "role"],
  readOnlyFields = ["role"],
  showRole = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "",
  });

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      // Extract name components - handle different possible field names
      const firstName = profile.firstName || profile.first_name || "";
      const middleName = profile.middleName || profile.middle_name || "";
      const lastName = profile.lastName || profile.last_name || "";

      // Create full name by combining all non-empty name parts
      const nameParts = [firstName, middleName, lastName].filter(
        (part) =>
          part &&
          part.toString().trim() !== "" &&
          part !== null &&
          part !== undefined,
      );
      const fullName = nameParts.join(" ");

      // Create the form data object
      const newFormData = {
        fullName: fullName || "User",
        username: profile.username || profile.user_name || "",
        email: profile.email || "",
        role: profile.role || "User",
      };

      setFormData(newFormData);
    } else {
      setFormData({
        fullName: "",
        username: "",
        email: "",
        role: "",
      });
    }
  }, [profile]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // Split fullName back into firstName, middleName, and lastName for API
      const nameParts = formData.fullName
        .trim()
        .split(" ")
        .filter((part) => part !== "");

      let firstName = "";
      let middleName = "";
      let lastName = "";

      if (nameParts.length === 1) {
        firstName = nameParts[0];
      } else if (nameParts.length === 2) {
        firstName = nameParts[0];
        lastName = nameParts[1];
      } else if (nameParts.length >= 3) {
        firstName = nameParts[0];
        lastName = nameParts[nameParts.length - 1];
        middleName = nameParts.slice(1, -1).join(" ");
      }

      const profileDataToSend = {
        firstName: firstName,
        middleName: middleName || null,
        lastName: lastName,
        username: formData.username,
        email: formData.email,
        role: formData.role,
      };

      const result = await updateProfile(profileDataToSend);
      if (result.success) {
        setIsEditing(false);
        if (onUpdateSuccess) {
          await onUpdateSuccess(result);
        }
      } else {
        if (onUpdateError) {
          onUpdateError(result.message || "Failed to update profile");
        }
      }
    } catch (error) {
      if (onUpdateError) {
        onUpdateError(
          error.message || "An error occurred while updating profile",
        );
      }
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to current profile data when canceling
    if (profile) {
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
      const fullName = nameParts.join(" ");

      setFormData({
        fullName: fullName || "User",
        username: profile.username || profile.user_name || "",
        email: profile.email || "",
        role: profile.role || "User",
      });
    }
    setIsEditing(false);
  };

  const fieldConfigs = {
    fullName: {
      label: "Full Name",
      icon: "mdi:account",
      type: "text",
      placeholder: "Enter your full name",
      iconColor: "text-primary",
      borderColor: "group-hover:border-primary/60",
      gradientColor: "from-primary/5 to-iconsAccent/5",
    },
    username: {
      label: "Username",
      icon: "mdi:at",
      type: "text",
      placeholder: "N/A",
      iconColor: "text-primary",
      borderColor: "group-hover:border-primary/60",
      gradientColor: "from-primary/5 to-iconsAccent/5",
    },
    email: {
      label: "Email Address",
      icon: "mdi:email",
      type: "email",
      placeholder: "N/A",
      iconColor: "text-iconsAccent",
      borderColor: "group-hover:border-iconsAccent/60",
      gradientColor: "from-iconsAccent/5 to-primary/5",
    },
    role: {
      label: "Role",
      icon: "mdi:shield-account",
      type: "text",
      placeholder: "N/A",
      iconColor: "text-primary",
      borderColor: "group-hover:border-primary/60",
      gradientColor: "from-primary/5 to-iconsAccent/5",
    },
  };

  const renderField = (fieldName) => {
    const config = fieldConfigs[fieldName];
    if (!config) return null;

    const isReadOnly = readOnlyFields.includes(fieldName);
    const shouldShow = fieldName === "role" ? showRole : true;

    if (!shouldShow) return null;

    return (
      <div key={fieldName} className="group">
        <label className="text-textPrimary mb-2 flex items-center gap-2 text-sm font-semibold">
          <Icon icon={config.icon} className={`${config.iconColor} h-4 w-4`} />
          {config.label}
        </label>
        <div className="relative">
          <input
            type={config.type}
            value={formData[fieldName]}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            readOnly={!isEditing || isReadOnly}
            disabled={updateLoading}
            placeholder={config.placeholder}
            className={`border-backgroundLightGray ${config.borderColor} w-full rounded-xl border-2 bg-white/70 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-300 ${
              isEditing && !updateLoading && !isReadOnly
                ? "cursor-text"
                : "cursor-default"
            } ${updateLoading ? "opacity-50" : ""}`}
          />
          <div
            className={`${config.gradientColor} pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Form Fields */}
      <div className="space-y-5">{fields.map(renderField)}</div>

      {/* Action Buttons */}
      <div className="mt-6">
        {isEditing ? (
          <div className="flex gap-3">
            <button
              onClick={handleSaveProfile}
              disabled={updateLoading}
              className="flex-1 rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Icon icon="mdi:loading" className="h-4 w-4 animate-spin" />
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={updateLoading}
              className="rounded-xl bg-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            disabled={updateLoading}
            className="w-full rounded-xl bg-green-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
