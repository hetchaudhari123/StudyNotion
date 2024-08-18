import React from 'react'
import { BsPeopleFill } from "react-icons/bs";
import { RiOrganizationChart } from "react-icons/ri";
export default function CourseCard({ courses, setSelectedCourse, selectedCourse }) {
    return (
        courses.map((ele, index) => {
            return (


                <div key={index} onClick={() => setSelectedCourse(ele)} className={`  w-[360px] cursor-pointer transition-all duration-300 group flex flex-col gap-9 justify-between  ${ele === selectedCourse ? "course-selected-shadow hover:bg-[#F1F2FF] bg-white" : "hover:bg-richblack-5 bg-richblack-800"} `}>
                    <div className='pt-8 pr-6 pb-12 pl-6 flex flex-col gap-3'>

                        <div className={`font-inter text-xl font-semibold leading-7 text-left
                            ${ele !== selectedCourse ? "text-richblack-25 group-hover:text-[#161D29]" : " text-[#161D29]"}  `}>
                            {ele.heading}
                        </div>
                        <div className={`font-inter text-base font-normal leading-6 text-left text-richblack-500   ${ele !== selectedCourse ? "text-[#6E727F] group-hover:text-[#585D69]" : "text-[#585D69]"}`}>
                            {ele.description}
                        </div>
                    </div>

                    <div className={`flex justify-between py-4 px-6 gap-4 border-t 
        border-dashed   ${ele !== selectedCourse ? "text-richblack-300 border-richblack-600 group-hover:text-richblue-500 group-hover:border-richblack-50 " : " text-blue-500 border-richblack-50"}  : `}>

                        <div className='font-inter text-base font-medium leading-6 text-center '>
                            <div className='flex gap-2 items-center '>


                                <BsPeopleFill />

                                {ele.level}
                            </div>
                        </div>
                        <div>


                            <div className=' flex items-center gap-2'>
                                <div>
                                    <RiOrganizationChart />
                                </div>
                                <div className='font-inter text-base font-medium leading-6 text-center  flex gap-2'>
                                    <div>

                                        {ele.lessionNumber}
                                    </div>
                                    <div>

                                        Lessons
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}
