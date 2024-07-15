import React from 'react'
import { useSelector } from 'react-redux'
import { MdOutlineDone } from "react-icons/md";
const RenderSteps = () => {
    const steps = [
        {
            id: 1,
            name: 'Course Information'
        },
        {
            id: 2,
            name: 'Course Builder'
        },
        {
            id: 3,
            name: 'Publish'
        }
    ]
    const { courseStep } = useSelector(state => state.course);
    const completedStep = (id) => {
        return id < courseStep;
    }
    const matchStep = (id) => {
        return id === courseStep;
    }
    return (
        <div className=' flex flex-col items-center gap-4 mx-auto md:ml-4 md:flex-row md:gap-0.5'>
            {
                steps.map((ele, index) => (
                    <div key={ele.id} className='w-full md:w-[220px]   flex flex-col justify-between items-center gap-2'>

                        <div className=' flex justify-center items-center p-0.5 gap-2.5 w-fit'>
                            {/* border: 1px solid #2C333F */}
                            {/* background: #161D29;
 */}
                            {(!completedStep(ele.id)) ?
                                (<div className={`border ${(matchStep(ele.id)) ? "border-yellow-50 bg-yellow-900 text-yellow-50" : "border-richblack-700 bg-richblack-800 text-richblack-300"} h-[34px] flex justify-center items-center aspect-square rounded-[200px] `}>
                                    {/*  */}
                                    <div className=' font-inter
                            text-lg font-semibold  flex justify-center items-center leading-7 text-center '>
                                        {ele.id}
                                    </div>
                                </div>
                                ) :
                                (
                                    <div className={` bg-yellow-50 h-[34px] flex justify-center items-center aspect-square rounded-[200px] `}>
                                        {/*  */}
                                        <div className=' font-inter
                            text-lg font-semibold  flex justify-center items-center leading-7 text-center '>
                                            <MdOutlineDone />
                                        </div>
                                    </div>
                                )

                            }
                           
                        </div>

                        <div className=' text-richblack-5 font-inter
                    text-sm font-normal leading-6 text-left'>
                            {ele.name}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderSteps