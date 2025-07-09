"use client";
import React from 'react';
import Reports from './components/Reports';
import UploadImages from './components/UploadImages';
import { Icon } from '@iconify/react';

function TrainPage() {
  return (
    <main className="w-full h-full p-4 sm:p-6 overflow-hidden">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">Train Model</h1>
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            Preview model 
            <Icon icon="octicon:ai-model-16" width="16" height="16" className="text-white" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
          {/* Reports - Left Side */}
          <div className="w-full lg:w-[400px] xl:w-[450px] lg:flex-shrink-0 overflow-y-auto">
            <Reports />
          </div>

          {/* Upload Images - Right Side */}
          <div className="flex-1 bg-white rounded-2xl sm:rounded-3xl shadow p-5 overflow-y-auto">
            <UploadImages />
          </div>
        </div>
      </div>
    </main>
  );
}

export default TrainPage;