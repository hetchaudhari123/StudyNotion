import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourse } from '../services/operations/courseAPI'
import { useLocation, useParams } from 'react-router-dom'
import VideoSideBar from '../components/core/Video/VideoSideBar'
import Spinner from '../components/common/Spinner'
const VideoPage = () => {
    const courseDetails = useSelector(state => state.course)
    const dispatch = useDispatch()
    const {courseId} = useParams()
    const [loading,setLoading] = useState(true)
    const location = useLocation()
    useEffect(() => {
        dispatch(fetchCourse(courseId,null,false))
        setLoading(false)
    },[location.pathname])
  return (
    (loading) ? (
        <div className='
        fixed h-screen w-screen'>
            <Spinner></Spinner>
        </div>
    ) :
    (<div className='flex flex-row'>
        
        {/* Sidebar */}
        <VideoSideBar></VideoSideBar>
        <div>
        {/* Video */}
        {/* Video Description */}
        </div>
    </div>
    )
  )
}

export default VideoPage