"use client";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import { useMemo } from "react";
import routeConfig from "@/app/config/routeConfig";

export default function PagesLayout({ children }) {
  const pathname = usePathname();

  const headerConfig = useMemo(() => {
    return (
      routeConfig[pathname] || {
        title: "Page",
        showAddButton: false,
        addButtonText: "",
        onAddClick: () => {},
      }
    );
  }, [pathname]);

  return (
    <div className="flex h-screen bg-[var(--color-sidebar-bg)] p-4">
      <div className="flex h-full w-full overflow-hidden rounded-3xl bg-[var(--color-background-gray)] shadow-sm">
        {/* Sidebar */}
        <div className="flex-shrink-0 p-4">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0">
            <GlobalHeader
              title={headerConfig.title}
              showAddButton={headerConfig.showAddButton}
              addButtonText={headerConfig.addButtonText}
              onAddClick={headerConfig.onAddClick}
              showProfile={pathname !== '/pages/profile'}
            />
          </div>

          {/* Page content with animation */}
          <div className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
