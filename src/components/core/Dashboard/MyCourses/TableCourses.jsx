import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { deleteCourse, fetchCourse, fetchInstructorCourses } from '../../../../services/operations/courseAPI';
import { COURSE_STATUS } from '../../../../utils/constants';
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { HiCheckCircle } from "react-icons/hi2";
import { HiMiniClock } from "react-icons/hi2";
import { HiMiniPencil } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEditCourse, setStep } from '../../../../redux/slices/courseSlice';
import ConfirmationModal from "../../../common/ConfirmationModal"
const TableCourses = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const TRUNCATE_LENGTH = 120
    const fetchCourses = async () => {
        const result = await fetchInstructorCourses(setLoading, true)
        if (result) {
            setCourses(result)
            console.log("COURSES.....", courses)
        }
    }
    const deleteHandler = async (courseId) => {
        const result = await deleteCourse({ dispatch, courseId }, null, false)
        setModal(false)
        fetchCourses()
    }
    useEffect(() => {
        fetchCourses()
    }, [])

    const handleEdit = async (courseId) => {
        const result = await dispatch(fetchCourse(courseId, null, false))
        if (result) {
            dispatch(setEditCourse(true))
            dispatch(setStep(1))
            navigate("/dashboard/add-course")
        }
    }
    const descriptionHandler = (desc) => {
        if (desc.length > TRUNCATE_LENGTH)
             return desc.substring(0, TRUNCATE_LENGTH) + "...";
        return desc
        
    }
    return (


        <div className='border border-richblack-800
            rounded-lg'>
            {/* HEADING */}
            <div className='border-b border-b-text-richblack-800
                text-richblack-100
                font-inter text-sm font-medium leading-6 text-left
                flex flex-row'>

                <div className='w-3/4 2/3'>

                    <div className='p-4 
                flex justify-center items-center
                
                '>

                        COURSES
                    </div>
                </div>

                <div className='p-4  w-1/12 flex justify-center items-center
                '>
                    {/* second */}
                    DURATION
                </div>
                <div className='p-4 
                gap-2.5 w-1/12 flex justify-center items-center
                '>
                    {/* third */}
                    PRICE
                </div>

                <div className='p-4 gap-2.5 w-1/12 flex justify-center items-center
                '>
                    {/* fourth */}
                    ACTIONS
                </div>
            </div>
            {/* BODY */}
            <div className='w-full '>
                {
                    (!(courses && courses.length > 0)) ? (
                        <div className='py-10 text-center text-2xl font-medium text-richblack-100 '>
                            No Content Here
                        </div>
                    ) : (
                        courses.map((course) => (

                            modal ? <ConfirmationModal
                                key={course._id}
                                text1={`Delete Course ${course.courseName}?`}
                                text2={`Are you sure you want to delete
                                ${course.courseName}?All the data regarding it will 
                                be permanently deleted`}
                                setModal={setModal}
                                onClickBtn1={() => { deleteHandler(course._id) }}
                                onClickBtn2={() => { setModal(false) }}
                                btn1={"Delete"}
                                btn2={"Cancel"}
                            />
                                :
                                <div className='
                             flex flex-row w-full
                                ' key={course._id}>
                                    <div className='w-3/4 2/3'>
                                        <div className='w-full flex flex-row 
                                    text-richblack-100 p-4 gap-6
                                     '>
                                            <div className='flex items-center'>
                                                <img src={course?.thumbnail} alt={course?.courseName}
                                                    className='rounded-lg 
                                            w-[221px] 
                                            object-contain'/>
                                            </div>
                                            <div className=' flex flex-col
                                            gap-3'>
                                                {/* content */}
                                                <div className='gap-2 flex flex-col'>
                                                    {/* Header */}

                                                    <div className="text-richblack-5
                                                    font-inter text-xl font-semibold leading-7
                                                    text-left">
                                                        {course.courseName}
                                                    </div>

                                                    <div className='text-richblack-100
                                                    font-inter text-sm font-normal
                                                    leading-6 text-left'>
                                                        {/* This course provides an overview of the design process, design thinking, and basic design principles. */}
                                                        {
                                                            descriptionHandler(course.courseDescription)
                                                        }
                                                    </div>
                                                </div>

                                                <div className='text-richblack-25
                                                font-inter text-xs font-medium leading-5 text-left'>
                                                    Created: April 27, 2023 | 05:15 PM
                                                    {course.createdAt}
                                                </div>

                                                {
                                                    (course?.status === COURSE_STATUS.PUBLISHED) ? <div className='bg-richblack-700
                                                    py-0.5 px-2 gap-1.5 rounded-[200px]
                                                    flex items-center w-fit'>
                                                        <div className='text-yellow-50
                                                        text-[12.8px]'>
                                                            <HiCheckCircle />

                                                        </div>
                                                        <div className='text-yellow-100
                                                        font-inter text-xs font-medium leading-5 text-left'>
                                                            Published
                                                        </div>
                                                    </div> :
                                                        <div className='bg-richblack-700
                                                        py-0.5 px-2 gap-1.5 rounded-[200px]
                                                        flex items-center w-fit'>
                                                            {/* Footer */}
                                                            <div className='text-pink-100
                                                        text-[12.8px]'>
                                                                <HiMiniClock />

                                                            </div>
                                                            <div className='text-pink-100
                                        font-inter text-xs font-medium leading-5 text-left
                                        '>
                                                                Drafted
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='text-richblack-100
                                    font-inter text-sm font-medium leading-6 text-left
                                    flex items-center
                                    
                                    justify-center
                                    w-1/12'>
                                        {/* second */}
                                        {/* ADD THE TOTAL TIME DURATION OF THE COURSE */}
                                        20h 10m
                                    </div>
                                    <div className='text-richblack-100
                                    font-inter text-sm font-medium leading-6 text-left
                                    flex items-center
                                    
                                    justify-center
                                    w-1/12
                                '>
                                        {/* third */}
                                        ₹{course?.price}
                                    </div>
                                    <div className='text-richblack-100
                                
                                    font-inter text-sm font-medium leading-6 text-left
                                    flex items-center
                                    
                                    justify-center
                                    w-1/12 gap-2.5
                                    p-4
                                    cursor-pointer'>
                                        {/* fourth */}
                                        <div onClick={() => { handleEdit(course._id) }} className='hover:text-richblue-100
                                    text-2xl duration-200 transition-all'>
                                            <HiMiniPencil />
                                        </div>
                                        <div onClick={() => setModal(true)} className='hover:text-richblue-100
                                    text-2xl duration-200 transition-all'>
                                            <FiTrash2 />
                                        </div>
                                    </div>

                                </div>

                        ))

                    )
                }

            </div>
        </div>
    )
}

export default TableCourses