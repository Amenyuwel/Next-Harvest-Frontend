import { useState, useEffect } from "react";
import { authenticatedGet } from "../utils/apiUtils.js";

export const useFarmers = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setLoading(true);
        const result = await authenticatedGet(`${API_URL}/api/farmers`);
        setFarmers(result.data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching farmers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, [API_URL]);

  return { farmers, loading, error };
};
