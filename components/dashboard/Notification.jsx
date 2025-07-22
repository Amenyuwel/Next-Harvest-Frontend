import React from "react";
import { Icon } from "@iconify/react";
import { notifications } from "@/assets/dummydata";

const NotificationColumn = () => (
  <div className="bg-transparent w-full h-full overflow-hidden">
    <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-black">Notifications</h2>
    <div className="flex flex-col gap-2 sm:gap-3 h-full max-h-[390px] overflow-y-auto scrollbar-hide">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="flex items-center bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 gap-3 sm:gap-4 md:gap-6 shadow-sm hover:shadow-md transition-shadow "
        >
          {/* Icon container - responsive sizing */}
          <div 
            className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex-shrink-0"
            style={{ backgroundColor: n.iconBg }}
          >
            <Icon
              icon={n.icon}
              width="20"
              height="20"
              className="text-[var(--color-text-primary)] sm:w-6 sm:h-6 md:w-10 md:h-10"
            />
          </div>
          
          {/* Content container */}
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm sm:text-base md:text-lg text-black truncate">{n.title}</div>
            <div className="text-gray-600 text-xs sm:text-sm md:text-base truncate">{n.subtitle}</div>
            <div className="font-bold text-black text-sm sm:text-base md:text-lg mt-1 sm:mt-2">{n.date}</div>
          </div>
          
          {/* Tag - responsive sizing */}
          <span 
            className="text-xs sm:text-sm font-semibold rounded-full px-2 sm:px-3 py-1 whitespace-nowrap flex-shrink-0"
            style={{ backgroundColor: n.tagBg, color: n.tagColor }}
          >
            {n.tag}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationColumn;