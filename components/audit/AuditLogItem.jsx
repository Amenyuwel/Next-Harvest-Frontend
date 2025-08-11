import React from "react";
import { Icon } from "@iconify/react";
import { filterMeaningfulChanges } from "../../utils/auditUtils.js";

const AuditLogItem = ({ log, index, getCropName }) => {
  // Helper functions moved inline to avoid dependencies
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const logTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - logTime) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return logTime.toLocaleDateString();
  };

  const getActionIcon = (action) => {
    switch (action) {
      case "CREATE":
        return "material-symbols:add-circle";
      case "UPDATE":
        return "material-symbols:edit";
      case "DELETE":
        return "material-symbols:delete";
      default:
        return "material-symbols:description";
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case "CREATE":
        return "bg-green-100 text-green-700 border-green-200";
      case "UPDATE":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "DELETE":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getIconColor = (action) => {
    switch (action) {
      case "CREATE":
        return "text-green-600";
      case "UPDATE":
        return "text-blue-600";
      case "DELETE":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const formatFieldName = (fieldName) => {
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
    };
    return (
      fieldMap[fieldName] ||
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    );
  };

  const formatFieldValue = (fieldName, value, getCropName) => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return "empty";
    }

    // Handle crop field values by converting ID to name
    if (fieldName === "crop" && getCropName) {
      const cropName = getCropName(value);
      // Return the crop name without quotes if conversion was successful
      return cropName !== value ? cropName : value;
    }

    return JSON.stringify(value);
  };

  const generateDescription = (log) => {
    if (
      log.action === "CREATE" &&
      log.resourceType === "farmer" &&
      log.changes
    ) {
      const fullNameChange = log.changes.find((c) => c.field === "fullName");
      const firstNameChange = log.changes.find((c) => c.field === "firstName");
      const lastNameChange = log.changes.find((c) => c.field === "lastName");

      let farmerName = "Unknown Farmer";
      if (fullNameChange?.newValue) {
        farmerName = `"${fullNameChange.newValue}"`;
      } else if (firstNameChange?.newValue || lastNameChange?.newValue) {
        farmerName = `"${firstNameChange?.newValue || ""} ${lastNameChange?.newValue || ""}".trim()`;
      }

      return `${log.userEmail || "System"} performed create on farmer ${farmerName}`;
    }

    const resource = log.resourceType.replace("_", " ");
    const resourceInfo = log.resourceName
      ? ` "${log.resourceName}"`
      : log.resourceId
        ? ` (ID: ${log.resourceId.slice(-8)})`
        : "";

    return `${log.userEmail || log.userId || "Unknown User"} performed ${log.action.toLowerCase()} on ${resource}${resourceInfo}`;
  };

  return (
    <div className={`p-6 transition-colors hover:bg-gray-50`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 pt-1">
          <Icon
            icon={getActionIcon(log.action)}
            className={`h-6 w-6 ${getIconColor(log.action)}`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getActionColor(log.action)}`}
              >
                {log.action}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {log.resourceType.replace("_", " ").toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {formatTimestamp(log.timestamp)}
            </span>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-600">{generateDescription(log)}</p>
          </div>

          {/* Special dropdown for CREATE and DELETE farmer actions */}
          {(log.action === "CREATE" || log.action === "DELETE") &&
            log.resourceType === "farmer" && (
              <FarmerDetailsDropdown log={log} />
            )}

          {/* Changes dropdown */}
          {log.changes && log.changes.length > 0 && (
            <ChangesDropdown
              log={log}
              getCropName={getCropName}
              formatFieldName={formatFieldName}
              formatFieldValue={formatFieldValue}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const FarmerDetailsDropdown = ({ log }) => (
  <details className="group mt-3 cursor-pointer">
    <summary
      className={`flex items-center text-sm font-medium ${
        log.action === "CREATE"
          ? "text-green-600 hover:text-green-800"
          : "text-red-600 hover:text-red-800"
      }`}
    >
      <Icon
        icon="material-symbols:chevron-right"
        className="mr-1 h-4 w-4 transition-transform group-open:rotate-90"
      />
      <Icon
        icon={
          log.action === "CREATE"
            ? "material-symbols:person-add"
            : "material-symbols:person-remove"
        }
        className="mr-1 h-4 w-4"
      />
      View farmer details
    </summary>
    <div className="mt-3 space-y-2">
      <FarmerDetailsContent log={log} />
    </div>
  </details>
);

const FarmerDetailsContent = ({ log }) => {
  const changes = log.changes || [];
  const farmerDetails = [];

  // Use enriched farmer details from backend if available
  if (log.farmerDetails) {
    if (log.farmerDetails.fullName) {
      farmerDetails.push(
        <FarmerDetailCard
          key="fullName"
          label="Full Name"
          value={log.farmerDetails.fullName}
          action={log.action}
        />,
      );
    }

    if (log.farmerDetails.rsbsaNumber) {
      farmerDetails.push(
        <div key="rsbsa" className="rounded-lg border bg-blue-50 p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon
              icon="material-symbols:badge"
              className="h-4 w-4 text-blue-600"
            />
            RSBSA Number
          </div>
          <div className="text-sm font-semibold text-blue-700">
            {log.farmerDetails.rsbsaNumber}
          </div>
        </div>,
      );
    }
  } else {
    // Fallback: Use changes array
    const dataSource = log.action === "DELETE" ? "oldValue" : "newValue";
    const fullNameChange = changes.find((c) => c.field === "fullName");
    const firstNameChange = changes.find((c) => c.field === "firstName");
    const lastNameChange = changes.find((c) => c.field === "lastName");
    const rsbsaChange = changes.find((c) => c.field === "rsbsaNumber");

    // Get display name
    let displayName = null;
    if (fullNameChange && fullNameChange[dataSource]) {
      displayName = fullNameChange[dataSource];
    } else if (firstNameChange?.[dataSource] || lastNameChange?.[dataSource]) {
      displayName =
        `${firstNameChange?.[dataSource] || ""} ${lastNameChange?.[dataSource] || ""}`.trim();
    }

    if (displayName) {
      farmerDetails.push(
        <FarmerDetailCard
          key="fullName"
          label="Full Name"
          value={displayName}
          action={log.action}
        />,
      );
    }

    if (rsbsaChange && rsbsaChange[dataSource]) {
      farmerDetails.push(
        <div key="rsbsa" className="rounded-lg border bg-blue-50 p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon
              icon="material-symbols:badge"
              className="h-4 w-4 text-blue-600"
            />
            RSBSA Number
          </div>
          <div className="text-sm font-semibold text-blue-700">
            {rsbsaChange[dataSource]}
          </div>
        </div>,
      );
    }
  }

  return farmerDetails.length > 0 ? (
    farmerDetails
  ) : (
    <div className="rounded-lg border bg-gray-50 p-3">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Icon icon="material-symbols:info" className="h-4 w-4" />
        No additional farmer details available
      </div>
    </div>
  );
};

const FarmerDetailCard = ({ label, value, action }) => {
  const bgColor = action === "CREATE" ? "bg-green-50" : "bg-red-50";
  const textColor = action === "CREATE" ? "text-green-700" : "text-red-700";
  const iconColor = action === "CREATE" ? "text-green-600" : "text-red-600";

  return (
    <div className={`rounded-lg border ${bgColor} p-3`}>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon
          icon="material-symbols:person"
          className={`h-4 w-4 ${iconColor}`}
        />
        {label}
      </div>
      <div className={`text-sm font-semibold ${textColor}`}>{value}</div>
    </div>
  );
};

const ChangesDropdown = ({
  log,
  getCropName,
  formatFieldName,
  formatFieldValue,
}) => {
  const meaningfulChanges = filterMeaningfulChanges(log.changes);

  return (
    <details className="group mt-3 cursor-pointer">
      <summary className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
        <Icon
          icon="material-symbols:chevron-right"
          className="mr-1 h-4 w-4 transition-transform group-open:rotate-90"
        />
        <Icon icon="material-symbols:change-history" className="mr-1 h-4 w-4" />
        View {meaningfulChanges.length} meaningful change
        {meaningfulChanges.length > 1 ? "s" : ""}
      </summary>
      <div className="mt-3 space-y-2">
        {meaningfulChanges.map((change, changeIndex) => (
          <ChangeItem
            key={changeIndex}
            change={change}
            getCropName={getCropName}
            formatFieldName={formatFieldName}
            formatFieldValue={formatFieldValue}
          />
        ))}
      </div>
    </details>
  );
};

const ChangeItem = ({
  change,
  getCropName,
  formatFieldName,
  formatFieldValue,
}) => (
  <div className="rounded-lg border bg-gray-50 p-3">
    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
      <Icon
        icon="material-symbols:edit-note"
        className="h-4 w-4 text-gray-600"
      />
      {formatFieldName(change.field)}
    </div>
    <div className="flex items-center space-x-2 text-xs">
      <span className="flex items-center gap-1 rounded border bg-red-100 px-2 py-1 text-red-700">
        <Icon icon="material-symbols:remove" className="h-3 w-3" />
        {formatFieldValue(change.field, change.oldValue, getCropName)}
      </span>
      <Icon
        icon="material-symbols:arrow-forward"
        className="h-4 w-4 text-gray-400"
      />
      <span className="flex items-center gap-1 rounded border bg-green-100 px-2 py-1 text-green-700">
        <Icon icon="material-symbols:add" className="h-3 w-3" />
        {formatFieldValue(change.field, change.newValue, getCropName)}
      </span>
    </div>
  </div>
);

export default AuditLogItem;
