import React from 'react'
import { useSelector } from 'react-redux'

const VideoSideBar = () => {
    const {courseDetails} = useSelector(state => state.course)
    // console.log("COURSE DETAILS.....",courseDetails)
  return (
    <div className='border-r border-r-richblack-700
        bg-richblack-800 py-8 gap-2.5'>
   
        <div className='text-richblack-25 font-inter text-lg font-bold leading-7
        text-left '>
        {/* Heading */}


        <div>
            {/* CourseName */}
        {courseDetails.courseName}

    

        </div>
        <div>
            {/* Completed lectures */}
            {courseDetails.}
        </div>
        </div>
        {/* Sections */}
    </div>
  )
}

export default VideoSideBar