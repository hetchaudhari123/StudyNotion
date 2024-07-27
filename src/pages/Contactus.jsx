import React from 'react'
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import { FaGlobeAfrica } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Form from '../components/common/Form';
import ReviewSlider from '../components/common/ReviewSlider';
import Reviews from '../components/common/Reviews';
const data = [
    {
        heading: "Chat on us",
        content: "Our friendly team is here to help.",
        footer: "@mail address",
        icon: <HiChatBubbleLeftEllipsis />
    },
    {
        heading: "Visit us",
        content: "Come and say hello at our office HQ.",
        footer: "Here is the location/ address",
        icon: <FaGlobeAfrica />
    },
    {
        heading: "Call us",
        content: "Mon - Fri From 8am to 5pm",
        footer: "+123 456 7890",
        icon: <FaPhoneAlt />
    }
]
const Contactus = () => {

    return (
        // 
        <div className=''>
        <div className='px-2 py-4 md:py-24 md:px-32 gap-14 flex flex-col xl:flex-row justify-center'>

            <div className='flex flex-col h-fit  py-6 gap-6 rounded-xl bg-richblack-800 w-fit mx-auto'>
                {
                    data.map((ele, index) => {
                        return (

                            <div key={index} className='flex flex-row gap-2 p-3 '>
                                <div className='mt-1 flex flex-col justify-start  text-richblack-5'>
                                    {ele.icon}
                                </div>
                                <div className='flex flex-col gap-1'>

                                    <div className='font-inter text-lg font-semibold 
                                        leading-7 text-left 
                                        text-richblack-5'>
                                        {ele.heading}
                                    </div>

                                    <div className='text-richblack-200 font-inter text-sm font-medium leading-6 text-left'>
                                        {ele.content}
                                    </div>
                                    <div className='font-inter text-richblack-200 text-sm font-semibold leading-6 text-left'>
                                        {ele.footer}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
          {/* border: 1px solid #424854 */}
            <div className='flex flex-col p-14 gap-8 rounded-xl border border-richblack-600'>
                <div className='flex flex-col gap-14'>
                  
                    <div className='font-inter text-4xl font-semibold leading-10 tracking-tight text-left text-richblack-5'>
                        Got a Idea? We've got the skills. Let's team up
                    </div>
                    
                    <div className='flex gap-3 font-inter text-base font-medium leading-6 text-left text-richblack-300'>
                        Tall us more about yourself and what you're got in mind.
                    </div>
                </div>
                <div>
                <Form padding={false}></Form>
                </div>
                
            </div>
            
        </div>
        {/* <div className="p-20 flex flex-col gap-20">
                <div className="flex flex-row justify-center text-richblack-5 font-inter text-4xl font-semibold leading-10 tracking-tight text-left w-full  ">
                    Reviews from other learners
                </div>
                <ReviewSlider></ReviewSlider>
            </div> */}
            <Reviews></Reviews>
        </div>
    )
}

export default Contactus