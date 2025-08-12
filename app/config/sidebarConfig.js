// sidebarConfig.js
export const sidebarConfig = {
  main: [
    {
      id: "dashboard",
      icon: "material-symbols:home-outline-rounded",
      label: "Dashboard",
      path: "/pages/dashboard",
    },
    {
      id: "records",
      icon: "system-uicons:graph-box",
      label: "Farmers",
      path: "/pages/records",
    },
    {
      id: "reports",
      icon: "mingcute:document-line",
      label: "Reports",
      path: "/pages/reports",
    },
    {
      id: "audit",
      icon: "material-symbols:history",
      label: "Logs",
      path: "/pages/audit",
      roles: ["superAdmin"],
    },
    {
      id: "training",
      icon: "mdi:graph",
      label: "Train",
      path: "/pages/train",
      roles: ["superAdmin"],
    },
    {
      id: "profile",
      icon: "lucide:user-round",
      label: "Profile",
      path: "/pages/profile",
    },
  ],
  bottom: [
    {
      id: "settings",
      icon: "ic:round-settings",
      label: "Settings",
      path: "/pages/settings",
    },
    {
      id: "logout",
      icon: "line-md:logout",
      label: "Logout",
      action: "logout",
    },
  ],
};
