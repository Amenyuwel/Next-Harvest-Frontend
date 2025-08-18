import { useState, useEffect } from "react";
import { authenticatedGet, authenticatedPost, authenticatedPut, authenticatedDelete } from "../utils/apiUtils.js";
import toast from "react-hot-toast";

export const useBarangays = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [barangays, setBarangays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarangays = async () => {
      try {
        setLoading(true);
        const result = await authenticatedGet(`${API_URL}/api/barangays`);
        if (result.success && result.data) {
          setBarangays(result.data);
        } else {
          setError(result.message || "Failed to fetch barangays");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching barangays:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBarangays();
  }, [API_URL]);

  const refreshBarangays = async () => {
    try {
      setLoading(true);
      const result = await authenticatedGet(`${API_URL}/api/barangays`);
      if (result.success && result.data) {
        setBarangays(result.data);
      } else {
        setError(result.message || "Failed to fetch barangays");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching barangays:", err);
    } finally {
      setLoading(false);
    }
  };

  const addBarangay = async (formData) => {
    try {
      const data = await authenticatedPost(`${API_URL}/api/barangays`, {
        barangayId: formData.barangayId,
        barangayName: formData.barangayName,
      });

      if (data.success) {
        await refreshBarangays();
        toast.success("Barangay added successfully!", {
          duration: 4000,
          position: "top-right",
        });
        return true;
      } else {
        toast.error(data.message || "Failed to add barangay", {
          duration: 4000,
          position: "top-right",
        });
        return false;
      }
    } catch (error) {
      console.error("Error adding barangay:", error);
      toast.error(error.message || "Failed to add barangay. Please try again.", {
        duration: 4000,
        position: "top-right",
      });
      return false;
    }
  };

  const updateBarangay = async (id, formData) => {
    try {
      const data = await authenticatedPut(`${API_URL}/api/barangays/${id}`, {
        barangayId: formData.barangayId,
        barangayName: formData.barangayName,
      });

      if (data.success) {
        await refreshBarangays();
        toast.success("Barangay updated successfully!", {
          duration: 4000,
          position: "top-right",
        });
        return true;
      } else {
        toast.error(data.message || "Failed to update barangay", {
          duration: 4000,
          position: "top-right",
        });
        return false;
      }
    } catch (error) {
      console.error("Error updating barangay:", error);
      toast.error(error.message || "Failed to update barangay. Please try again.", {
        duration: 4000,
        position: "top-right",
      });
      return false;
    }
  };

  const deleteBarangay = async (id) => {
    try {
      const data = await authenticatedDelete(`${API_URL}/api/barangays/${id}`);

      if (data.success) {
        await refreshBarangays();
        toast.success("Barangay deleted successfully!", {
          duration: 4000,
          position: "top-right",
        });
        return true;
      } else {
        toast.error(data.message || "Failed to delete barangay", {
          duration: 4000,
          position: "top-right",
        });
        return false;
      }
    } catch (error) {
      console.error("Error deleting barangay:", error);
      toast.error(error.message || "Failed to delete barangay. Please try again.", {
        duration: 4000,
        position: "top-right",
      });
      return false;
    }
  };

  return { 
    barangays, 
    loading, 
    error, 
    refreshBarangays,
    addBarangay,
    updateBarangay,
    deleteBarangay
  };
};
