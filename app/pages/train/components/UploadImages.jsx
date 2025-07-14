import React, { useState } from "react";
import { Icon } from "@iconify/react";
import TrainingSection from "./uploadimage/TrainingSection";
import ClassGrid from "./uploadimage/ClassGrid";
import ConnectionLines from "./uploadimage/ConnectionLines";

const UploadImages = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [classes, setClasses] = useState([
    { id: 1, name: "Class 1", files: [] },
    { id: 2, name: "Class 1", files: [] },
    { id: 3, name: "Class 1", files: [] },
    { id: 4, name: "Class 1", files: [] }
  ]);

  const handleTrainModel = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
    }, 3000);
  };

  const handleFileUpload = (classId, files) => {
    setClasses(prev => prev.map(cls => 
      cls.id === classId ? { ...cls, files: [...cls.files, ...files] } : cls
    ));
  };

  const addClass = () => {
    const newClass = {
      id: classes.length + 1,
      name: `Class ${classes.length + 1}`,
      files: []
    };
    setClasses([...classes, newClass]);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 px-6 py-4 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-black">Upload Images</h2>
            <Icon icon="material-symbols:upload" width="24" height="24" className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Scrollable Content - Hidden Scrollbar */}
      <div className="flex-1 overflow-auto px-6 pb-6 scrollbar-hide">
        {/* Training Section */}
        <div className="mb-6">
          <TrainingSection 
            isTraining={isTraining}
            onTrainModel={handleTrainModel}
          />
        </div>

        {/* Connection Lines and Classes Container - Increased height */}
        <div className="relative min-h-[800px] lg:min-h-[1000px]">
          <ConnectionLines />
          <ClassGrid 
            classes={classes}
            onFileUpload={handleFileUpload}
            onAddClass={addClass}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadImages;