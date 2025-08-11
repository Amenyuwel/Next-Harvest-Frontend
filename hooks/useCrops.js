import { useState, useEffect } from "react";
import { authenticatedGet } from "../utils/apiUtils.js";

export const useCrops = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        const result = await authenticatedGet(`${API_URL}/api/crops`);
        if (result.success && result.data) {
          setCrops(result.data);
        } else {
          setError(result.message || "Failed to fetch crops");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching crops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [API_URL]);

  const refreshCrops = async () => {
    try {
      setLoading(true);
      const result = await authenticatedGet(`${API_URL}/api/crops`);
      if (result.success && result.data) {
        setCrops(result.data);
      } else {
        setError(result.message || "Failed to fetch crops");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching crops:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get crop name from ID
  const getCropName = (cropId) => {
    const crop = crops.find((c) => c.cropId === cropId);
    return crop
      ? crop.cropName.charAt(0).toUpperCase() +
          crop.cropName.slice(1).toLowerCase()
      : cropId;
  };

  return { crops, loading, error, refreshCrops, getCropName };
};
