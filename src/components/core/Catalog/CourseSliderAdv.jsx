import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useEffect } from 'react';
// import './styles.css';
import avgRating from '../../../services/avgRating'
import RatingStars from './RatingStars'
import { FaAngleRight } from "react-icons/fa6";
// import required modules
import { Autoplay,EffectCoverflow,Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../common/Spinner';
export default function CourseSliderAdv({ courses,delay=null }) {
    const navigate = useNavigate()
    const [avgRatingCourse, setAvgRatingCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [grabbing,setGrabbing] = useState(false)
    const courseClickHandler = (course) => {
        // console.log("Course...",course)
        navigate(`/course/${course._id}`)
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
    useEffect(() => {
        // console.log("AVERAGE RATING COURSE.....", avgRatingCourse)
    }, [avgRatingCourse])

  

    const swiperRef = useRef(null);
    const clickHandler = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };
    return (
        <div className='flex flex-row items-center  '>
            <Swiper
             ref={swiperRef}
             slidesPerView={1}
             loop={true}
             spaceBetween={24}
      
             modules={[Autoplay, Pagination, Navigation]}

             className={`mySwiper ${(!grabbing) ? ("cursor-grab") : ("cursor-grabbing")}`}
               autoplay={{
               delay: 1000,
               disableOnInteraction: true,
               }}
             // navigation={true}
             breakpoints={{
                 1024: { slidesPerView: courses.length >= 3 ? 3 : courses.length, }
             }}

             onTouchStart={() => { setGrabbing(true) }}
             onTouchEnd={() => {
                 setGrabbing(false)
             }}
                // ref={swiperRef}
                // effect={'coverflow'}
                // grabCursor={true}
                
                // centeredSlides={true}
                // slidesPerView={'1'}
                // loop={courses.length >=3 && true}
                // breakpoints={{
                //     1024: { slidesPerView: (courses ? (courses.length >= 3 ? 3 : courses.length) : (0)) }
                // }}
                // autoplay={{
                //       delay: delay || 5000 ,
                //       disableOnInteraction: true,
                //     }}

                // coverflowEffect={{
                //     rotate: 50,
                //     stretch: 0,
                //     depth: 100,
                //     modifier: 1,
                //     slideShadows: true,
                // }}
                // // pagination={true}
                // modules={[Autoplay,EffectCoverflow, Pagination]}
                // className={`mySwiper ${(!grabbing) ? ("cursor-grab") : ("cursor-grabbing")}`}

            >
                <>

                    {
                        !courses ? (
                            <div>
                                <Spinner></Spinner>
                            </div>
                        ) :  courses.map((course, index) => {

                            return (
                                <SwiperSlide
                                    key={index}
                                    onClick={() => courseClickHandler(course)}
                                    className='flex 
                
                justify-center
                items-center '
                                >
                                    <div className='
                                        flex flex-col gap-5'>
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
                                                    {/* {course.courseDescription} */}
                                                    {course?.courseName}
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
                </>
                {/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide> */}
            </Swiper>
            <div className='bg-[#424854] flex flex-row p-1 gap-1 rounded-[200px]
                items-center h-fit w-fit cursor-pointer' 
                onClick={clickHandler}>
                    <div className='text-richblack-5'>
                        <FaAngleRight />
                    </div>
                </div>
        </div>
    );
}

