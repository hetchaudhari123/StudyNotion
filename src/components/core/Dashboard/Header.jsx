import React from 'react'

const Header = ({text1,text2,customClass=""}) => {
  return (
    <div className={`flex flex-col py-6 px-6 gap-6 w-full ${customClass}`}>
        <div className=' flex flex-col gap-3'>
            <div className='flex flex-row gap-2'>
               
                <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-300'>Home</div>
             
                <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-600'>/</div>
                <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-300'>Dashboard</div>
                <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-600'>/</div>
                <div className='font-inter text-sm font-medium leading-6 text-left text-yellow-50'>{text1}</div>
            </div>
         
            <div className='font-inter text-3xl font-medium leading-10 text-left text-richblack-5'>
                    {text2}
            </div>
        </div>
    </div>
  )
}

export default Header