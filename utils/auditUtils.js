// Helper function to format field names
import { Icon } from "@iconify/react";
export const formatFieldName = (fieldName) => {
  const fieldMap = {
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    fullName: "Full Name",
    rsbsaNumber: "RSBSA Number",
    crop: "Crop",
    area: "Area",
    barangay: "Barangay",
    contact: "Contact",
    barangayId: "Barangay ID",
    barangayName: "Barangay Name",
    cropName: "Crop Name",
    cropType: "Crop Type",
    pestName: "Pest Name",
    pestType: "Pest Type",
    description: "Description",
    symptoms: "Symptoms",
    treatment: "Treatment",
    severity: "Severity",
    location: "Location",
    reportDate: "Report Date",
    status: "Status",
  };
  return (
    fieldMap[fieldName] ||
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
  );
};

// Helper function to format field values
export const formatFieldValue = (fieldName, value, getCropName) => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "empty";
  }

  // If it's a crop field, try to resolve to crop name
  if (fieldName === "crop" && getCropName) {
    const cropName = getCropName(value);
    return cropName !== value ? cropName : value;
  }

  return JSON.stringify(value);
};

// Helper function to generate enhanced description for CREATE actions
export const generateDescription = (log) => {
  if (
    log.action === "CREATE" &&
    log.resourceType === "farmer" &&
    log.changes &&
    Array.isArray(log.changes)
  ) {
    const fullNameChange = log.changes.find((c) => c.field === "fullName");
    const firstNameChange = log.changes.find((c) => c.field === "firstName");
    const lastNameChange = log.changes.find((c) => c.field === "lastName");
    const rsbsaChange = log.changes.find((c) => c.field === "rsbsaNumber");

    // Try to get full name
    let farmerName = null;
    if (fullNameChange?.newValue) {
      farmerName = fullNameChange.newValue;
    } else if (firstNameChange?.newValue && lastNameChange?.newValue) {
      farmerName = `${firstNameChange.newValue} ${lastNameChange.newValue}`;
    } else if (firstNameChange?.newValue) {
      farmerName = firstNameChange.newValue;
    }

    // Build description
    if (farmerName && rsbsaChange?.newValue) {
      return `Created new farmer "${farmerName}" (RSBSA: ${rsbsaChange.newValue})`;
    } else if (farmerName) {
      return `Created new farmer "${farmerName}"`;
    } else if (rsbsaChange?.newValue) {
      return `Created new farmer (RSBSA: ${rsbsaChange.newValue})`;
    }
  }

  // Default description
  const resource = log.resourceType.replace("_", " ");
  const resourceInfo = log.resourceName
    ? ` "${log.resourceName}"`
    : log.resourceId
      ? ` (ID: ${log.resourceId.slice(-8)})`
      : "";

  return `${log.userEmail || log.userId || "Unknown User"} performed ${log.action.toLowerCase()} on ${resource}${resourceInfo}`;
};

// Helper function to format timestamps
export const formatTimestamp = (timestamp) => {
  const now = new Date();
  const logTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now - logTime) / (1000 * 60));

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h ago`;
  } else {
    return logTime.toLocaleDateString();
  }
};

export const formatResourceType = (resourceType) => {
  return resourceType.charAt(0).toUpperCase() + resourceType.slice(1).replace("_", " ");
};

// Helper function to get action icons
export const getActionIcon = (action) => {
  switch (action) {
    case "CREATE": return "mdi:plus-circle";
    case "UPDATE": return "mdi:pencil";
    case "DELETE": return "mdi:delete";
    case "READ": return "mdi:eye";
    default: return "mdi:file-document";
  }
};

// Helper function to get action colors
export const getActionColor = (action) => {
  switch (action) {
    case "CREATE": return "bg-green-100 text-green-800 border-green-200";
    case "UPDATE": return "bg-blue-100 text-blue-800 border-blue-200";
    case "DELETE": return "bg-red-100 text-red-800 border-red-200";
    case "READ": return "bg-gray-100 text-gray-800 border-gray-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusDot = (action) => {
  switch (action) {
    case "CREATE": return "bg-green-500";
    case "UPDATE": return "bg-blue-500";
    case "DELETE": return "bg-red-500";
    default: return "bg-gray-500";
  }
};
