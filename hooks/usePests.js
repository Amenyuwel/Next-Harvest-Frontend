import { useState, useEffect } from "react";
import { authenticatedGet } from "../utils/apiUtils.js";

export const usePests = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [pests, setPests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPests = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await authenticatedGet(`${API_URL}/api/pests`);
        
        if (result.success && result.data) {
          setPests(result.data);
        } else {
          setError(result.message || "Failed to fetch pest data");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching pests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPests();
  }, [API_URL]);

  const refreshPests = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await authenticatedGet(`${API_URL}/api/pests`);
      
      if (result.success && result.data) {
        setPests(result.data);
      } else {
        setError(result.message || "Failed to fetch pest data");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching pests:", err);
    } finally {
      setLoading(false);
    }
  };

  return { pests, loading, error, refreshPests };
};
