import React from 'react'
import CTAButton from "../HomePage/Button"
import { useRef } from 'react'
const VideoEndModal = ({onClickPlayNext,onClickMarkAsCompleted,onClickPlayPrev,onClickRewatch,onClickClose,showMarkAsCompleted = true,showPrev = true,showNext = true}) => {
    const data = [
        {onClick:onClickMarkAsCompleted,content:'Mark As Completed',display:showMarkAsCompleted},
        {onClick:onClickPlayPrev,content:'Play Previous',display:showPrev},
        {onClick:onClickRewatch,content:'Rewatch',display:true},
        {onClick:onClickPlayNext,content:'Play Next',display:showNext},
        {onClick:onClickClose,content:'Close',display:true}
    ]

    let evenRef = useRef(false)
  return (
    <div style={{ backgroundColor: 'rgba(189, 189, 189, 0.9)' }} className={`fixed ("opacity-100")  top-0 left-0 bottom-0 right-0 transition-all duration-200`}>

    <div className='bg-richblack-800 
    flex flex-col gap-6  
    items-center
    fixed left-1/2 top-1/2 
    translate-x-[-50%] 
    translate-y-[-50%] p-4 
    rounded-lg
    max-w-[450px]
    '>
    
    {
        data.map((ele,index) => {
            if(ele.display){
                evenRef.current = !evenRef.current;
            }
            return ( 
            
                ele.display && <div key={index} className='w-full text-richblack-300 font-inter text-sm 
            font-normal leading-5 text-center'>
                <div className='w-full '>
                    <CTAButton active={evenRef.current} onClick={ele.onClick}
                    customClass={!evenRef.current && "bg-richblack-700"}>
                        {ele.content}
                    </CTAButton>
                    </div>
            </div>
        )
        })
    }

{/* 

{
            
            <div className='w-full text-richblack-300 font-inter text-sm font-normal leading-5 text-center'>
                <div className='w-full '>
                    <CTAButton active={false} onClick={() => setEndModal(false)}
                    customClass={`bg-richblack-700`}>
                        Mark As Completed
                    </CTAButton>
                    </div>
            </div>
            }

        {

        showPrev &&
        <div className=' text-richblack-5 font-inter text-3xl font-medium leading-10 text-center'>
            <div className='w-full'>
                <CTAButton active={true} onClick={onClickBtn1}
                    customClass={``}>
                    Play Previous
                </CTAButton>
                
            </div>
        </div>
        }
        
        <div className='w-full text-richblack-300 font-inter text-sm font-normal leading-5 text-center'>
            <div className='w-full'>
                <CTAButton active={false} 
                customClass={`bg-richblack-700`}
                onClick={onClickRewatch}>
                    Rewatch
                </CTAButton>
                </div>
        </div>
        {
            showNext &&
        <div className='w-full text-richblack-300 font-inter text-sm font-normal leading-5 text-center'>
            <div className='w-full '>
                <CTAButton active={true} onClick={onClickBtn2}
                customClass={``}>
                    Play Next
                </CTAButton>
                </div>
        </div>
        }
        {
            
        <div className='w-full text-richblack-300 font-inter text-sm font-normal leading-5 text-center'>
            <div className='w-full '>
                <CTAButton active={false} onClick={() => setEndModal(false)}
                customClass={`bg-richblack-700`}>
                    Close
                </CTAButton>
                </div>
        </div>
        } */}
        {/* <div>
     
            <div className='flex flex-row gap-4 justify-evenly'>
                <div className=''>

                <CTAButton active={true} onClick={onClickBtn1}
                customClass={``}>
                    {btn1}
                </CTAButton>
                </div>
                <div className='w-fit h-fit'>
                <CTAButton active={false} onClick={onClickBtn2}
                customClass={``}>
                    {btn2}
                </CTAButton>
                </div>
            </div>
            <div>

            </div>
        </div> */}
    </div>
    </div>
  )
}

export default VideoEndModal