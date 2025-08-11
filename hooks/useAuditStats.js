import { useState, useEffect } from "react";
import auditApi from "../utils/auditApi.js";

export const useAuditStats = () => {
  const [stats, setStats] = useState({
    totalCreate: 0,
    totalUpdate: 0,
    totalDelete: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await auditApi.getAuditStatistics();

        if (result.success) {
          setStats(result.data);
        } else {
          setError(result.message || "Failed to fetch audit statistics");
        }
      } catch (err) {
        console.error("Error fetching audit statistics:", err);

        // Handle 404 specifically - might mean no audit logs exist yet
        if (
          err.message.includes("404") ||
          err.message.includes("HTTP error! status: 404")
        ) {
          console.log(
            "No audit statistics found (404) - this might be normal if no activities have been logged yet",
          );
          setStats({
            totalCreate: 0,
            totalUpdate: 0,
            totalDelete: 0,
          });
          setError(null); // Don't show error for empty stats
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const refreshStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await auditApi.getAuditStatistics();

      if (result.success) {
        setStats(result.data);
      } else {
        setError(result.message || "Failed to fetch audit statistics");
      }
    } catch (err) {
      console.error("Error fetching audit statistics:", err);

      // Handle 404 specifically - might mean no audit logs exist yet
      if (
        err.message.includes("404") ||
        err.message.includes("HTTP error! status: 404")
      ) {
        console.log(
          "No audit statistics found (404) - this might be normal if no activities have been logged yet",
        );
        setStats({
          totalCreate: 0,
          totalUpdate: 0,
          totalDelete: 0,
        });
        setError(null); // Don't show error for empty stats
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refreshStats };
};
