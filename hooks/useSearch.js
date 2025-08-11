import { useState, useEffect } from "react";

export const useSearch = (data = [], searchFields = [], searchTerm = "") => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = data.filter((item) => {
      return searchFields.some((field) => {
        const fieldValue = getNestedValue(item, field);
        if (Array.isArray(fieldValue)) {
          return fieldValue.join(", ").toLowerCase().includes(searchLower);
        }
        return String(fieldValue).toLowerCase().includes(searchLower);
      });
    });

    setFilteredData(filtered);
  }, [data, searchTerm, searchFields]);

  // Helper function to get nested values (e.g., "user.name")
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : "";
    }, obj);
  };

  return filteredData;
};
