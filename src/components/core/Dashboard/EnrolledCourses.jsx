import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useDispatch } from 'react-redux';
import { getEnrolledCourses } from '../../../services/operations/profileAPI';
import Spinner from '../../common/Spinner';
import ProgressBar from "@ramonak/react-progress-bar";
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
    const courseProgress = 60;
    useEffect(() => {
        dispatch(getEnrolledCourses(setLoading, setCourses, false));
    }, []);
    if (loading) return <Spinner />
    return (
        <div className=''>
            <Header text1={"Enrolled Courses"} text2={"Enrolled Courses"}></Header>
            <div className='mx-4 flex flex-col gap-4'>

                <div className='flex flex-row p-1 gap-1.5 rounded-[500px] bg-richblack-800 w-fit'
                    style={{ boxShadow: '0px -1px 0px 0px #FFFFFF2E inset' }}>

                    {


                        filter.map((ele, index) => (

                            <div key={index} onClick={() => { setFilterSelect(ele.name) }} className={`cursor-pointer py-1.5 px-4 flex gap-2.5 rounded-[100px] ${ele.name === filterSelect ? ("bg-richblack-900 font-inter text-base font-bold leading-6 text-center text-richblack-5 ") : (" font-inter text-base font-medium leading-6 text-center text-richblack-200")}`}>
                                {ele.name}
                            </div>
                        ))
                    }
                </div>

                <div className='w-full  flex flex-col   '>
                    {/* Header */}

                    <div className='flex w-full justify-between'>

                        <div className='rounded-tl-lg p-4 gap-1 flex justify-center w-1/3 border-b-richblack-700 bg-richblack-700 font-inter text-sm font-medium leading-6 text-left text-richblack-50 '>
                            Course Name
                        </div>
                        <div className='p-4 gap-1 flex justify-center w-1/3 border-b-richblack-700 bg-richblack-700 font-inter text-sm font-medium leading-6 text-left text-richblack-50'>
                            Duration
                        </div>
                        <div className='p-4 gap-1 flex justify-center w-1/3 border-b-richblack-700 bg-richblack-700 font-inter text-sm font-medium leading-6 text-left text-richblack-50 rounded-tr-lg'>
                            Progress
                        </div>
                    </div>

                        {/* Content */}
                        <div className='flex flex-col w-full '>
                            {
                                courses ? (
                                    courses.length ? (courses.map((ele, index) => {
                                        return (
                                            <div key={index}
                                                className={`w-full flex flex-row `}>

                                                <div className={`w-1/3 p-4 gap-5 justify-start  flex flex-row border
                                            border-richblack-700  
                                            ${(courses.length - 1 === index) && "rounded-bl-lg"}
                                            `}>



                                                    <div className=''>
                                                        <img className=' object-cover w-[52px] aspect-square rounded-lg text-richblack-5' src={`${ele.thumbnail}`}
                                                            alt={`${ele.courseName + " course image"} `} />
                                                    </div>

                                                    <div className='flex flex-col gap-0.5'>
                                                        <div className='font-inter text-base font-medium text-richblack-5 leading-6 text-left'>{ele.courseName}</div>

                                                        <div className='font-inter text-base font-normal leading-6 text-left text-richblack-300'>{ele.courseDescription}</div>
                                                    </div>

                                                </div>

                                                <div className={`w-1/3 p-4 gap-5 border border-richblack-700 font-inter text-base font-medium  leading-6 text-left text-richblack-50 flex justify-center items-center`}>
                                                    {/* Time */}
                                                    2hr 30 mins
                                                </div>
                                                {/* border-bottom: 1px solid #2C333F */}
                                                <div className={`w-1/3  p-4 gap-5 flex ${(index === courses.length - 1) && "rounded-br-lg"} border border-richblack-700`}>
                                                    {/* Progress */}

                                                    <div className='flex flex-col gap-1 w-full '>
                                                        <div className='flex gap-2 text-richblack-50 font-inter text-xs font-semibold leading-5 text-left'>
                                                            {/* Progress Percentage */}
                                                            Progress<span>{'65%'}</span>
                                                        </div>

                                                        <div className=' rounded-[200px]  h-2 bg-richblack-700 w-full'>
                    {/* CHANGE COMPLETED HERE */}
                                                        {/* <ProgressBar bgColor={`${courseProgress !== 100}?"#47A5C5":"#06D6A0"`} height='8px' 
                                                        animateOnRender={true} completed={courseProgress}
                                                        labelClassName='text-[0px]' /> */}
                                                        <ProgressBar bgColor={`${courseProgress === 100?"#06D6A0" : "#47A5C5"}`} height='8px' 
                                                        animateOnRender={true} completed={courseProgress}
                                                        labelClassName='text-[0px]' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })) :
                                        (
                                            <div className='text-richblack-5'>
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
        </div>
    )
}

export default EnrolledCourses