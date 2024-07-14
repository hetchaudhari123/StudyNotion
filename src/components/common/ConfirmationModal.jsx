import React from 'react'
import CTAButton from '../core/HomePage/Button'
const ConfirmationModal = ({text1,text2,setModal,onClickBtn1,onClickBtn2,btn1,btn2,customClassBtn1 = "",customClassBtn2 = ""}) => {
  return (
    <div style={{ backgroundColor: 'rgba(189, 189, 189, 0.9)' }} className={`fixed ("opacity-100")  top-0 left-0 bottom-0 right-0 transition-all duration-200`}>

    <div className='bg-richblack-800 
    flex flex-col gap-6  
    fixed left-1/2 top-1/2 
    translate-x-[-50%] 
    translate-y-[-50%] p-4 
    rounded-lg
    max-w-[450px]'>
            
        <div className='text-richblack-5 font-inter text-3xl font-medium leading-10 text-center'>
            {text1}
        </div>
        <div className='text-richblack-300 font-inter text-sm font-normal leading-5 text-center'>
            {text2}
        </div>
        <div>
            <div className='flex flex-row justify-evenly '>
                <div className=''>

                <CTAButton active={true} onClick={onClickBtn1}
                customClass={`${customClassBtn1}`}>
                    {btn1}
                </CTAButton>
                </div>
                <div className='w-fit h-fit'>
                <CTAButton active={false} onClick={onClickBtn2}
                customClass={`${customClassBtn2}`}>
                    {btn2}
                </CTAButton>
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
    </div>
  )
}

export default ConfirmationModal