import { useState, useEffect } from "react";
import { authenticatedGet } from "../utils/apiUtils.js"; // Make sure this import is correct

const useAuditLogs = (options = {}) => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    limit,
    sortBy = "timestamp",
    sortOrder = "desc",
    excludeRead = false,
    ...filters
  } = options;

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();

      // Add pagination and sorting
      if (limit) queryParams.append("limit", limit.toString());
      queryParams.append("sortBy", sortBy);
      queryParams.append("sortOrder", sortOrder);

      // Add filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          queryParams.append(key, value);
        }
      });

      const response = await authenticatedGet(
        `${API_BASE_URL}/api/audit?${queryParams}`,
      );

      if (response.success) {
        let logs = response.data || [];

        // Filter out READ operations if excludeRead is true
        if (excludeRead) {
          logs = logs.filter((log) => log.action !== "READ");
        }

        setAuditLogs(logs);
      } else {
        setError(response.message || "Failed to fetch audit logs");
      }
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      setError(`Failed to fetch audit logs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const refreshAuditLogs = () => {
    fetchAuditLogs();
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [limit, sortBy, sortOrder, excludeRead, JSON.stringify(filters)]);

  return {
    auditLogs,
    loading,
    error,
    refreshAuditLogs,
  };
};

export default useAuditLogs;
