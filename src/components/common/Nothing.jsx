import React from 'react'
import HighlightText from '../core/HomePage/HighlightText'
const Nothing = ({text}) => {
  return (
    <div className='  flex flex-col gap-4 justify-center 
                items-center h-full  '>
                <div className=''>
                <HighlightText text={text} customClass={"text-4xl"}></HighlightText>
                </div>
                {/* TO IMPLEMENT THE FOLLOWING FUNCTIONALITY-> */}
                {/* <div className='w-fit h-fit'>
                
                    <CTAButton active={true} linkto={'/dashboard'}>
                        <div className='text-richblack-900 font-inter text-base font-medium leading-6 text-center '>
                            Explore Courses
                        </div>
                    </CTAButton>
                </div> */}
            </div>
  )
}

export default Nothing