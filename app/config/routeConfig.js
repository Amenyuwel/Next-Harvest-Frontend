// app/config/routeConfig.js

const routeConfig = {
  "/pages/dashboard": {
    title: "Dashboard",
    showAddButton: true,
    addButtonText: "Add Farmer",
  },
  "/pages/records": {
    title: "Farmers",
    showAddButton: true,
    addButtonText: "Add Farmer",
  },
  "/pages/reports": {
    title: "Reports",
    showAddButton: true,
    addButtonText: "Add Barangay",
  },
  "/pages/train": {
    title: "Training",
    showAddButton: false,
    addButtonText: "",
  },
  "/pages/profile": {
    title: "Profile",
    showAddButton: true,
    addButtonText: "Generate Report",
  },
  "/pages/settings": {
    title: "Settings",
    showAddButton: false,
    addButtonText: "",
  },
};

export default routeConfig;
