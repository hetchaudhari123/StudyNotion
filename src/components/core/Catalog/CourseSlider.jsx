
import React, { useEffect, useState } from 'react'
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'
import avgRating from '../../../services/avgRating'
import RatingStars from './RatingStars'
import { FaAngleRight } from "react-icons/fa6";
import { useRef } from 'react'
const CourseSlider = ({ courses }) => {
    const [avgRatingCourse, setAvgRatingCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [grabbing,setGrabbing] = useState(false)
    useEffect(() => {
        // avgRating(course)
        setAvgRatingCourse(courses.map((course) => {
            const obj = avgRating(course)
            // console.log("OBJ....",obj)
            return obj
        }))
        setLoading(false)

    }, [courses])
    useEffect(() => {
        console.log("AVERAGE RATING COURSE.....", avgRatingCourse)
    }, [avgRatingCourse])
    const swiperRef = useRef(null);
    const clickHandler = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
          swiperRef.current.swiper.slideNext();
        }
      };
    return (
        <>
            <div className='flex flex-row items-center gap-11'>

                <Swiper
                    ref={swiperRef}
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={24}
                    // pagination={{
                    //     clickable: true,
                    //     bulletClass: 'custom-bullet',
                    //     bulletActiveClass: 'custom-bullet-active',
                    //   }}
                    modules={[Autoplay, Pagination, Navigation]}
                    
                    className={`mySwiper ${(!grabbing) ? ("cursor-grab") : ("cursor-grabbing")}`}
                    //   autoplay={{
                    //   delay: 1000,
                    //   disableOnInteraction: true,
                    //   }}
                    navigation={true}
                    breakpoints={{
                        1024: { slidesPerView: 3, }
                    }}
                    onMouseDown={() => {setGrabbing(true)}}
                    onMouseUp={() => {setGrabbing(false)}}
                >
                    <div>

                        {
                            courses.map((course, index) => {

                                return (
                                    <SwiperSlide
                                        key={index}

                                        className='flex flex-row justify-center'
                                    >
                                        <div className='
                                 flex
                                    flex-col gap-5'>
                                            <div className='rounded-lg'>
                                                <img src={`${course.thumbnail}`}
                                                    alt={`${course.courseName}`}
                                                    className='object-contain w-[384px] h-[201px]'
                                                />

                                            </div>
                                            <div className='gap-2 flex flex-col'>
                                                <div className='flex flex-col gap-2'>
                                                    {/* Header */}
                                                    <div className='text-richblack-5
                                            font-inter text-base font-medium leading-6
                                            text-left
                                            '>
                                                        {course.courseDescription}
                                                    </div>

                                                    <div className='text-richblack-300
                                            font-inter text-base font-normal leading-6
                                            text-left'>
                                                        {course.instructor.firstName + " " + course.instructor.lastName}
                                                    </div>
                                                </div>
                                                <div className='flex gap-2
                                        items-center'>
                                                    {/* Intermediate */}

                                                    <div className='text-yellow-100 
                                            font-inter text-base
                                            font-semibold leading-6
                                            text-left'>
                                                        {/* Avg Rating */}
                                                        {
                                                            (loading) ? ("Loading") : avgRatingCourse[index]?.avg
                                                        }
                                                    </div>
                                                    <div>
                                                        {

                                                            (loading) ? ("Loading") : <RatingStars reviewCount={avgRatingCourse[index]?.review_cnt} />
                                                        }
                                                    </div>

                                                    <div

                                                        className='text-richblack-400
                                            font-inter text-base font-normal
                                            leading-6 text-left'>
                                                        {/* Review Count */}
                                                        {
                                                            (loading) ? ("Loading") : avgRatingCourse[index]?.review_cnt}
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
                                    </SwiperSlide>

                                )
                            })

                        }
                    </div>
                </Swiper>
              
                <div className='bg-[#424854] flex flex-row p-1 gap-1 rounded-[200px]
                items-center h-fit w-fit cursor-pointer' 
                onClick={clickHandler}>
                    <div className='text-richblack-5'>
                        <FaAngleRight />
                    </div>
                </div>
            </div>


        </>
    )
}

export default CourseSlider