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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
    
        // Determine the suffix for the day
        let suffix = 'th';
        if (day === 1 || day === 21 || day === 31) {
            suffix = 'st';
        } else if (day === 2 || day === 22) {
            suffix = 'nd';
        } else if (day === 3 || day === 23) {
            suffix = 'rd';
        }
    
        return `${day}${suffix} ${month}, ${year}`;
    };
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
        }
        if(courseDetails)
        fetch()

    },[location.pathname,courseDetails])
  return (
  (
    <div className='
      w-[100%] md:w-[80%]  flex flex-col gap-2'>
        <div className='  text-richblack-5 font-inter text-lg
        font-medium leading-8 text-left'>
            {/* SubSection title */}
            {lecture ? lecture.title : "Loading"}
        </div>
        <div className='
         gap-2 flex flex-col'>
            {/* Description */}
      
            <div className='font-inter text-richblack-50 text-sm font-normal leading-6
            text-left '>
            {lecture ? lecture.description : "Loading"}
            </div>
        </div>
      
        <div className='text-richblack-5 font-inter text-base font-normal
        leading-6 text-left '>
            {/* Date */}
            {/* {lecture ? formatTime(lecture?.createdAt) : "Loading"} */}
            {lecture ? (formatDate(lecture?.createdAt)) : "Loading"}
        </div>
    </div>
    )
  )
}

export default VideoDescription