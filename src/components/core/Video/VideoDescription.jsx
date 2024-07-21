import React from 'react'
import { formatTime } from '../../../services/formatTime'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Spinner from '../../common/Spinner'
const VideoDescription = () => {
    const {subSectionId} = useParams()
    const location = useLocation()
    const {courseDetails} = useSelector(state => state.course)

    const [lecture,setLecture] = useState(null)

    const [loading,setLoading] = useState(true)
    useEffect(() => {
        const fetch = () => {
           courseDetails.courseContent.forEach(section => {
                section.subSection.forEach(ss => {
                    if(ss._id === subSectionId){
                        console.log("THE LECTURE....",ss)
                        setLecture(ss)
                    }
                })
           })
           setLoading(false)
        }

        fetch()

    },[location.pathname])
  return (
     (loading) ? (
        <div className=' h-full '>
        <Spinner></Spinner>
    </div>
    ) : (
    <div className='
      w-[100%] md:w-[80%]  flex flex-col gap-2'>
        <div className='  text-richblack-5 font-inter text-lg
        font-medium leading-8 text-left'>
            {/* SubSection title */}
            {lecture.title}
        </div>
        <div className='
         gap-2 flex flex-col'>
            {/* Description */}
      
            <div className='font-inter text-richblack-50 text-sm font-normal leading-6
            text-left'>
            {lecture.description}
            </div>
        </div>
      
        <div className='text-richblack-5 font-inter text-base font-normal
        leading-6 text-left'>
            {/* Date */}
            {formatTime(lecture?.createdAt)}
        </div>
    </div>
    )
  )
}

export default VideoDescription