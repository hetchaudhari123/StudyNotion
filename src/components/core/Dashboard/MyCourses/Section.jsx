import React from 'react'
import SectionForm from './SectionForm'
const Section = () => {
  return (
    <div style={{ boxShadow: '0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset' }}
    className='flex flex-col bg-richblack-800 p-6 gap-7 rounded-lg '>
   
        <div className='font-inter text-2xl font-semibold leading-8
        text-left text-richblack-5'>
        Course Builder
        </div>
        <div className='gap-1.5 flex'>
            {/* Form */}
            <SectionForm/>
        </div>
     
      
    </div>
  )
}

export default Section