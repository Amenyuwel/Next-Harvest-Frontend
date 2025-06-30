import React from 'react'
import LeftForm from './components/left_Form'
import RightImage from './components/right_Image'

function page() {
  return (
    <div className='w-screen h-screen flex items-center bg-black-400 justify-center p-4 sm:p-6 lg:p-20'>
      <div className='bg-[#FEFEFE] rounded-3xl shadow-2xl overflow-hidden max-w-7xl w-full h-full sm:h-[600px] lg:h-[900px] flex flex-col lg:flex-row p-4 sm:p-6 lg:p-10 gap-4 lg:gap-10'>
        <LeftForm />
        <RightImage />
      </div>
    </div>
  )
}

export default page