// app/pages/layout.js
"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import GlobalHeader from "@/components/GlobalHeader";
import routeConfig from "@/app/config/routeConfig";

export default function PagesLayout({ children }) {
  const pathname = usePathname();

  const headerConfig = routeConfig[pathname] || {
    title: "Page",
    showAddButton: false,
    addButtonText: "",
    onAddClick: () => {},
  };

  return (
    <div className="flex h-screen bg-[var(--color-sidebar-bg)] p-4">
      <div className="flex h-full w-full overflow-hidden rounded-3xl bg-[var(--color-background-gray)] shadow-sm">
        <div className="flex-shrink-0 p-4">
          <Sidebar />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-shrink-0">
            <GlobalHeader {...headerConfig} showProfile />
          </div>

          <div className="flex-1 overflow-auto p-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
