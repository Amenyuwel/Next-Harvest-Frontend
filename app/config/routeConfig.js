// app/config/routeConfig.js

const routeConfig = {
  "/dashboard": {
    title: "Dashboard",
    showAddButton: true,
    addButtonText: "Add Farmer",
  },
  "/records": {
    title: "Farmers",
    showAddButton: true,
    addButtonText: "Add Farmer",
  },
  "/reports": {
    title: "Reports",
    showAddButton: true,
    addButtonText: "Add Barangay",
  },
  "/audit": {
    title: "Logs",
    showAddButton: false,
    addButtonText: "",
  },
  "/train": {
    title: "Training",
    showAddButton: false,
    addButtonText: "",
  },
  "/profile": {
    title: "Profile",
    showAddButton: true,
    addButtonText: "Generate Report",
  },
  "/settings": {
    title: "Settings",
    showAddButton: false,
    addButtonText: "",
  },
};

export default routeConfig;
