import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from '../../../services/operations/profileAPI';
import Spinner from '../../common/Spinner';
import ProgressBar from "@ramonak/react-progress-bar";
import CTAButton from "../HomePage/Button"
import HighlightText from '../HomePage/HighlightText';
import { formatString } from '../../../services/formatString';
import { useNavigate } from 'react-router-dom';
import { fetchCourse, fetchCourseProgress } from '../../../services/operations/courseAPI';
import { formatTime } from '../../../services/formatTime';
const EnrolledCourses = () => {
    const VALUES = {
        ALL: 'All',
        PENDING: 'Pending',
        COMPLETED: 'Completed'
    };
    const filter = [
        { name: 'All' },
        { name: 'Pending' },
        { name: 'Completed' },
    ];
    const dispatch = useDispatch();
    const [filterSelect, setFilterSelect] = useState(VALUES.ALL);
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState(null);
    const [progPercent,setProgPercent] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
            dispatch(getEnrolledCourses(setLoading, setCourses, false))
    }, []);
    useEffect(() => {
        const fetchProgresses = async () => {
          try {
            const results = await Promise.all(courses.map(ele => calcProgress(ele)));
            setProgPercent(results);
          } catch (error) {
            console.error("Error fetching progress:", error);
          }
        };
    
        fetchProgresses();
      }, [courses]);
    const handleCourseSelect = async (course) => {
        navigate(`/view-course/${course._id}/section/${course?.courseContent[0]._id}/sub-section/${course?.courseContent[0]?.subSection[0]._id}`)
    }
   
    if (loading) {
        return (
        <div className='
        fixed left-1/2 top-1/2'>
            <Spinner />
        </div>
    )
    }

    const totalTimeDuration = (course) => {
        return Math.round(course.courseContent.reduce((prev,section) => {
            return prev + section.subSection.reduce((previ,ss) => {
                return previ + Number(ss.timeDuration)
            },0)
        },0))
    }

    const showCourse = (course,index) => {
        const percent = (progPercent.length > index) ? (progPercent[index]) : (0)
        if(percent === 100 ){
            return filterSelect === VALUES.ALL || filterSelect === VALUES.COMPLETED
        }
        return filterSelect === VALUES.ALL || filterSelect === VALUES.PENDING
        
    }

    const calcProgress = async (course) => {
        const completedLectures = await fetchCourseProgress({courseId:course._id},null,false)
        console.log("START......................")
        if(null){
            console.log("RETURNED NULL....")
            return 0
        }
        console.log("COMPLETED LECTURES....",completedLectures.length)
        const completed = completedLectures.length
        console.log("COURSE.....",completed)
        const total = course.courseContent.reduce((prev,section) => {
            return prev + section.subSection.length
        },0)
        console.log((completed * 100) / total)
        console.log("END............................")
        return (completed * 100) / total
    }

    return (
        <div className=''>
            <Header text1={"Enrolled Courses"} text2={"Enrolled Courses"}></Header>
            {(courses && courses.length > 0) ?
            (
            <div className='mx-4 flex flex-col gap-4'>

                <div className='flex flex-row p-1 gap-1.5 rounded-[500px] bg-richblack-800 w-fit'
                    style={{ boxShadow: '0px -1px 0px 0px #FFFFFF2E inset' }}>

                    {


                        filter.map((ele, index) => (

                            <div key={index} onClick={() => { setFilterSelect(ele.name) }} 
                            className={`cursor-pointer py-1.5 px-4 flex 
                            gap-2.5 rounded-[100px] 
                            ${ele.name === filterSelect ? ("bg-richblack-900 font-inter text-base font-bold leading-6 text-center text-richblack-5 ") 
                            : (" font-inter text-base font-medium leading-6 text-center text-richblack-200")}`}>
                                {ele.name}
                            </div>
                        ))
                    }
                </div>

                <div className='w-full  flex flex-col   '>
                    {/* Header */}

                    <div className='flex w-full justify-between'>

                        <div className='flex-1 rounded-tl-lg p-4 gap-1 flex justify-center w-1/3 border-b-richblack-700 bg-richblack-700 font-inter text-sm font-medium leading-6 text-left text-richblack-50 '>
                            Course Name
                        </div>
                        <div className='p-4 gap-1 flex justify-center w-1/3 border-b-richblack-700 bg-richblack-700 font-inter text-sm font-medium leading-6 text-left text-richblack-50'>
                            Duration
                        </div>
                        <div className=' p-4 gap-1 flex justify-center w-1/3 border-b-richblack-700 bg-richblack-700 font-inter text-sm font-medium leading-6 text-left text-richblack-50 rounded-tr-lg'>
                            Progress
                        </div>
                    </div>

                    {/* Content */}
                    <div className='flex flex-col w-full '>
                        {
                            courses ? (
                                courses.length ? (courses.map((ele, index) => {
                                    return (
                                        showCourse(ele,index) && <div key={index}
                                            className={`w-full flex flex-row`}>

                                            {/* <div className={`w-1/3 p-4 gap-5 justify-start  flex flex-row border
                                            border-richblack-700    */}
                                            <div onClick={() => handleCourseSelect(ele)} className={`flex-1 p-4 cursor-pointer
                                            
                                            gap-5 justify-start  flex flex-row border
                                            border-richblack-700   items-center
                                            
                                            ${(courses.length - 1 === index) && "rounded-bl-lg"}
                                            `}>



                                                <div className=''>
                                                    <img className=' object-contain w-[52px] aspect-square rounded-lg text-richblack-5' src={`${ele.thumbnail}`}
                                                        alt={`${ele.courseName + " course image"} `} />
                                                </div>

                                                <div className='flex flex-col gap-0.5 w-full'>
                                                    <div className='font-inter text-base font-medium text-richblack-5 leading-6 text-left'>{ele.courseName}</div>

                                                    {/* <div className='font-inter text-base font-normal leading-6 text-left text-richblack-300'>{formatString(ele.courseDescription)}</div> */}
                                                    <div className='font-inter text-base font-normal leading-6 text-left text-richblack-300'>{ele.courseDescription}</div>
                                                </div>

                                            </div>

                                            {/* <div className={`w-1/3 p-4 gap-5 border border-richblack-700 font-inter text-base font-medium  leading-6 text-left text-richblack-50 flex justify-center items-center`}> */}
                                            <div className={`w-1/3 p-4 gap-5 border border-richblack-700 font-inter text-base font-medium  leading-6 text-left text-richblack-50 flex justify-center items-center`}>
                                                {/* Time */}
                                                {totalTimeDuration(ele)}
                                                
                                            </div>
                                            {/* border-bottom: 1px solid #2C333F */}
                                            {/* <div className={`w-1/3  p-4 gap-5 flex ${(index === courses.length - 1) && "rounded-br-lg"} border border-richblack-700`}> */}
                                            <div className={`w-1/3  p-4 gap-5 flex ${(index === courses.length - 1) && "rounded-br-lg"} border border-richblack-700`}>
                                                {/* Progress */}

                                                <div className='flex flex-col gap-1 w-full '>
                                                    <div className='flex gap-2 text-richblack-50 font-inter text-xs font-semibold leading-5 text-left'>
                                                        {/* Progress Percentage */}
                                                        Progress<span>
                                                        {progPercent ? progPercent[index] : "Loading..."}    
                                                        </span>
                                                    </div>

                                                    <div className=' rounded-[200px]  h-2 bg-richblack-700 w-full'>
                                                        {/* CHANGE COMPLETED HERE */}
                                                        {/* <ProgressBar bgColor={`${courseProgress !== 100}?"#47A5C5":"#06D6A0"`} height='8px' 
                                                        animateOnRender={true} completed={courseProgress}
                                                        labelClassName='text-[0px]' /> */}
                                                        <ProgressBar bgColor={`${(progPercent && progPercent[index] === 100) ? "#06D6A0" : "#47A5C5"}`} height='8px'
                                                            animateOnRender={true} completed={progPercent ? progPercent[index]:0}
                                                            labelClassName='text-[0px]' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    )
                                })) :
                                    (
                                        <div className=' text-richblack-5'>
                                            No Courses yet
                                        </div>
                                    )
                            )
                                :
                                (
                                    <div>
                                        Error
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
            ) :
            (
                <div className='  flex flex-col gap-4 justify-center 
                items-center h-full  '>
                <div className=''>
                <HighlightText text={"Nothing here yet!"} customClass={"text-4xl"}></HighlightText>
                </div>
                {/* TO IMPLEMENT THE FOLLOWING FUNCTIONALITY-> */}
                {/* <div className='w-fit h-fit'>
                
                    <CTAButton active={true} linkto={'/dashboard'}>
                        <div className='text-richblack-900 font-inter text-base font-medium leading-6 text-center '>
                            Explore Courses
                        </div>
                    </CTAButton>
                </div> */}
            </div>
            )
        }
        </div>
    )
}

export default EnrolledCourses