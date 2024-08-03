import React, { useDebugValue, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaHandsClapping } from "react-icons/fa6";
import { fetchInstructorCourses } from '../../../../services/operations/courseAPI';
import CourseCard from './CourseCard';
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import HighlightText from '../../HomePage/HighlightText';
import CTAButton from "../../HomePage/Button"
Chart.register(ArcElement, Tooltip, Legend);
const InstructorDashboard = () => {
    const { user } = useSelector(state => state.profile)
    const [options, setOptions] = useState(0)
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    // 'rgb(255, 99, 132)'
    const randomColor = () => {
        let colors = []
        for(let i = 0 ; i < courses.length ; i++){
            const color = (`rgb(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256})`)
            console.log("COLOR....",color)
            colors.push(color)
        }
        return colors
    }
    useEffect(() => {
        const fetch = async () => {
            const response = await fetchInstructorCourses(null, false)
            setCourses(response)
            setLoading(false)
        }
        fetch()
    }, [])

    const getTotalStudents = () => {
        return courses.reduce((prev, course) => {
            return prev + Number(course.studentsEnrolled.length)
        }, 0)
    }

    const courseWiseStudents = () => {
        return courses.map((course) => {
            return Number(course.studentsEnrolled.length)
        })
    }

    const courseWiseMoneyGenerated = () => {
        return courses.map((course) => {
            return Number(course.price) * (course.studentsEnrolled.length)
        })
    }

    const getTotalIncome = () => {
        return courses.reduce((prev,course) => {
            return prev + Number(course.price) * (course.studentsEnrolled.length)
        },0)
    }

    const getLabels = () => {
        return courses.map((course) => (
            course.courseName
        ))
    }




    return (
        <div className='my-4 flex flex-col gap-4 mx-auto  w-fit'>
            <div className=''>
                {/* Header */}

                <div className='text-richblack-5 font-inter text-2xl
            font-semibold tracking-tight leading-8 text-left
            gap-4 flex flex-row items-center'>
                    <div>
                        Hi {user.firstName + " " + user.lastName}
                    </div>
                    <div className='text-yellow-50'>
                        <FaHandsClapping />
                    </div>
                </div>

                <div className='font-inter text-base font-medium leading-6 text-left
            text-richblack-200'>
                    Let's start something new
                </div>
            </div>
            <div className='flex flex-row gap-4'>
                {/* Content */}
                <div className='p-4 bg-richblack-700
            flex-1
                rounded-lg
                flex flex-col gap-4'>
                    {/* Left */}
                    <div className='text-richblack-5 font-inter text-lg
                    font-medium tracking-tight leading-8 text-left
                    gap-4 flex flex-row items-center
                    '>
                        Visualize
                    </div>
                    <div className='text-yellow-500 font-inter text-base
                    font-medium tracking-tight leading-8 text-left
                    gap-4 flex flex-row items-center
                    '>
                        {/* Student / Instructor Option */}
                        <div onClick={() => setOptions(0)} className={`rounded-sm px-2  cursor-pointer ${options === 0 && "text-yellow-50 bg-richblack-500"}`}>
                            Students
                        </div>
                        <div onClick={() => setOptions(1)} className={`rounded-sm px-2  cursor-pointer ${options === 1 && "text-yellow-50 bg-richblack-500"}`}>
                            Instructor
                        </div>
                    </div>
                    <div>
                        {/* PieChart */}
                        <div className='
                        flex flex-row justify-center'>
                            {/* <canvas id="myChart"></canvas> */}
                            {/* <Doughnut data={}/> */}
                            {
                            courses.length > 0 ?
                            <div className='
                                aspect-square md:w-[500px]'>
                                <Pie data={{
                                    // labels: [
                                    //     'Red',
                                    //     'Blue',
                                    //     'Yellow'
                                    // ],
                                    labels: getLabels(),
                                    datasets: [{
                                        label: `${(options === 0) ? "Student Count" : "Money Generated"}`,
                                        // data: [300, 50, 100],
                                        // backgroundColor: [
                                            //     'rgb(255, 99, 132)',
                                            //     'rgb(54, 162, 235)',
                                            //     'rgb(255, 205, 86)'
                                            // ],
                                        data: (options === 0) ? courseWiseStudents() : (courseWiseMoneyGenerated()),
                                        backgroundColor: randomColor(),
                                        hoverOffset: 4
                                    }]
                                }}></Pie>
                            </div> : 
                            <div className='  flex flex-col gap-4 justify-center 
                            items-center text-center h-full  aspect-square md:w-[500px] '>
                            <div className=''>
                            <HighlightText text={"Nothing here yet!"} customClass={"text-4xl"}></HighlightText>
                            </div>
                            {/* <div className='fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'> */}
                            {/* <div className='w-fit h-fit'>
                            
                                <CTAButton active={true} linkto={'/dashboard/add-course'}>
                                    <div className='text-richblack-900 font-inter text-base font-medium leading-6 text-center '>
                                        Explore Courses
                                    </div>
                                </CTAButton>
                            </div> */}
                        </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='bg-richblack-700 p-4 rounded-lg'>
                    {/* Right */}


                    <div className='font-inter text-xl font-medium leading-10 text-left text-richblack-5'>
                        {/* Heading */}
                        Statistics
                    </div>

                    <div className=''>
                        {/* Total Courses */}
                        <div className='text-richblack-200 font-inter text-base
                font-medium leading-6 text-left'>
                            Total Courses
                        </div>
                        <div className='font-inter text-3xl font-medium leading-10 text-left text-richblack-5'>
                            {!loading ? courses.length : "Loading"}
                        </div>
                    </div>
                    <div>

                        <div className='text-richblack-200 font-inter text-base
                    font-medium leading-6 text-left'>
                            {/* Total Students */}
                            Total Students
                        </div>
                        <div className='font-inter text-3xl font-medium leading-10 text-left text-richblack-5'>
                            {!loading ? getTotalStudents() : "Loading"}
                        </div>
                    </div>
                    <div>

                        <div className='text-richblack-200 font-inter text-base
                font-medium leading-6 text-left'>
                            {/* Total Income */}
                            Total Income
                        </div>
                        <div className='font-inter text-3xl font-medium leading-10 text-left text-richblack-5'>
                            Rs. {getTotalIncome()}
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-richblack-700 w-fit p-4 rounded-lg'>
                {/* Footer */}
                <div className='text-richblack-5 font-inter text-lg
                    font-medium tracking-tight leading-8 text-left
                    gap-4 flex flex-row items-center '>
                    Your Courses
                </div>
                <div className='text-richblack-5 font-inter text-lg
                    font-medium tracking-tight leading-8 text-left
                    gap-4 flex flex-row items-center'>

                    {
                        loading ? ("Loading") : (<CourseCard courses={courses} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default InstructorDashboard