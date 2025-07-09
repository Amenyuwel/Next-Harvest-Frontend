import React from "react";
import { Icon } from "@iconify/react";

const TrainingSection = ({ isTraining, onTrainModel }) => {
  return (
    <div className="bg-[#F4FFB3] rounded-2xl p-4 mb-0 relative z-10">
      <h3 className="text-lg font-semibold text-black mb-4">Training</h3>
      
      <button
        onClick={onTrainModel}
        disabled={isTraining}
        className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
          isTraining 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        {isTraining ? 'Training...' : 'Train model'}
      </button>

      {/* Division line */}
      <div className="w-full h-[2px] bg-gray-300 my-6"></div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Advanced</span>
        <Icon icon="mdi:chevron-down" width="20" height="20" className="text-gray-500" />
      </div>
    </div>
  );
};

export default TrainingSection;