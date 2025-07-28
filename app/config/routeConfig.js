// app/config/routeConfig.js

const routeConfig = {
  "/pages/dashboard": {
    title: "Dashboard",
    showAddButton: true,
    addButtonText: "Add Farmer",
    onAddClick: () => {},
  },
  "/pages/records": {
    title: "Farmers",
    showAddButton: true,
    addButtonText: "Review Records",
    onAddClick: () => {},
  },
  "/pages/reports": {
    title: "Reports",
    showAddButton: false,
    addButtonText: "Review Reports",
    onAddClick: () => {},
  },
  "/pages/train": {
    title: "Training",
    showAddButton: false,
    addButtonText: "",
    onAddClick: () => {},
  },
  "/pages/profile": {
    title: "Profile",
    showAddButton: true,
    addButtonText: "Generate Report",
    onAddClick: () => {},
  },
  "/pages/settings": {
    title: "Settings",
    showAddButton: false,
    addButtonText: "",
    onAddClick: () => {},
  },
};

export default routeConfig;
