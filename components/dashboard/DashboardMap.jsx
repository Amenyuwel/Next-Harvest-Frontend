"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const DashboardMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapSrc, setMapSrc] = useState(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL,
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const encodedQuery = encodeURIComponent(searchQuery);
    setMapSrc(`https://www.google.com/maps?q=${encodedQuery}&output=embed`);
  };

  return (
    <>
      {/* Main map section */}
      <section className="flex h-full w-full flex-col rounded-2xl bg-white p-4 shadow">
        <header className="mb-3 flex flex-shrink-0 items-center justify-between">
          <h2 className="p-2 text-lg font-bold text-[var(--color-text-primary)]">Map</h2>
          <button
            onClick={() => setIsExpanded(true)}
            className="flex cursor-pointer items-center gap-1 text-sm text-blue-500 hover:underline"
            alt="Expand map"
            title="Expand map"
          >
            <Icon icon="mdi:arrow-expand" width="18" height="18" />
          </button>
        </header>

        <div className="p-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search place or lat,long"
              className="w-60 rounded-lg border border-gray-200 py-2.5 pr-4 pl-10 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <svg
              className="absolute top-3 left-3 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col rounded-xl bg-[var(--color-background-off-white)] p-3">
          <iframe
            title="Interactive map showing farm field locations"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "8px" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrc}
            aria-label="Map of farm locations"
          ></iframe>
        </div>
      </section>

      {/* Modal for enlarged map */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative h-full w-full">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 z-50 cursor-pointer rounded bg-white px-3 py-1 text-sm font-medium text-black hover:bg-gray-200"
            >
              Close
            </button>
            <iframe
              title="Full-screen map"
              src={mapSrc}
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardMap;
