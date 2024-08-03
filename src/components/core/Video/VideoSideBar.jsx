import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatTime } from '../../../services/formatTime'
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from 'react-icons/fa6';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { HiTv } from "react-icons/hi2";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { setCompletedVideos } from '../../../redux/slices/courseProgressSlice';
import { fetchCourse, fetchCourseProgress } from '../../../services/operations/courseAPI';
import CTAButton from "../HomePage/Button"
import ReviewModal from './ReviewModal';
import { fetchUserRating } from '../../../services/operations/reviewAPI';
const VideoSideBar = ({ editReview,loading,setLoading,reviewModal, setReviewModal }) => {
    const { courseDetails } = useSelector(state => state.course)
    const dispatch = useDispatch()
    const { completedVideos } = useSelector(state => state.courseProgress)
    const [isActive, setIsActive] = useState([])
    const [currentVideo, setCurrentVideo] = useState(null)
    const [currentSection, setCurrentSection] = useState(null)
    const location = useLocation()
    const { sectionId } = useParams()
    const { subSectionId } = useParams()
    const { courseId } = useParams()
    const navigate = useNavigate()
    const selectVideoHandler = (sectionId, subSectionId) => {
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${subSectionId}`)
    }
   
    useEffect(() => {
        setCurrentVideo(subSectionId)
        setCurrentSection(sectionId)
    }, [location.pathname])
    const isActiveHandler = (sectionId) => {
        !isActive.includes(sectionId) ?
            setIsActive([...isActive, sectionId]) : setIsActive(isActive.filter(ele => ele !== sectionId))
    }


    return (

        <div className=' border-r border-r-richblack-700
        bg-richblack-800 py-8 gap-2.5 flex flex-col
        h-full
         '>

            <div className='text-richblack-25 font-inter text-lg font-bold leading-7
        text-left flex flex-row
         items-center  py-4 px-6 gap-3
         
         '>


                <div className=' w-full
                flex flex-col
                gap-2'>
                    <div className='  flex flex-row justify-start '>
                        <CTAButton
                            active={true}
                            onClick={() => {
                                if(!loading) setReviewModal(true)
                            }}
                        >
                            <div className='text-richblack-800 font-inter text-md
                          font-medium leading-6 text-left'>
                                {(!loading) ? ((!editReview) ? "Add Review": "Edit Review") : "Loading"}
                            </div>
                        </CTAButton>
                    </div>
                    <div className='flex flex-row items-center justify-between'>

                        {/* Heading */}
                        <div>
                            {/* CourseName */}
                            {courseDetails ? courseDetails.courseName : "Loading"}
                        </div>
                        <div className='font-inter text-sm font-semibold leading-6
                        text-left text-richblack-500
                
                        '>
                            {/* Completed lectures */}
                            {
                                (!completedVideos || !courseDetails) ? ("Loading") :
                                    <div>
                                        {completedVideos.length} /
                                        {courseDetails.courseContent.reduce((prev, section) => {
                                            return prev + section.subSection.length
                                        }, 0)}
                                    </div>
                            }
                        </div>
                    </div>
                  


                </div>

            </div>

            <div className='w-full py-1 px-4 gap-3'>
                <div className='border border-richblack-600'>
                </div>
            </div>
            {/* Sections */}
            <div>
                {
                    !courseDetails ? (
                        <div className='text-richblack-5'>
                            Loading
                        </div>) :
                    courseDetails.courseContent.map((section) => (
                        <div key={section._id}>

                            <div className='border-b border-b-richblack-600
                    bg-richblack-700 py-4 px-6 gap-3 flex flex-row
                    items-center'>
                                {/* SectionHeading */}

                                <div className='text-richblack-5 font-inter text-sm
                        font-medium leading-6 text-left'>
                                    {/* Section Name */}
                                    {section.sectionName}
                                </div>

                                <div className='text-richblack-25 font-inter text-sm
                        font-medium leading-6 text-left'>
                                    {/* Section Duration */}
                                    {formatTime(section.subSection.reduce((prev, ss) => {
                                        return prev + Number(ss.timeDuration)
                                    }, 0))}
                                </div>
                                <div className='cursor-pointer text-richblack-200'
                                    onClick={() => isActiveHandler(section._id)}>
                                    {/* Toggle Icon */}
                                    {(isActive.includes(section._id)) ? <FaAngleDown /> : <FaAngleUp />}
                                </div>
                            </div>


                            {/* SubSections */}
                            {isActive.includes(section._id) && (
                                <div className='py-4 px-6 flex flex-col gap-3'>
                                    {
                                        section.subSection.map((ss) => (
                                            <div onClick={() => { selectVideoHandler(section._id, ss._id) }} className='cursor-pointer  gap-2 flex flex-row
                                    items-center' key={ss._id}>
                                                <div className={`${(ss._id !== currentVideo) ? "text-richblack-300" : "text-richblue-200"} text-lg`}>
                                                    {(ss._id === currentVideo) ? (<FaPlay />) : (completedVideos.includes(ss._id)) ? (<MdCheckBox />) : (<MdCheckBoxOutlineBlank />)}
                                                </div>

                                                <div className={` font-inter
                                        text-sm ${(ss._id !== currentVideo) ? "font-medium text-richblack-25" : "font-normal text-richblue-200"} leading-6 text-left`}>

                                                    {ss.title}
                                                </div>
                                                <div className='text-richblack-300 text-[15.75px]'>
                                                    <HiTv />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            }
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default VideoSideBar