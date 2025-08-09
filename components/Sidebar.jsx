"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { sidebarConfig } from "@/app/config/sidebarConfig";
import { useAuth } from "@/app/context/AuthContext";

function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  // Memoize menu items for performance
  const mainMenuItems = useMemo(() => sidebarConfig.main, []);
  const bottomMenuItems = useMemo(() => sidebarConfig.bottom, []);

  // Set active item based on current path
  useEffect(() => {
    const currentItem = [...mainMenuItems, ...bottomMenuItems].find(
      (item) => item.path === pathname
    );
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [pathname, mainMenuItems, bottomMenuItems]);

  // Prefetch navigation links for faster transitions
  useEffect(() => {
    mainMenuItems.forEach((item) => {
      if (item.path) router.prefetch(item.path);
    });
    bottomMenuItems.forEach((item) => {
      if (item.path) router.prefetch(item.path);
    });
  }, [mainMenuItems, bottomMenuItems, router]);

  // Handle menu item clicks
  const handleItemClick = useCallback(
    (item) => {
      setActiveItem(item.id);

      if (item.action === "logout") {
        logout();
      } else if (item.path) {
        router.push(item.path);
      }
    },
    [router, logout]
  );

  // Render a menu item
  const renderMenuItem = useCallback(
    (item) => (
      <div
        key={item.id}
        onClick={() => handleItemClick(item)}
        className={`group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl transition-all duration-200 
          ${
            activeItem === item.id
              ? "border-[var(--color-icons-accent)] bg-transparent"
              : "border-transparent hover:border-gray-500"
          }`}
      >
        <Icon
          icon={item.icon}
          width="24"
          height="24"
          className={`transition-colors duration-200 
            ${
              activeItem === item.id
                ? "text-[var(--color-icons-accent)]"
                : "text-gray-400 group-hover:text-white"
            }`}
        />
        {/* Tooltip */}
        <div className="pointer-events-none absolute left-16 z-50 rounded-lg bg-gray-800 px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {item.label}
          <div className="absolute top-1/2 left-0 h-2 w-2 -translate-x-1 -translate-y-1/2 rotate-45 transform bg-gray-800"></div>
        </div>
      </div>
    ),
    [activeItem, handleItemClick]
  );

  return (
    <div className="mt-4 flex h-[98.5%] w-[100px] flex-col items-center rounded-3xl bg-[var(--color-sidebar-bg)] py-6 shadow-lg">
      {/* Profile link */}
      <Link href="/pages/profile" passHref>
        <div className="mb-8 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full hover:ring-2 hover:ring-gray-400">
          {/* User avatar placeholder */}
          <div className="h-8 w-8 rounded-full bg-gray-500" />
        </div>
      </Link>

      {/* Main menu */}
      <div className="flex flex-1 flex-col">{mainMenuItems.map(renderMenuItem)}</div>

      {/* Separator */}
      <div className="my-4 h-px w-8 bg-gray-600" />

      {/* Bottom menu */}
      <div className="flex flex-col">{bottomMenuItems.map(renderMenuItem)}</div>
    </div>
  );
}

// Memoize Sidebar to avoid unnecessary re-renders
export default React.memo(Sidebar);