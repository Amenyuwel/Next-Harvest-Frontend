import React from "react";
import { Icon } from "@iconify/react";

const AddClassButton = ({ onAddClass }) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onAddClass}
        className="border-2 border-dashed border-gray-300 rounded-xl p-4 w-full max-w-xs flex items-center justify-center hover:border-gray-400 transition-colors"
      >
        <Icon icon="mdi:plus" width="20" height="20" className="text-gray-500 mr-2" />
        <span className="text-sm text-gray-500">Add class</span>
      </button>
    </div>
  );
};

export default AddClassButton;