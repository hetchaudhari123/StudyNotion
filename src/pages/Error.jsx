{/* flex flex-1 text-3xl flex-col gap-3 text-red justify-center items-center xs:min-h-screen w-full text-richblack-5 text-center */ }
import React from 'react'
import CTAButton from '../components/core/HomePage/Button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
const Error = () => {
    const navigate = useNavigate();
    return (
        <div className='text-3xl flex flex-col flex-1 gap-3 justify-center items-center w-full text-richblack-5 text-center z-10'>
                <div>Error 404 - Page Not Found</div>
            {/* <div className='flex flex-col gap-3 justify-center items-center text-center'> */}
                {/* <div className='flex justify-between border-2 border-white w-[50rem] py-[2rem] px-[2rem]'> */}
                <div className='mt-6 flex items-center justify-center gap-4 min-w-[400px] flex-col sm:flex-row'>
                    <div className='w-[200px]'>

                        <CTAButton active={true} linkto={"/"}>
                            <div className='flex items-center justify-center font-semibold gap-2  text-richblack-900'>
                                <div><FaArrowLeft /></div>
                                {/* w-[50%] xs:w-full rounded-[8px] bg-yellow-50 py-[12px] px-5 font-medium text-richblack-900 */}
                                <div>Back to Home</div>
                            </div>
                        </CTAButton>
                    </div>
                    <div className='w-[200px]'>
                        <CTAButton active={true} onClick={() => navigate(-1)}>
                            <div className='flex justify-center items-center gap-2 font-semibold text-richblack-900 ' >
                                <div><FaArrowLeft /></div>
                                <div>Go Back</div>
                            </div>
                        </CTAButton>

                    </div>
                </div>
                {/* position: fixed; z-index: 9999; inset: 16px; pointer-events: none; */}
            {/* </div> */}
        </div>

    )
}

export default Error