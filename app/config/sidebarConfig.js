// sidebarConfig.js
export const sidebarConfig = {
  main: [
    {
      id: "dashboard",
      icon: "material-symbols:home-outline-rounded",
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      id: "records",
      icon: "system-uicons:graph-box",
      label: "Farmers",
      path: "/records",
    },
    {
      id: "reports",
      icon: "mingcute:document-line",
      label: "Reports",
      path: "/reports",
    },
    {
      id: "audit",
      icon: "material-symbols:history",
      label: "Logs",
      path: "/audit",
      roles: ["superAdmin"],
    },
    {
      id: "training",
      icon: "mdi:graph",
      label: "Train",
      path: "/train",
      roles: ["superAdmin"],
    },
    {
      id: "profile",
      icon: "lucide:user-round",
      label: "Profile",
      path: "/profile",
    },
  ],
  bottom: [
    {
      id: "settings",
      icon: "ic:round-settings",
      label: "Settings",
      path: "/settings",
    },
    {
      id: "logout",
      icon: "line-md:logout",
      label: "Logout",
      action: "logout",
    },
  ],
};
