import React, { useEffect, useState } from 'react'
import { BigPlayButton, Player } from "video-react"
import "video-react/dist/video-react.css"

// import "node_modules/video-react/dist/video-react.css";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VideoEndModal from './VideoEndModal';
import Spinner from '../../common/Spinner';
import { useRef } from 'react';
import { fetchCourse, fetchCourseProgress, updateCourseProgress } from '../../../services/operations/courseAPI';
import toast from 'react-hot-toast';
import { addCompletedVideos, setCompletedVideos } from '../../../redux/slices/courseProgressSlice';
const LectureVideo = () => {
    const dispatch = useDispatch()
    const { subSectionId } = useParams()
    const { sectionId } = useParams()
    const { courseId } = useParams()
    const videoRef = useRef(null)
    const location = useLocation()
    const { courseDetails } = useSelector(state => state.course)
    const [lecture, setLecture] = useState(null)
    const [loading, setLoading] = useState(true)
    const [prevSubSection, setPrevSubSection] = useState(null)
    const [prevSection, setPrevSection] = useState(null)
    const [nextSubSection, setNextSubSection] = useState(null)
    const [nextSection, setNextSection] = useState(null)
    const [endModal, setEndModal] = useState(false)
    const navigate = useNavigate()
    const { completedVideos } = useSelector(state => state.courseProgress)

    const { token } = useSelector(state => state.auth);



    useEffect(() => {
        const fetch = () => {
            courseDetails.courseContent.forEach(section => {
                section.subSection.forEach(ss => {
                    if (ss._id === subSectionId) {
                        //  console.log("THE LECTURE....",ss)
                        setLecture(ss)
                    }
                })
            })
        }
        const showPrevHandler = () => {
            for (let i = 0; i < courseDetails.courseContent.length; i++) {
                for (let j = 0; j < courseDetails.courseContent[i].subSection.length; j++) {
                    if (courseDetails.courseContent[i].subSection[j]._id === subSectionId) {
                        if (j > 0) {
                            setPrevSubSection(courseDetails.courseContent[i].subSection[j - 1]._id)
                            setPrevSection(courseDetails.courseContent[i]._id)
                            return
                            // setPrevSection(courseDetails.courseContent[i][j - 1]._id)
                            // return courseDetails.courseContent[i][j - 1]._id
                        }
                        else if (i > 0) {
                            setPrevSubSection(courseDetails.courseContent[i - 1].subSection[courseDetails.courseContent[i - 1].subSection.length - 1]._id)
                            setPrevSection(courseDetails.courseContent[i - 1]._id)
                            return
                            // return courseDetails.courseContent[i - 1][courseDetails.courseContent[i - 1].length - 1]._id
                        }
                        else {
                            setPrevSubSection(null)
                            setPrevSection(null)
                            return
                            // return null
                        }

                    }
                }
            }
            setPrevSubSection(null)
            setPrevSection(null)
            return
            // return null
        }
        const showNextHandler = () => {

            for (let i = 0; i < courseDetails.courseContent.length; i++) {
                for (let j = 0; j < courseDetails.courseContent[i].subSection.length; j++) {
                    if (courseDetails.courseContent[i].subSection[j]._id === subSectionId) {
                        if (j < courseDetails.courseContent[i].subSection.length - 1) {
                            setNextSubSection(courseDetails.courseContent[i].subSection[j + 1]._id)
                            setNextSection(courseDetails.courseContent[i]._id)
                            return
                        }
                        else if (i < courseDetails.courseContent.length - 1) {
                            setNextSubSection(courseDetails.courseContent[i + 1].subSection[0]._id)
                            setNextSection(courseDetails.courseContent[i + 1]._id)
                            return
                            // return courseDetails.courseContent[i - 1][courseDetails.courseContent[i - 1].length - 1]._id
                        }
                        else {
                            setNextSubSection(null)
                            setNextSection(null)
                            return
                            // return null
                        }

                    }
                }
            }
            // setEnd(null)
            // return null
            setNextSubSection(null)
            setNextSection(null)
            return
        }

        const showMarkAsCompletedHandler = () => {
            completedVideos.includes(subSectionId)
        }

        if (courseDetails && completedVideos) {
            fetch()
            showPrevHandler()
            showNextHandler()
            showMarkAsCompletedHandler()
            setLoading(false)
        }
    }, [completedVideos, courseDetails])

    // useEffect(() => {
    //     console.log("SUB SECTION ID....",subSectionId)
    //     console.log("PREV SECTION......",prevSection)
    //     console.log("PREV SUB SECTION......",prevSubSection)
    //     console.log("NEXT SECTION......",nextSection)
    //     console.log("NEXT SUB SECTION......",nextSubSection)
    // },[prevSection,nextSection,prevSubSection,nextSubSection])


    const prevHandler = () => {
        if (prevSection && prevSubSection) {
            navigate(`/view-course/${courseId}/section/${prevSection}/sub-section/${prevSubSection}`)
            setEndModal(false)
        }
    }
    const nextHandler = () => {
        if (nextSection && nextSubSection) {
            navigate(`/view-course/${courseId}/section/${nextSection}/sub-section/${nextSubSection}`)
            setEndModal(false)

        }
    }

    const rewatchHandler = () => {
        if (videoRef) {
            videoRef.current.seek(0)
            setEndModal(false)
        }
    }


    const markAsCompletedHandler = async () => {
        // console.log("REF...",videoRef.current)
        // const subSection = courseDetails.courseContent.filter((section) => {
        //     const res = section.subSection.find((ss) => {
        //         if(ss._id === subSectionId){
        //             return true
        //         }
        //     })
        //     if(res){
        //         return true
        //     }
        // })
        const section = courseDetails.courseContent.find(section => section._id === sectionId)
        const subSection = section.subSection.find(ss => ss._id === subSectionId)
        const courseProgress = await updateCourseProgress({ courseId, subSection }, token, setLoading, true)
        // console.log("COURSE PROGRESS COMPLETED VIDEOS....",courseProgress)
        // console.log("COMPLETED VIDEOS FROM THE UPDATE COURSE PROGRESS API....",courseProgress.completedVideos)
        dispatch(setCompletedVideos(courseProgress.completedVideos))
        nextHandler()
        setEndModal(false)
    }


    return (
        (!courseDetails || !completedVideos || loading) ? (
            <div className='absolute top-0 bottom-0 left-0 right-0'>
                <Spinner></Spinner>
            </div>
        ) : (
            <div
                //  style={{ width: 'calc(100% - )' }}
                className='
     w-[100%] md:w-[80%]'>
                <div className=' '>
                    <Player
                        playsInline
                        aspectRatio='16:9'
                        ref={videoRef}
                        src={lecture.videoUrl}
                        onEnded={() => setEndModal(true)}
                        fluid={true}
                    />
                    <div className=''>
                        {endModal && <VideoEndModal
                            onClickMarkAsCompleted={markAsCompletedHandler}
                            onClickPlayPrev={prevHandler}
                            onClickPlayNext={nextHandler}
                            onClickRewatch={rewatchHandler}
                            onClickClose={() => { setEndModal(false) }}
                            showMarkAsCompleted={!completedVideos.includes(subSectionId)}
                            showPrev={prevSection && prevSubSection}
                            showNext={nextSection && nextSubSection}
                        />}
                    </div>
                </div>

            </div>)
    )
}

export default LectureVideo