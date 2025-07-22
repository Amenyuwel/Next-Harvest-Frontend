import React from "react";
import ClassCard from "./ClassCard";
import AddClassButton from "./AddClassButton";

const ClassGrid = ({ classes, onFileUpload, onAddClass }) => {
  return (
    <div className="relative z-10 pt-16">
      <div className="grid grid-cols-2 gap-6 mb-6">
        {classes.map((cls) => (
          <ClassCard
            key={cls.id}
            classData={cls}
            onFileUpload={onFileUpload}
          />
        ))}
      </div>
      
      <AddClassButton onAddClass={onAddClass} />
    </div>
  );
};

export default ClassGrid;