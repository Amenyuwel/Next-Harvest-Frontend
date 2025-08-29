import { useState, useEffect } from "react";
import { authenticatedGet } from "../utils/apiUtils";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false); // Separate loading state for updates

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const extractProfileData = (result) => {
    console.log("Extracting profile data from:", result);

    // Handle different possible response structures
    let profileData = null;

    if (result && result.success && result.user) {
      // Structure: {success: true, user: {...}}
      console.log("Found profile in result.user");
      profileData = result.user;
    } else if (result && result.data && result.data._id) {
      // Structure: {data: {...}}
      console.log("Found profile in result.data");
      profileData = result.data;
    } else if (result && result._id) {
      // Structure: User object directly
      console.log("Found profile as direct object");
      profileData = result;
    } else if (
      result &&
      typeof result === "object" &&
      !result.success &&
      !result.error
    ) {
      // Assume the result itself is the profile data if it's an object without success/error flags
      console.log("Assuming result is profile data");
      profileData = result;
    }

    // Convert Mongoose document to plain object if needed
    if (profileData && profileData._doc) {
      console.log("Converting Mongoose document to plain object");
      profileData = profileData._doc;
    }

    console.log("Extracted profile data:", profileData);
    return profileData;
  };

  const validateProfileData = (profileData) => {
    // Check if profileData exists and has either _id or id field
    const hasValidId =
      profileData &&
      (profileData._id ||
        profileData.id ||
        (profileData._id && profileData._id.toString));

    console.log("Validating profile data:", {
      exists: !!profileData,
      hasId: hasValidId,
      profileData: profileData,
    });

    return hasValidId;
  };

  // Validation function for profile update data
  const validateUpdateData = (profileData) => {
    const errors = [];

    // Check required fields
    if (!profileData.firstName || profileData.firstName.trim() === "") {
      errors.push("First name is required");
    }

    if (!profileData.username || profileData.username.trim() === "") {
      errors.push("Username is required");
    }

    if (!profileData.email || profileData.email.trim() === "") {
      errors.push("Email is required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (profileData.email && !emailRegex.test(profileData.email)) {
      errors.push("Please enter a valid email address");
    }

    // Validate username format (no spaces, special characters)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (profileData.username && !usernameRegex.test(profileData.username)) {
      errors.push(
        "Username can only contain letters, numbers, and underscores",
      );
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await authenticatedGet(`${API_URL}/api/auth/profile`);

        console.log("Profile fetch result:", result);

        const profileData = extractProfileData(result);

        if (validateProfileData(profileData)) {
          console.log("Setting profile data:", profileData);
          setProfile(profileData);
        } else {
          console.log("No valid profile data found in response:", result);
          console.log("Extracted profile data was:", profileData);
          setError("Failed to load profile data - invalid response structure");
        }
      } catch (err) {
        setError(err.message || "Network error occurred");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API_URL]);

  const refreshProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await authenticatedGet(`${API_URL}/api/auth/profile`);

      console.log("Profile refresh result:", result);

      const profileData = extractProfileData(result);

      if (validateProfileData(profileData)) {
        setProfile(profileData);
        return { success: true, data: profileData };
      } else {
        setError("Failed to refresh profile data");
        return { success: false, message: "Failed to refresh profile data" };
      }
    } catch (err) {
      const errorMessage = err.message || "Network error occurred";
      setError(errorMessage);
      console.error("Error refreshing profile:", err);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setUpdateLoading(true);
      setError(null);

      console.log("Starting profile update with data:", profileData);

      // Validate the data before sending
      const validation = validateUpdateData(profileData);
      if (!validation.isValid) {
        console.log("Validation failed:", validation.errors);
        return {
          success: false,
          message: validation.errors.join(", "),
          errors: validation.errors,
        };
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Clean the data - remove empty strings and null values for optional fields
      const cleanedData = {
        firstName: profileData.firstName.trim(),
        lastName: profileData.lastName?.trim() || "",
        middleName: profileData.middleName?.trim() || null,
        username: profileData.username.trim(),
        email: profileData.email.trim(),
        role: profileData.role || "user",
      };

      console.log("Sending cleaned profile data:", cleanedData);
      console.log("Request URL:", `${API_URL}/api/auth/profile`);

      const result = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      console.log("Update response status:", result.status);
      console.log("Update response headers:", result.headers);

      if (!result.ok) {
        // Try to get error details from response
        let errorData = {};
        try {
          errorData = await result.json();
        } catch (e) {
          console.log("Could not parse error response as JSON");
        }

        console.log("Error response data:", errorData);

        // More specific error message
        let errorMessage = `HTTP ${result.status}`;
        if (result.status === 404) {
          errorMessage =
            "Profile update endpoint not found. Please check if the API endpoint exists.";
        } else if (result.status === 401) {
          errorMessage = "Unauthorized. Please log in again.";
        } else if (result.status === 403) {
          errorMessage =
            "Forbidden. You don't have permission to update this profile.";
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }

        throw new Error(errorMessage);
      }

      const data = await result.json();
      console.log("Update response data:", data);

      const updatedProfileData = extractProfileData(data);

      if (validateProfileData(updatedProfileData)) {
        console.log("Successfully updated profile:", updatedProfileData);
        setProfile(updatedProfileData);
        return {
          success: true,
          data: updatedProfileData,
          message: "Profile updated successfully!",
        };
      } else {
        const errorMessage =
          data.message || "Failed to update profile - invalid response";
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.message || "Network error occurred";
      setError(errorMessage);
      console.error("Error updating profile:", err);
      return {
        success: false,
        message: errorMessage,
        error: err,
      };
    } finally {
      setUpdateLoading(false);
    }
  };

  // Reset error function
  const clearError = () => {
    setError(null);
  };

  return {
    profile,
    loading,
    error,
    updateLoading, // Separate loading state for updates
    refreshProfile,
    updateProfile,
    clearError,
  };
};
