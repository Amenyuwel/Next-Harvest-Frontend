"use client";
import React from 'react';
import Reports from './components/Reports';
import UploadImages from './components/UploadImages';

function TrainPage() {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 px-6 pb-6 overflow-hidden">
      {/* Reports - Left Side */}
      <div className="w-full lg:w-[400px] xl:w-[450px] lg:flex-shrink-0 overflow-y-auto">
        <Reports />
      </div>

      {/* Upload Images - Right Side */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow">
        <UploadImages />
      </div>
    </div>
  );
}

export default TrainPage;