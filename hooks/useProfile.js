import { useState, useEffect } from "react";
import { authenticatedGet } from "../utils/apiUtils";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      } else {
        setError("Failed to refresh profile data");
      }
    } catch (err) {
      setError(err.message || "Network error occurred");
      console.error("Error refreshing profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const result = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data = await result.json();

      const updatedProfileData = extractProfileData(data);

      if (validateProfileData(updatedProfileData)) {
        setProfile(updatedProfileData);
        return { success: true, data: updatedProfileData };
      } else {
        const errorMessage = data.message || "Failed to update profile";
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (err) {
      const errorMessage = err.message || "Network error occurred";
      setError(errorMessage);
      console.error("Error updating profile:", err);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    refreshProfile,
    updateProfile,
  };
};
