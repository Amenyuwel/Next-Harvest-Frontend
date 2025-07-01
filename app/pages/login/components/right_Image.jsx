"use client";
import React, { useState, useEffect } from 'react'

function RightImage() {
  const images = [
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='hidden lg:block w-1/2 bg-cover bg-center rounded-3xl transition-all duration-1000 ease-in-out' 
         style={{
           backgroundImage: `url('${images[currentImageIndex]}')`
         }}>
      <div className='w-full h-full bg-gradient-to-r from-transparent to-black/20 rounded-3xl'></div>
    </div>
  )
}

export default RightImage