"use client";
import React from "react";
import { Icon } from "@iconify/react";

const ProfileNotifications = () => {
  const profileNotifications = [
    {
      id: 1,
      title: "Pest Detected",
      subtitle: "Rice field area A-3 has pest activity",
      date: "May 13",
      tag: "Alert",
      tagBg: "#fef3c7",
      tagColor: "#d97706",
      icon: "mdi:bug",
      iconBg: "#fef3c7",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl p-6 bg-white shadow-sm">
      <h2 className="mb-4 flex-shrink-0 text-lg font-bold text-black">
        Profile Notifications
      </h2>
      <div
        className="scrollbar-hide flex flex-1 flex-col gap-3 overflow-y-auto"
        role="list"
        aria-label="Profile notifications"
      >
        {profileNotifications.map((n) => (
          <article
            key={n.id}
            className="flex flex-shrink-0 items-center gap-3 rounded-3xl bg-[var(--color-background-off-white)] p-4 shadow-sm transition-shadow hover:shadow-md"
            role="listitem"
            aria-labelledby={`notification-title-${n.id}`}
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-3xl"
              style={{ backgroundColor: n.iconBg }}
              aria-hidden="true"
            >
              <Icon
                icon={n.icon}
                width="16"
                height="16"
                className="text-[var(--color-text-primary)]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3
                id={`notification-title-${n.id}`}
                className="truncate text-sm leading-tight font-semibold text-black"
              >
                {n.title}
              </h3>
              <p className="mt-0.5 truncate text-xs leading-relaxed text-gray-500">
                {n.subtitle}
              </p>
              <time className="mt-1 block text-xs font-medium text-gray-700">
                {n.date}
              </time>
            </div>

            <span
              className="flex-shrink-0 rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap"
              style={{ backgroundColor: n.tagBg, color: n.tagColor }}
              role="status"
              aria-label={`Status: ${n.tag}`}
            >
              {n.tag}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProfileNotifications;