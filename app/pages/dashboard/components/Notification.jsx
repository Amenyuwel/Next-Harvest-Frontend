import React from "react";
import { Icon } from "@iconify/react";

const notifications = [
  {
    title: "Pest Detected",
    subtitle: "Rice Field",
    date: "May 13",
    tag: "last 2 days",
  },
  {
    title: "Pest Detected",
    subtitle: "Rice Field",
    date: "May 13",
    tag: "last 2 days",
  },
  {
    title: "Pest Detected",
    subtitle: "Rice Field",
    date: "May 13",
    tag: "last 2 days",
  },
];

const NotificationColumn = () => (
  <div className="bg-transparent w-full max-w-lg">
    <h2 className="text-2xl font-bold mb-4 text-black">Notifications</h2>
    <div className="flex flex-col gap-6">
      {notifications.map((n, i) => (
        <div
          key={i}
          className="flex items-center bg-white rounded-[28px] p-6 gap-6 shadow"
          style={{ borderRadius: "24px" }}
        >
          <div className="flex items-center justify-center w-20 h-20 bg-[#DDF5D6] rounded-[16px]">
            <Icon
              icon="solar:bug-bold"
              width="40"
              height="40"
              className="text-[#404040]"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-lg text-black">{n.title}</div>
            <div className="text-gray-600 text-base">{n.subtitle}</div>
            <div className="font-bold text-black text-lg mt-2">{n.date}</div>
          </div>
          <span className="bg-[#FFE6B2] text-[#FF9900] text-xs font-semibold rounded-full px-3 py-1 ml-2 whitespace-nowrap">
            {n.tag}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default NotificationColumn;
