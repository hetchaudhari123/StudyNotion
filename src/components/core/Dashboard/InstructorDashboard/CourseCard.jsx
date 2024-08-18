import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { RxDividerVertical } from "react-icons/rx";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useEffect } from 'react';
// import './styles.css';
import avgRating from '../../../../services/avgRating';
import RatingStars from '../../Catalog/RatingStars';
import { FaAngleRight } from "react-icons/fa6";
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ courses }) {
    const navigate = useNavigate()
    const [avgRatingCourse, setAvgRatingCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [grabbing, setGrabbing] = useState(false)
    const courseClickHandler = (course) => {  
        // http://localhost:3000/view-course/669750c8107ff5f3542be1f5/section/669750ce107ff5f3542be1f9/sub-section/669750e4107ff5f3542be20b
        
        navigate(`/view-course/${course._id}/section/${course.courseContent[0]._id}/sub-section/${course.courseContent[0].subSection[0]._id}`)
    }

    useEffect(() => {
        // avgRating(course)
        setAvgRatingCourse(courses.map((course) => {
            const obj = avgRating(course)
            // console.log("OBJ....",obj)
            return obj
        }))
        setLoading(false)

    }, [courses])
    // useEffect(() => {
    //     console.log("COURSES.....", courses)
    // }, [courses])
    return (
        <div className='flex flex-row items-center mb-4'>
            <div
                className='flex flex-row gap-6'
            >
                <>

                    {
                        courses.slice(0, 3).map((course, index) => {

                            return (
                                <div

                                    key={index}
                                    onClick={() => {courseClickHandler(course)}}
                                    className='flex
                                    cursor-pointer
                                    bg-richblack-800
                                    justify-center
                                    items-center
                                    rounded-lg
                                    '
                                                    >
                                    <div className='
                                        flex flex-col  '>
                                        <div className=' '>
                                            <img src={`${course.thumbnail}`}
                                                alt={`${!loading ? course.courseName : "Loading"}`}
                                                className='object-contain   h-[201px]
                                                rounded-t-lg'
                                            />

                                        </div>
                                        <div className='gap-2 flex flex-col
                                        p-4
                                        '>
                                            <div className='flex flex-col gap-2'>
                                                {/* Header */}
                                                <div className='text-richblack-5
                                                    font-inter text-base font-medium leading-6
                                                    text-left 
                                                    '>
                                                    {!loading ? course.courseDescription : "Loading"}
                                                </div>

                                                <div className='text-richblack-300 
                                                        font-inter text-base font-normal leading-6
                                                        text-left'>
                                                    {!loading ? course.instructor.firstName + " " + course.instructor.lastName :
                                                        "Loading"}
                                                </div>
                                            </div>
                                            <div className='flex gap-4
                                                 items-center  '>
                                                {/* Intermediate */}

                                                <div className='text-yellow-100 
                                                    font-inter text-base
                                                    font-semibold leading-6 flex flex-row gap-2
                                                    items-center
                                                    text-left'>
                                                    {/* Avg Rating */}
                                                    <div>
                                                        Rating
                                                    </div>
                                                    <div className=''>
                                                        {
                                                            (loading) ? ("Loading") : avgRatingCourse[index]?.avg
                                                        }
                                                    </div>
                                                </div>



                                                <div>
                                                    <RxDividerVertical />
                                                </div>
                                                {/* <div>
                                                    {

                                                        (loading) ? ("Loading") : <RatingStars reviewCount={avgRatingCourse[index]?.review_cnt} />
                                                    }
                                                </div> */}

                                                <div

                                                    className='text-richblack-400
                                                    font-inter text-base font-normal flex flex-row gap-2
                                                    leading-6 text-left'>

                                                    {/* Review Count */}

                                                    <div>
                                                        {
                                                            (loading) ? ("Loading") : avgRatingCourse[index]?.review_cnt
                                                        }
                                                    </div>

                                                    <div>
                                                        {
                                                            (loading) ? ("Loading") : ((avgRatingCourse[index]?.review_cnt === 1) ? "Review" : "Reviews")
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                {/* Footer */}

                                                <div className='text-richblack-5
                                                    font-inter text-xl font-semibold leading-7
                                                    text-left'>
                                                    Rs. {course.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })

                    }
                </>
            </div>
            
        </div>
    );
}

