import React from 'react'

const CourseTips = () => {
    const tips = [
        {
            text: "Set the Course Price option or make it free."
        },
        {
            text: "Standard size for the course thumbnail is 1024x576."
        },
        {
            text: "Video section controls the course overview video."
        },
        {
            text: "Course Builder is where you create & organize a course."
        },
        {
            text: "Add Topics in the Course Builder section to create lessons, quizzes, and assignments."
        },
        {
            text: "Information from the Additional Data section shows up on the course single page."
        },
        {
            text: "Make Announcements to notify any important"
        },
        {
            text: "Notes to all enrolled students at once."
        }
    ]
    return (


        <div style={{ boxShadow: '0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset' }} className='mx-auto mb-4  w-[384px] xl:ml-4  bg-richblack-800 p-6 gap-5 rounded-lg '>

            <div className='text-richblack-5 font-inter text-lg font-semibold leading-7 text-left flex flex-row'>
                <div>
                    ⚡
                </div>
                <div>
                    Course Upload Tips
                </div>
            </div>
            <div className=' text-richblack-5'>

                <ul className='flex flex-col gap-[11px]'>
                    {

                        tips.map((ele, index) => (
                            <li className=' list-disc' key={index}>
                                {ele.text}
                            </li>
                        ))
                    }
                </ul>

            </div>
        </div>
    )
}

export default CourseTips