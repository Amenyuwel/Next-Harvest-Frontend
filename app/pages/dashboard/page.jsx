"use client";
import React from "react";
import Sidebar from "./components/Sidebar";

const DashboardPage = () => {
  return <main className="bg-whitew-full h-screen p-10">
    <div className='bg-[#F3F3F3] rounded-3xl shadow-2xl overflow-hidden  w-full h-full flex flex-col lg:flex-row p-4 sm:p-6 lg:px-20 gap-4 lg:gap-10'>
   <Sidebar/>  
      </div>
   
   </main>;
};

export default DashboardPage;
