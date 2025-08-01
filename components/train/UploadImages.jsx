import React, { useState } from "react";
import { Icon } from "@iconify/react";
import TrainingSection from "./TrainingSection";
import ClassGrid from "./ClassGrid";
import ConnectionLines from "./ConnectionLines";

const UploadImages = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [classes, setClasses] = useState([
    { id: 1, name: "Class 1", files: [] },
    { id: 2, name: "Class 1", files: [] },
    { id: 3, name: "Class 1", files: [] },
    { id: 4, name: "Class 1", files: [] },
  ]);

  const handleTrainModel = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
    }, 3000);
  };

  const handleFileUpload = (classId, files) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === classId ? { ...cls, files: [...cls.files, ...files] } : cls
      )
    );
  };

  const addClass = () => {
    const newClass = {
      id: classes.length + 1,
      name: `Class ${classes.length + 1}`,
      files: [],
    };
    setClasses([...classes, newClass]);
  };

  return (
    <section
      className="bg-white rounded-2xl shadow h-full w-full flex flex-col overflow-x-hidden"
      aria-label="Model training interface"
    >
      {/* Header */}
      <header className="flex-shrink-0 px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Model Training</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0 px-4 pb-4 flex flex-col">
        {/* Training Controls */}
        <section className="mb-4 mt-4 flex-shrink-0" aria-labelledby="training-controls">
          <h3 id="training-controls" className="sr-only">
            Training Controls
          </h3>
          <TrainingSection
            isTraining={isTraining}
            onTrainModel={handleTrainModel}
          />
        </section>

        {/* Class Management */}
        <section
          className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
          aria-labelledby="class-management"
        >
          <h3 id="class-management" className="sr-only">
            Training Class Management
          </h3>
          <div className="relative min-h-full">
            <ConnectionLines />
            <ClassGrid
              classes={classes}
              onFileUpload={handleFileUpload}
              onAddClass={addClass}
            />
          </div>
        </section>
      </main>
    </section>
  );
};

export default UploadImages;
