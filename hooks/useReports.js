import { useState, useEffect } from 'react';

export const useReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      // Fix: Use backticks for template literal and ensure API_URL is defined
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/reports`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setReports(data.data);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch reports');
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const refreshReports = () => {
    fetchReports();
  };

  return {
    reports,
    loading,
    error,
    refreshReports
  };
};