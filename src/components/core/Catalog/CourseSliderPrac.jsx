import React from 'react'
// Import Swiper styles
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'

let Courses = [
    {
        _id:
            '669750c8107ff5f3542be1f5',
        courseName:
            "Python",
        courseDescription:
            "Good Course",
        instructor:
            '668df4639e8882a6c5d1b9fb',
        whatYouWillLearn:
            "Great Many",

        courseContent: [],

        ratingAndReviews: [],
        price:
            1200,
        thumbnail:
            "https://res.cloudinary.com/dkqaa1o1w/image/upload/v1721192648/StudyNot…",
        category:
            '66975088107ff5f3542be1e9',

        tag: [],

        studentsEnrolled: [],

        instructions: [],
        status:
            "Published",
        createdAt:
            '2024-07-17T05:00:00.565+00:00'
    },
    {
        _id:
            '669750c8107ff5f3542be1f5',
        courseName:
            "Python",
        courseDescription:
            "Good Course",
        instructor:
            '668df4639e8882a6c5d1b9fb',
        whatYouWillLearn:
            "Great Many",

        courseContent: [],

        ratingAndReviews: [],
        price:
            1200,
        thumbnail:
            "https://res.cloudinary.com/dkqaa1o1w/image/upload/v1721192648/StudyNot…",
        category:
            '66975088107ff5f3542be1e9',

        tag: [],

        studentsEnrolled: [],

        instructions: [],
        status:
            "Published",
        createdAt:
            '2024-07-17T05:00:00.565+00:00'
    },
    {
        _id:
            '669750c8107ff5f3542be1f5',
        courseName:
            "Python",
        courseDescription:
            "Good Course",
        instructor:
            '668df4639e8882a6c5d1b9fb',
        whatYouWillLearn:
            "Great Many",

        courseContent: [],

        ratingAndReviews: [],
        price:
            1200,
        thumbnail:
            "https://res.cloudinary.com/dkqaa1o1w/image/upload/v1721192648/StudyNot…",
        category:
            '66975088107ff5f3542be1e9',

        tag: [],

        studentsEnrolled: [],

        instructions: [],
        status:
            "Published",
        createdAt:
            '2024-07-17T05:00:00.565+00:00'
    }
]
const CourseSliderPrac = () => {
    return (
        <>

        <div>

            <Swiper
              slidesPerView={1}
              loop={true}
              spaceBetween={200}
            //   pagination={true}
              modules={[Autoplay,Pagination,Navigation]}
              className="mySwiper"
              autoplay={{
              delay: 1000,
              disableOnInteraction: true,
              }}
              navigation={true}
              breakpoints={{
                  1024:{slidesPerView:3,}
              }}
            >
                <SwiperSlide>
                    <div className=' text-richblack-5'>
                    Slide 1
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-richblack-5'>

                    Slide 2
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-richblack-5'>

                    Slide 3
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='text-richblack-5'>

                    Slide 4
                    </div>
                </SwiperSlide>
            </Swiper>

            </div>


        </>
    )
}

export default CourseSliderPrac