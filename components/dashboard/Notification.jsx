import React from "react";
import { Icon } from "@iconify/react";
import { notifications } from "@/assets/dummydata";

const NotificationColumn = () => (
  <div className="bg-white rounded-2xl shadow p-4 h-full w-full overflow-hidden flex flex-col">
    <h2 className="text-lg font-bold mb-3 text-black flex-shrink-0">Notifications</h2>
    <div className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide" role="list" aria-label="Recent notifications">
      {notifications.map((n) => (
        <article
          key={n.id}
          className="flex items-center bg-[var(--color-background-off-white)] rounded-lg p-3 gap-3 shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
          role="listitem"
          aria-labelledby={`notification-title-${n.id}`}
        >
          {/* Icon container */}
          <div 
            className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
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
          
          {/* Content container */}
          <div className="flex-1 min-w-0">
            <h3 
              id={`notification-title-${n.id}`}
              className="font-semibold text-sm text-black truncate leading-tight"
            >
              {n.title}
            </h3>
            <p className="text-gray-500 text-xs truncate mt-0.5 leading-relaxed">{n.subtitle}</p>
            <time className="text-gray-700 text-xs font-medium mt-1 block">{n.date}</time>
          </div>
          
          {/* Tag - semantic badge */}
          <span 
            className="text-xs font-semibold rounded-full px-2 py-1 whitespace-nowrap flex-shrink-0"
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

export default NotificationColumn;