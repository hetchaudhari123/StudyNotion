import React from 'react'
import { data } from '../../../data/about-us'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from "../HomePage/Button"
const LearningGrid = () => {
  return (
    <div className='grid grid-cols-1 xl:grid-rows-2  xl:grid-cols-4 '>
    {
        data.map((ele,index) => {
            // Hug (268px) -> h
            // Fill (559px) -> w
            return (index === 0) ? (
                <div key={index} className='  flex flex-col gap-3 xl:col-span-2 justify-start py-3 px-3 '>
              
                    <div className='font-inter text-4xl font-semibold leading-10 tracking-tight text-left text-richblack-5'>
                    {ele.heading}
                    <HighlightText text={"Anyone, Anywhere"}>

                    </HighlightText>
                    </div>
                    <div className='flex flex-col gap-3'>
                        
                        <p className='font-inter text-base font-medium leading-6 text-left text-richblack-300'>
                            {ele.content}
                        </p>
                        {/* width: Fill (559px)px;
height: Hug (84px)px;
padding: 36px 0px 0px 0px;
gap: 24px;
opacity: 0px;
*/}
                        <div className='pt-9 flex flex-col gap-6 w-fit'>
                            <CTAButton active={true} linkto = {"/signup"}>
                                <div className='
                                justify-start font-inter text-base font-bold leading-6 text-center text-richblack-900'>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>) 
                : 
                (
                    
                    <div key={index} className={`flex  flex-col p-8 gap-8 ${(!(index & 1)) ? "bg-richblack-700" : "bg-richblack-800"} ${index === 3 ? ("xl:col-start-2") : ("") }`}>
                    
                        <div className='font-inter text-lg font-semibold leading-7 text-left text-richblack-5'>
                            {
                                ele.heading
                            }
                        </div>
                        {/* //styleName: Text small/Regular;
font-family: Inter;
font-size: 14px;
font-weight: 400;
line-height: 22px;
text-align: left;
*/}
                        <div className='font-inter text-sm font-normal leading-6 text-left text-richblack-100'>
                            {
                                ele.content
                            }
                        </div>
                    </div>
                )
        })
    }
</div>
  )
}

export default LearningGrid