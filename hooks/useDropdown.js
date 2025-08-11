import { useState } from "react";

export const useDropdown = (items = [], searchField = "name") => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = items.filter((item) => {
    const searchValue = getFieldValue(item, searchField);
    return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectItem = (item, displayField = searchField) => {
    setSelectedItem(item);
    setSearchTerm(getFieldValue(item, displayField));
    setIsOpen(false);
  };

  const clearSelection = () => {
    setSelectedItem(null);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setIsOpen(true);
  };

  // Helper function to get field value (supports nested fields like "user.name")
  const getFieldValue = (obj, field) => {
    return field.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : "";
    }, obj);
  };

  return {
    searchTerm,
    isOpen,
    selectedItem,
    filteredItems,
    setSearchTerm,
    setIsOpen,
    selectItem,
    clearSelection,
    handleSearchChange,
  };
};
