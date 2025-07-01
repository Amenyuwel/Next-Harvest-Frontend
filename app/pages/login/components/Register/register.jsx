import React from 'react'
import { Icon } from '@iconify/react'

function Register({ onBackToLogin }) {
  return (
    <div className='max-w-sm mx-auto w-full h-full flex flex-col justify-center'>
      <div className='text-center mb-6 sm:mb-8'>
        <h1 className='text-[#019601] text-xl sm:text-2xl font-bold mb-2'>Harvest Assistant</h1>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-1'>Your farming journey</h2>
        <h3 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8'>Starts here</h3>
      </div>
      
      {/* Name Fields Row */}
      <div className='flex gap-4 mb-4'>
        <div className='flex-1'>
          <input 
            type="text" 
            className='w-full px-4 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base text-black'
            placeholder="Firstname"
          />
        </div>
        <div className='w-20'>
          <select className='w-full px-3 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base text-black'>
            <option>M.I</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
      </div>
      
      {/* Last Name and Age Row */}
      <div className='flex gap-4 mb-4'>
        <div className='flex-1'>
          <input 
            type="text" 
            className='w-full px-4 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base text-black'
            placeholder="Lastname"
          />
        </div>
        <div className='w-20'>
          <input 
            type="number" 
            className='w-full px-3 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base text-black'
            placeholder="Age"
          />
        </div>
      </div>
      
      {/* Email Input */}
      <div className='mb-4'>
        <input 
          type="email" 
          className='w-full px-4 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base text-black'
          placeholder="Email"
        />
      </div>
      
      {/* Create Password Input */}
      <div className='mb-4'>
        <input 
          type="password" 
          className='w-full px-4 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base text-black'
          placeholder="Create password"
        />
      </div>
      
      {/* Confirm Password Input */}
      <div className='mb-6'>
        <div className='relative'>
          <input 
            type="password" 
            className='w-full px-4 pr-12 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base text-black'
            placeholder="Confirm password"
          />
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
            <Icon icon="mdi:eye-outline" width="20" height="20" className="text-gray-500 cursor-pointer" />
          </div>
        </div>
      </div>
      
      {/* Next Button */}
      <button className='w-full bg-black text-white py-3 sm:py-4 rounded-3xl font-medium mb-4 hover:bg-gray-800 transition duration-200 text-sm sm:text-base'>
        Next
      </button>
      
      {/* Log In Link */}
      <p className='text-center text-xs sm:text-sm text-gray-600'>
        Already have an account? <span 
          className='font-medium text-black cursor-pointer hover:underline' 
          onClick={onBackToLogin}
        >
          Log in
        </span>
      </p>
    </div>
  )
}

export default Register