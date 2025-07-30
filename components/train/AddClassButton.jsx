import React from "react";
import { Icon } from "@iconify/react";

const AddClassButton = ({ onAddClass }) => {
  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={onAddClass}
        className="flex w-full max-w-xs items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-gray-400"
      >
        <Icon
          icon="mdi:plus"
          width="20"
          height="20"
          className="mr-2 text-gray-500"
        />
        <span className="text-sm text-gray-500">Add class</span>
      </button>
    </div>
  );
};

export default AddClassButton;
