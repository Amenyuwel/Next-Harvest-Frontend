"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const router = useRouter();
  const pathname = usePathname();

  // Main navigation items - memoized to prevent recreation
  const mainMenuItems = React.useMemo(
    () => [
      {
        id: "dashboard",
        icon: "material-symbols:home-outline-rounded",
        label: "Dashboard",
        path: "/pages/dashboard",
      },
      {
        id: "records",
        icon: "system-uicons:graph-box",
        label: "Records of Farmers",
        path: "/pages/records",
      },
      {
        id: "reports",
        icon: "mingcute:document-line",
        label: "Reports",
        path: "/pages/reports",
      },
      {
        id: "training",
        icon: "mdi:graph",
        label: "Train",
        path: "/pages/train",
      },
      {
        id: "profile",
        icon: "lucide:user-round",
        label: "Profile",
        path: "/pages/profile",
      },
    ],
    []
  );

  // Bottom navigation items - memoized to prevent recreation
  const bottomMenuItems = React.useMemo(
    () => [
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
    []
  );

  // Memoize combined menu items
  const allItems = React.useMemo(
    () => [...mainMenuItems, ...bottomMenuItems],
    []
  );

  // Update active item based on current path
  useEffect(() => {
    const currentItem = allItems.find((item) => item.path === pathname);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [pathname, allItems]);

  const handleItemClick = React.useCallback(
    (item) => {
      setActiveItem(item.id);

      if (item.action === "logout") {
        localStorage.removeItem("token");
        router.push("/pages/login");
      } else if (item.path) {
        router.push(item.path);
      }
    },
    [router]
  );

  const renderMenuItem = React.useCallback(
    (item, index) => (
      <motion.div
        key={item.id}
        initial={false}
        onClick={() => handleItemClick(item)}
        className={`w-20 h-20 rounded-3xl flex items-center justify-center cursor-pointer transition-all duration-200 group relative${
          activeItem === item.id
            ? "border-[var(--color-icons-accent)] bg-transparent"
            : "border-transparent hover:border-gray-500"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon
          icon={item.icon}
          width="24"
          height="24"
          className={`transition-colors duration-200 ${
            activeItem === item.id
              ? "text-[var(--color-icons-accent)]"
              : "text-gray-400 group-hover:text-white"
          }`}
        />

        {/* Simplified Tooltip */}
        <div className="absolute left-16 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg pointer-events-none whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {item.label}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      </motion.div>
    ),
    [activeItem, handleItemClick]
  );

  return (
    <div className="w-25 h-[96%] bg-[var(--color-sidebar-bg)] rounded-3xl flex flex-col items-center py-6 shadow-lg mt-4">
      {/* Logo/Avatar */}
      <div className="w-12 h-12 rounded-full mb-8 flex items-center justify-center">
        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
      </div>

      {/* Main Menu Items */}
      <div className="flex flex-col  flex-1">
        {mainMenuItems.map((item, index) => renderMenuItem(item, index))}
      </div>

      {/* Separator Line */}
      <div className="w-8 h-px bg-gray-600 my-4" />

      {/* Bottom Menu Items */}
      <div className="flex flex-col ">
        {bottomMenuItems.map((item, index) =>
          renderMenuItem(item, index + mainMenuItems.length)
        )}
      </div>
    </div>
  );
}

export default React.memo(Sidebar);
