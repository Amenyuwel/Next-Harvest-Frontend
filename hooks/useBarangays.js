import { useState, useEffect } from "react";
import { authenticatedGet } from "../utils/apiUtils.js";

export const useBarangays = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
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

  return { barangays, loading, error, refreshBarangays };
};
