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
import toast from 'react-hot-toast'
import Nothing from '../components/common/Nothing'
import { fetchUserRating } from '../services/operations/reviewAPI'
const VideoPage = () => {
  const [reviewModal, setReviewModal] = useState(false)
  const [editReview,setEditReview] = useState(false)
  const [lectureExists, setLectureExists] = useState(true)
  const location = useLocation()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const [formData,setFormData] = useState({rating:0,review:''})
  const { courseId } = useParams()
  const {token} = useSelector(state=>state.auth);


  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const completedVideos = await fetchCourseProgress({ courseId },token, null, false)
      if (!completedVideos) {
        toast.error("The course has been removed")
        setLectureExists(false)
        return
      }
      await dispatch(fetchCourse(courseId, token,null, false))
      dispatch(setCompletedVideos(completedVideos))
      const res = await fetchUserRating({courseId},token,null,false)
      if(res){
          setEditReview(true)
          setFormData({rating:res.rating,review:res.review})
      }
      setLoading(false)
    }
    fetch()
  }, [location.pathname,reviewModal])


  return (
    (!lectureExists) ? (
      <div className='border-2 border-white absolute top-0 left-0 bottom-0
      right-0'>
        <Nothing text="Course has been removed!"></Nothing>
      </div>
    ) :
    (<div className='flex flex-row  flex-1
        gap-4  
    '>

      {/* Sidebar */}
      <div className='w-[150px] xl:w-[300px]'>
        <VideoSideBar 
        editReview={editReview}
        loading={loading} setLoading={setLoading} reviewModal={reviewModal} setReviewModal={setReviewModal}></VideoSideBar>
      </div>
      <div className='flex-1 flex flex-col gap-2 
        
        '>

        {/* Video */}

        <Outlet />
      </div>
      {
        reviewModal &&
        <ReviewModal editReview={editReview} rating={formData.rating} review={formData.review} setReviewModal={setReviewModal} />
      }
    </div>
    )
  )
}

export default VideoPage