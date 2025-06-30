import React from 'react'
import { Icon } from '@iconify/react'

function LeftForm() {
  return (
    <div className='w-full lg:w-1/2 bg-[#E6E6E6] rounded-3xl p-6 sm:p-12 lg:p-20 flex flex-col justify-center'>
      <div className='max-w-sm mx-auto w-full'>
       <div className='text-center mb-6 sm:mb-8'>
         <h1 className='text-[#019601] text-xl sm:text-2xl font-bold mb-2'>Harvest Assistant</h1>
        <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-1'>Your farming journey</h2>
        <h3 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8'>Starts here</h3>
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
              className='w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base'
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
              className='w-full pl-12 pr-12 py-3 sm:py-4 bg-white rounded-3xl border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base'
              placeholder="Password"
            />
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <Icon icon="mdi:eye-outline" width="20" height="20" className="text-gray-500 cursor-pointer" />
            </div>
          </div>
        </div>
        
        {/* Login Button */}
        <button className='w-full bg-black text-white py-3 sm:py-4 rounded-3xl font-medium mb-4 hover:bg-gray-800 transition duration-200 text-sm sm:text-base'>
          Log in
        </button>
        
        {/* Sign Up Link */}
        <p className='text-center text-xs sm:text-sm text-gray-600'>
          Already have an account? <span className='font-medium text-black cursor-pointer'>Sign Up</span>
        </p>
      </div>
    </div>
  )
}

export default LeftForm