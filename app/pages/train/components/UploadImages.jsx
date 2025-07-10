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
    <div className=" p-4 sm:p-6 h-full flex flex-col mb-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-black">Upload Images</h2>
          <Icon icon="material-symbols:upload" width="24" height="24" className="text-gray-500" />
        </div>
      </div>

      {/* Training Section */}
      <TrainingSection 
        isTraining={isTraining}
        onTrainModel={handleTrainModel}
      />

      {/* Connection Lines and Classes Container */}
      <div className="relative flex-1 -mt-2">
        <ConnectionLines />
        <ClassGrid 
          classes={classes}
          onFileUpload={handleFileUpload}
          onAddClass={addClass}
        />
      </div>
    </div>
  );
};

export default UploadImages;