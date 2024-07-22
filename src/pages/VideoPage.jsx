import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchCourse } from '../services/operations/courseAPI'
import { fetchCourse, fetchCourseProgress } from '../services/operations/courseAPI'
import { useLocation, useParams } from 'react-router-dom'
import VideoSideBar from '../components/core/Video/VideoSideBar'
import Spinner from '../components/common/Spinner'
import LectureVideo from '../components/core/Video/LectureVideo'
import { Outlet } from 'react-router-dom'
import VideoDescription from '../components/core/Video/VideoDescription'
import { setCompletedVideos } from '../redux/slices/courseProgressSlice'
import ReviewModal from '../components/core/Video/ReviewModal'
const VideoPage = () => {
    const [reviewModal,setReviewModal] = useState(false)

    const location = useLocation()    
    const dispatch = useDispatch()

    const {courseId} = useParams()

    useEffect(() => {
        const fetch = async () => {
            const completedVideos = await fetchCourseProgress({courseId},null,false)
            await dispatch(fetchCourse(courseId,null,false))
            dispatch(setCompletedVideos(completedVideos))
        }
        fetch()
    },[location.pathname])

  return (

    (<div className='flex flex-row  flex-1
        gap-4  
    '>
        
        {/* Sidebar */}
        <div className='w-[150px] xl:w-[300px]'>
        <VideoSideBar reviewModal={reviewModal} setReviewModal={setReviewModal}></VideoSideBar>
        </div>
        <div className='flex-1 flex flex-col gap-2 
        
        '>
           
        {/* Video */}

      <Outlet/>
        </div>
        {
            reviewModal && 
            <ReviewModal setReviewModal={setReviewModal}/>
        }
    </div>
    )
  )
}

export default VideoPage