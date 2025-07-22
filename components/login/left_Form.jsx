"use client";
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import Register from './register'


function LeftForm() {
  const [showRegister, setShowRegister] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    // Add your login logic here (API call, validation, etc.)
    // For now, we'll redirect directly to dashboard
    router.push('/pages/dashboard')
  }

  return (
    <div className='w-full lg:w-1/2 bg-[var(--color-background-light-gray)] rounded-3xl p-6 sm:p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden'>
      <div className='relative w-full h-full'>
        {/* Login Form */}
        <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
          showRegister ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}>
          <div className='max-w-sm mx-auto w-full h-full flex flex-col justify-center'>
            <div className='text-center mb-6 sm:mb-8'>
              <h1 className='text-[var(--color-primary)] text-xl sm:text-2xl font-lato font-bold mb-2'>Harvest Assistant</h1>
              <h2 className='text-2xl sm:text-3xl font-lato font-bold text-gray-800 mb-1'>Your farming journey</h2>
              <h3 className='text-2xl sm:text-3xl font-lato font-bold text-gray-800 mb-6 sm:mb-8'>Starts here</h3>
            </div>
            
            {/* Social Login Icons */}
            <div className='flex gap-4 mb-6 sm:mb-8 justify-center'>
              <div className='w-12 h-12 bg-white rounded-3xl flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-shadow'>
                <Icon icon="logos:google-icon" width="24" height="24" />
              </div>
              <div className='w-12 h-12 bg-white rounded-3xl flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-shadow'>
                <Icon icon="logos:facebook" width="24" height="24" />
              </div>
            </div>
            
            {/* Email Input */}
            <div className='mb-4'>
              <div className='relative'>
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
                  <Icon icon="mdi:email-outline" width="20" height="20" className="text-gray-500" />
                </div>
                <input 
                  type="email" 
                  className='w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base text-black font-lato'
                  placeholder="Email"
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className='mb-6'>
              <div className='relative'>
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
                  <Icon icon="mdi:lock-outline" width="20" height="20" className="text-gray-500" />
                </div>
                <input 
                  type="password" 
                  className='w-full pl-12 pr-12 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base text-black font-lato'
                  placeholder="Password"
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <Icon icon="mdi:eye-outline" width="20" height="20" className="text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
            
            {/* Login Button */}
            <button 
              onClick={handleLogin}
              className='w-full bg-black text-white py-3 sm:py-4 rounded-3xl font-lato font-medium mb-4 hover:bg-gray-800 transition duration-200 text-sm sm:text-base'
            >
              Log in
            </button>
            
            {/* Sign Up Link */}
            <p className='text-center text-xs sm:text-sm text-gray-600 font-lato'>
              Don't have an account? <span 
                className='font-medium text-black cursor-pointer hover:underline font-lato' 
                onClick={() => setShowRegister(true)}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* Register Form */}
        <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${
          showRegister ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <Register onBackToLogin={() => setShowRegister(false)} />
        </div>
      </div>
    </div>
  )
}

export default LeftForm