import { authenticatedGet } from "./apiUtils.js";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const auditApi = {
  // Get all audit logs with filters
  getAuditLogs: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    return await authenticatedGet(`${API_BASE_URL}/api/audit?${queryParams}`);
  },

  // Get audit logs for a specific resource
  getResourceAuditLogs: async (resourceType, resourceId) => {
    return await authenticatedGet(
      `${API_BASE_URL}/api/audit/resource/${resourceType}/${resourceId}`,
    );
  },

  // Get audit logs for a specific user
  getUserAuditLogs: async (userId, options = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    return await authenticatedGet(
      `${API_BASE_URL}/api/audit/user/${userId}?${queryParams}`,
    );
  },

  // Get audit statistics
  getAuditStatistics: async () => {
    return await authenticatedGet(`${API_BASE_URL}/api/audit/statistics`);
  },

  // Get available filters
  getAvailableFilters: async () => {
    return await authenticatedGet(`${API_BASE_URL}/api/audit/filters`);
  },

  // Export audit logs
  exportAuditLogs: async (filters = {}, format = "csv") => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    queryParams.append("format", format);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/audit/export?${queryParams}`,
      {
        headers,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to export audit logs");
    }
    return response.blob();
  },
};

// Named exports for convenience
export const getAuditLogs = auditApi.getAuditLogs;
export const getResourceAuditLogs = auditApi.getResourceAuditLogs;
export const getUserAuditLogs = auditApi.getUserAuditLogs;
export const getAuditStatistics = auditApi.getAuditStatistics;
export const getAvailableFilters = auditApi.getAvailableFilters;
export const exportAuditLogs = auditApi.exportAuditLogs;

export default auditApi;
