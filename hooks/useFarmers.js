import { useState, useEffect } from "react";

export const useFarmers = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/farmers`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
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
