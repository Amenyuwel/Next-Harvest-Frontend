"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const router = useRouter();
  const pathname = usePathname();

  const mainMenuItems = useMemo(
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
    [],
  );

  const bottomMenuItems = useMemo(
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
    [],
  );

  const allItems = useMemo(
    () => [...mainMenuItems, ...bottomMenuItems],
    [mainMenuItems, bottomMenuItems],
  );

  useEffect(() => {
    const currentItem = allItems.find((item) => item.path === pathname);
    if (currentItem) setActiveItem(currentItem.id);
  }, [pathname, allItems]);

  useEffect(() => {
    mainMenuItems.forEach((item) => {
      if (item.path) router.prefetch(item.path);
    });
  }, [mainMenuItems, router]);

  const handleItemClick = useCallback(
    (item) => {
      setActiveItem(item.id);
      if (item.action === "logout") {
        localStorage.removeItem("token");
        router.push("/login");
      } else if (item.path) {
        router.push(item.path);
      }
    },
    [router],
  );

  const renderMenuItem = useCallback(
    (item) => (
      <motion.div
        key={item.id}
        initial={false}
        onClick={() => handleItemClick(item)}
        className={`group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl transition-all duration-200 ${
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
        <div className="pointer-events-none absolute left-16 z-10 rounded-lg bg-gray-800 px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {item.label}
          <div className="absolute top-1/2 left-0 h-2 w-2 -translate-x-1 -translate-y-1/2 rotate-45 transform bg-gray-800"></div>
        </div>
      </motion.div>
    ),
    [activeItem, handleItemClick],
  );

  return (
    <div className="mt-4 flex h-[98.5%] w-25 flex-col items-center rounded-3xl bg-[var(--color-sidebar-bg)] py-6 shadow-lg">
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full">
        <div className="h-8 w-8 rounded-full bg-gray-500"></div>
      </div>
      <div className="flex flex-1 flex-col">
        {mainMenuItems.map(renderMenuItem)}
      </div>
      <div className="my-4 h-px w-8 bg-gray-600" />
      <div className="flex flex-col">{bottomMenuItems.map(renderMenuItem)}</div>
    </div>
  );
}

export default React.memo(Sidebar);
